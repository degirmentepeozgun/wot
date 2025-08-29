window.SoundManager = (function () {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const soundBuffers = {};
  const activeSources = {};
  const preloaded = new Set();
  const loopsToRestore = new Map();

  function resumeContextOnUserGesture() {
    const resume = () => {
      if (ctx.state === 'suspended') ctx.resume();
      window.removeEventListener('click', resume);
      window.removeEventListener('touchstart', resume);
    };
    window.addEventListener('click', resume);
    window.addEventListener('touchstart', resume);
  }

  function handleVisibilityChange() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        SoundManager.stopAll();
      } else {
        for (const [id, opt] of loopsToRestore.entries()) {
          SoundManager.play(id, opt.url, opt.volume, true, opt.rate);
        }
      }
    });
  }

  resumeContextOnUserGesture();
  handleVisibilityChange();

  async function loadBuffer(id, url) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const buffer = await ctx.decodeAudioData(data);
    soundBuffers[id] = buffer;
  }

  return {
    async preload(id, url) {
      if (preloaded.has(id)) return;
      await loadBuffer(id, url);
      preloaded.add(id);
    },

    async play(id, url = null, volume = 1, loop = false, rate = 1, reset = false) {
      if (!soundBuffers[id]) {
		if(!url)
			url = soundFiles[id];
        if (!url) return;
        await this.preload(id, url);
      }

      // Eğer zaten çalıyorsa ve reset değilse, tekrar oynatma
      if (activeSources[id] && !reset) return;

      // Eğer reset true ise önce eskiyi durdur
      if (reset) this.stop(id);

      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.buffer = soundBuffers[id];
      source.loop = loop;
      source.playbackRate.value = rate;
      source.connect(gain).connect(ctx.destination);
      source.start(0);

      if (!activeSources[id]) activeSources[id] = [];
      activeSources[id].push({ source, gain });

      if (loop) {
        loopsToRestore.set(id, { url, volume, rate });
      }
    },

    stop(id) {
      const list = activeSources[id];
      if (list) {
        for (const { source } of list) {
          try { source.stop(); } catch (_) {}
        }
        delete activeSources[id];
      }
      loopsToRestore.delete(id);
    },

    stopAll() {
      for (const id in activeSources) {
        this.stop(id);
      }
    },

    setVolume(id, volume = 1) {
      const list = activeSources[id];
      if (list) {
        for (const { gain } of list) {
          gain.gain.value = volume;
        }
      }
    },

    setRate(id, rate = 1) {
      const list = activeSources[id];
      if (list) {
        for (const { source } of list) {
          source.playbackRate.value = rate;
        }
      }
      const restore = loopsToRestore.get(id);
      if (restore) restore.rate = rate;
    },

    clearAll() {
      this.stopAll();
      for (const key in soundBuffers) {
        delete soundBuffers[key];
      }
      preloaded.clear();
      loopsToRestore.clear();
    }
  };
})();