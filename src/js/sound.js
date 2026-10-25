window.SoundManager = (function () {

  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const soundBuffers = {};
  const preloaded = new Set();

  const COOLDOWN_MS = 200;

  // aktif sesler
  // key -> playback object
  const playing = {};

  // normalize cache
  const audioNormalizeCache = {};

  // ---------------------------------------------------
  // PEAK ANALYZE
  // ---------------------------------------------------

  function computePeak(buffer) {
    const data = buffer.getChannelData(0);

    let peak = 0;

    for (let i = 0; i < data.length; i++) {
      const v = Math.abs(data[i]);
      if (v > peak) peak = v;
    }

    return peak;
  }

  function getNormalizedGain(id, buffer) {

    if (audioNormalizeCache[id])
      return audioNormalizeCache[id].normGain;

    const peak = computePeak(buffer);

    const reference = 0.7;

    let normGain = peak > 0
      ? reference / peak
      : 1;

    if (normGain > 4)
      normGain = 4;

    audioNormalizeCache[id] = {
      peak,
      normGain
    };

    return normGain;
  }

  // ---------------------------------------------------
  // BUFFER LOAD
  // ---------------------------------------------------

  async function loadBuffer(id, url) {

    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    const buffer = await ctx.decodeAudioData(arrayBuffer);

    soundBuffers[id] = buffer;
  }

  // ---------------------------------------------------
  // NODE CLEANUP
  // ---------------------------------------------------

  function cleanupPlayback(id, playback) {

    if (!playback) return;

    try {
      playback.source.onended = null;
    } catch (_) {}

    try {
      playback.source.stop(0);
    } catch (_) {}

    try {
      playback.source.disconnect();
    } catch (_) {}

    try {
      playback.panner?.disconnect();
    } catch (_) {}

    try {
      playback.gain?.disconnect();
    } catch (_) {}

    delete playing[id];

    playback.end?.();
  }

  function fadeCut(id, playback) {

    if (!playback) return;

    delete playing[id];

    const end = playback.end;
    playback.end = null;

    let faded = false;
    const gainParam = playback.gain?.gain;

    if (gainParam) {
      const t = ctx.currentTime;
      try {
        gainParam.cancelScheduledValues(t);
        gainParam.setValueAtTime(gainParam.value, t);
        gainParam.linearRampToValueAtTime(0, t + 0.01);
        playback.source.onended = () => {
          try { playback.source.disconnect(); } catch (_) {}
          try { playback.panner?.disconnect(); } catch (_) {}
          try { playback.gain?.disconnect(); } catch (_) {}
        };
        playback.source.stop(t + 0.01);
        faded = true;
      } catch (_) {}
    }

    if (!faded)
      cleanupPlayback(id, playback);

    if (end)
      end();
  }

  // ---------------------------------------------------
  // API
  // ---------------------------------------------------

  return {

    // -----------------------------------------
    // audio warmup
    // -----------------------------------------

    warmAudio() {

      ctx.resume().then(() => {

        const osc = ctx.createOscillator();

        const gain = ctx.createGain();

        gain.gain.value = 0;

        osc.connect(gain).connect(ctx.destination);

        osc.start();

        osc.stop(ctx.currentTime + 0.01);

      });

    },

    // -----------------------------------------
    // preload
    // -----------------------------------------

    async preload(id, url) {

      if (!id)
        id = url;

      if (preloaded.has(id))
        return;

      await loadBuffer(id, url);

      preloaded.add(id);
    },

    // -----------------------------------------
    // play
    // -----------------------------------------

    async play(
      id,
      url = null,
      volume = 1,
      loop = false,
      rate = 1,
      reset = false,
      force = false,
      end = null,
      bind = false,
      pan = 0
    ) {

      // -----------------------------
      // resolve id
      // -----------------------------

      if (!id)
        id = url;

      if (!url)
        url = soundFiles?.[id];

      if (!id || !url)
        return undefined;

      // -----------------------------
      // preload
      // -----------------------------

      if (!soundBuffers[id]) {
        await this.preload(id, url);
      }

      const buffer = soundBuffers[id];

      if (!buffer)
        return undefined;

      const now = performance.now();

      const durationMs = loop
        ? Infinity
        : (buffer.duration / rate) * 1000;

      // -----------------------------
      // previous playback
      // -----------------------------

      const prev = playing[id];

      if (prev) {

        const elapsed = now - prev.startedAt;

        const stillPlaying = elapsed < prev.durationMs;

        if (stillPlaying) {

          // reset false → ignore
          if (!reset)
            return undefined;

          // cooldown
          if (
            reset &&
            !force &&
            !end &&
            elapsed < COOLDOWN_MS
          ) {
            return undefined;
          }

          fadeCut(id, prev);
        }
      }

      // -----------------------------
      // create source
      // -----------------------------

      const source = ctx.createBufferSource();

      source.buffer = buffer;

      source.loop = loop;

      source.playbackRate.value = rate;

      // -----------------------------
      // gain
      // -----------------------------

      const gain = ctx.createGain();

      const normGain = getNormalizedGain(id, buffer);

      gain.gain.value = volume * normGain;

      // -----------------------------
      // stereo panner
      // -----------------------------

      const panner = ctx.createStereoPanner();

      let _pan = 0;
      if (!loop && Number.isFinite(pan))
        _pan = pan < -1 ? -1 : (pan > 1 ? 1 : pan);
      panner.pan.value = _pan;

      // -----------------------------
      // chain
      // -----------------------------

      source.connect(panner);

      panner.connect(gain);

      gain.connect(ctx.destination);

      // -----------------------------
      // playback object
      // -----------------------------

      const playback = {
        id,
        source,
        gain,
        panner,
        startedAt: now,
        durationMs,
        end
      };

      playing[id] = playback;

      // -----------------------------
      // ended
      // -----------------------------

      source.onended = () => {

        if (playing[id]?.source === source) {
          cleanupPlayback(id, playback);
        }

      };

      // -----------------------------
      // start
      // -----------------------------

      source.start(0);

      // helper refs

      source.volume = gain.gain.value;

      source.gain = gain.gain;

      source.pannerNode = panner;

      return bind
        ? Promise.resolve(source)
        : undefined;
    },

    // -----------------------------------------
    // stop
    // -----------------------------------------

    stop(id) {

      if (!id)
        return;

      const playback = playing[id];

      if (!playback)
        return;

      cleanupPlayback(id, playback);
    },

    // -----------------------------------------
    // stop all
    // -----------------------------------------

    stopAll() {

      const ids = Object.keys(playing);

      for (const id of ids) {

        const playback = playing[id];

        if (playback) {
          cleanupPlayback(id, playback);
        }

      }
    },

    // -----------------------------------------
    // suspend
    // -----------------------------------------

    suspend() {
      ctx.suspend();
    },

    // -----------------------------------------
    // resume
    // -----------------------------------------

    resume() {
      ctx.resume();
    },

    // -----------------------------------------
    // clear loops
    // -----------------------------------------

    clearLoops() {

      const ids = Object.keys(playing);

      for (const id of ids) {

        const p = playing[id];

        if (p?.source?.loop) {

          cleanupPlayback(id, p);

          delete soundBuffers[id];

          delete audioNormalizeCache[id];

          preloaded.delete(id);
        }
      }
    },

    // -----------------------------------------
    // clear all
    // -----------------------------------------

    clearAll() {

      this.stopAll();

      for (const k in soundBuffers)
        delete soundBuffers[k];

      for (const k in audioNormalizeCache)
        delete audioNormalizeCache[k];

      preloaded.clear();
    },

    // -----------------------------------------
    // get playing
    // -----------------------------------------

    getPlaying(id) {
      return playing[id] || null;
    }

  };

})();