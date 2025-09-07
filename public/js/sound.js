window.SoundManager = (function () {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const soundBuffers = {};
  const preloaded = new Set();

  const COOLDOWN_MS = 200;

  // Pool: id -> GainNode[]
  const gainNodePools = {};

  // Playing kaydı: id -> { source, gain, startedAt, durationMs }
  const playing = {};

  async function loadBuffer(id, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await ctx.decodeAudioData(arrayBuffer);
    soundBuffers[id] = buffer;
  }

  function getGainNode(id) {
    if (!gainNodePools[id]) gainNodePools[id] = [];
    const pool = gainNodePools[id];
    // Boşta gain node var mı?
    for (const gain of pool) {
      if (!gain._inUse) return gain;
    }
    // Yoksa yeni yarat
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain._inUse = false;
    pool.push(gain);
    return gain;
  }

  return {
    async preload(id, url) {
      if (preloaded.has(id)) return;
      await loadBuffer(id, url);
      preloaded.add(id);
    },

    async play(id, url = null, volume = 1, loop = false, rate = 1, reset = false, force = false, end = null, bind = false) {
      if (!id || !soundBuffers[id]) {
        if (!url) url = soundFiles?.[id];
        if (!url) return;
        if(!id && url)
          id = url;
        await this.preload(id, url);
      }

      const now = performance.now();
      const buffer = soundBuffers[id];
      const durationMs = (buffer.duration / rate) * 1000;

      const prev = playing[id];
      if (prev) {
        const elapsed = now - prev.startedAt;
        const stillPlaying = elapsed < prev.durationMs;

        if (stillPlaying) {
          if (!reset) return; // reset = false ve öncekini yok say

          if (reset && !end && !force && elapsed < COOLDOWN_MS) return; // cooldown dolmadı

          // reset=true ve cooldown doldu, önceki sesi durdur
          try {
            prev.source.stop();
          } catch (_) {}
          prev.gain._inUse = false;
          delete playing[id];
        }
      }

      // Yeni AudioBufferSourceNode yarat
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      source.playbackRate.value = rate;

      // GainNode poolundan al
      const gain = getGainNode(id);
      gain.gain.value = volume;
      gain._inUse = true;

      source.connect(gain);

      source.start(0);
      playing[id] = {
        source,
        gain,
        startedAt: now,
        durationMs,
        ended: end
      };

      const cleanup = () => { 
        end?.();
        gain._inUse = false;
        if (playing[id]?.source === source)
          delete playing[id];
      }; 

      source.onended = cleanup;

      return bind ? Promise.resolve(source) : undefined;
    },

    stop(id) {
      const p = playing[id];
      if (p) {
        try { p.source.stop(); } catch (_) {}
        p.gain._inUse = false;
        delete playing[id];
      }
    },

    stopAll() {
      for (const id in playing) {
        this.stop(id);
      }
    },

    clearAll() {
      this.stopAll();
      for (const k in soundBuffers) delete soundBuffers[k];
      preloaded.clear();
      // Gain node poolu temizleme isteğe bağlı, yoksa kalabilir
      for (const id in gainNodePools) {
        gainNodePools[id].length = 0;
      }
    }
  };
})();