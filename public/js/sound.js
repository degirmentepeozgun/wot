window.SoundManager = (function () {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const soundBuffers = {};
  const preloaded = new Set();

  const COOLDOWN_MS = 200;

  // Pool: id -> GainNode[]
  const gainNodePools = {};

  // Playing kaydı: id -> { source, gain, startedAt, durationMs }
  const playing = {};

  // Normalize cache (sadece kullanılanlar doldurulur)
  const audioNormalizeCache = {}; // id -> { peak, normGain }

  // Peak Analizi (ultra hızlı)
  function computePeak(buffer) {
    const data = buffer.getChannelData(0);
    let peak = 0;
    for (let i = 0; i < data.length; i++) {
      const v = Math.abs(data[i]);
      if (v > peak) peak = v;
    }
    return peak;
  }

  // Normalize Gain Hesapla (0.7 referans)
  function getNormalizedGain(id, buffer) {
    if (audioNormalizeCache[id]) return audioNormalizeCache[id].normGain;

    const peak = computePeak(buffer);
    const reference = 0.7;
    let normGain = peak > 0 ? reference / peak : 1;

    // Abartmasın diye güvenlik sınırı
    if (normGain > 4) normGain = 4;

    audioNormalizeCache[id] = { peak, normGain };
    return normGain;
  }

  // ---------------------------------------------------------
  async function loadBuffer(id, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await ctx.decodeAudioData(arrayBuffer);
    soundBuffers[id] = buffer;
  }

  function getGainNode(id) {
    if (!gainNodePools[id]) gainNodePools[id] = [];
    const pool = gainNodePools[id];
    for (const gain of pool) {
      if (!gain._inUse) return gain;
    }
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain._inUse = false;
    pool.push(gain);
    return gain;
  }

  return {

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

    async preload(id, url) {
      if (preloaded.has(id)) return;
      await loadBuffer(id, url);
      preloaded.add(id);
    },

    // ---------------------------------------------------------
    async play(id, url = null, volume = 1, loop = false, rate = 1, reset = false, force = false, end = null, bind = false) {

      if (!id || !soundBuffers[id]) {
        if (!url) url = soundFiles?.[id];
        if (!url) return undefined;
        if (!id && url) id = url;
        await this.preload(id, url);
      }

      const now = performance.now();
      const buffer = soundBuffers[id];
      const durationMs = loop ? Infinity : (buffer.duration / rate) * 1000;

      // Reset / cooldown sistemi (dokunmadım)
      const prev = playing[id];
      if (prev) {
        const elapsed = now - prev.startedAt;
        const stillPlaying = elapsed < prev.durationMs;

        if (stillPlaying) {
          if (!reset) return undefined;

          if (reset && !end && !force && elapsed < COOLDOWN_MS) 
            return undefined;

          try { prev.source.stop(); } catch (_) {}
          prev.gain._inUse = false;
          delete playing[id];
        }
      }

      // Source node
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = loop;
      source.playbackRate.value = rate;
      
      // Gain node pool
      const gain = getGainNode(id);

      //Normalize gain ile user volume çarpıldı
      const normGain = getNormalizedGain(id, buffer);
      gain.gain.value = volume * normGain;
      gain._inUse = true;

      const panner = ctx.createStereoPanner();
      panner.pan.value = 0; // başlangıç değeri

      // Zincir
      source.connect(panner);
      panner.connect(gain);

      source.start(0);
      playing[id] = {
        source,
        gain,
        panner,
        startedAt: now,
        durationMs,
        ended: end
      };

      const cleanup = () => {
        end?.();
        if (playing[id]?.source === source){
          gain._inUse = false;
          delete playing[id];
        }
      };

      source.onended = cleanup;
      source.volume = gain.gain.value;
      source.gain = gain.gain;
      source.pannerNode = panner;
      return Promise.resolve(source);
    },
    
    suspend() {
      ctx.suspend();
    },

    resume() {
        ctx.resume();
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
    clearLoops() {
      preloaded.clear();
      for(let id in playing){
         const p = playing[id];
          if (p?.source?.loop) {
            try { p.source.stop(); } catch (_) {}
            p.gain._inUse = false;
            delete playing[id];
            const gn = gainNodePools?.[id];
            if(gn)
              gn.length = 0;
            delete soundBuffers[id];
            delete audioNormalizeCache[id];
          }
      }
    },
    clearAll() {
      this.stopAll();
      for (const k in soundBuffers) delete soundBuffers[k];
      preloaded.clear();

      for (const id in gainNodePools) {
        gainNodePools[id].length = 0;
      }

      //Normalize cache de temizlensin
      for (const k in audioNormalizeCache) delete audioNormalizeCache[k];
    },
    getPlaying(id) {
        return playing[id] || playing[soundFiles?.[id]] || null;
    }
  };
})();

// window.SoundManager = (function () {
//   const ctx = new (window.AudioContext || window.webkitAudioContext)();
//   const soundBuffers = {};
//   const preloaded = new Set();

//   const COOLDOWN_MS = 200;

//   // Pool: id -> GainNode[]
//   const gainNodePools = {};

//   // Playing kaydı: id -> { source, gain, startedAt, durationMs }
//   const playing = {};

//   async function loadBuffer(id, url) {
//     const response = await fetch(url);
//     const arrayBuffer = await response.arrayBuffer();
//     const buffer = await ctx.decodeAudioData(arrayBuffer);
//     soundBuffers[id] = buffer;
//   }

//   function getGainNode(id) {
//     if (!gainNodePools[id]) gainNodePools[id] = [];
//     const pool = gainNodePools[id];
//     // Boşta gain node var mı?
//     for (const gain of pool) {
//       if (!gain._inUse) return gain;
//     }
//     // Yoksa yeni yarat
//     const gain = ctx.createGain();
//     gain.connect(ctx.destination);
//     gain._inUse = false;
//     pool.push(gain);
//     return gain;
//   }

//   return {
    
//     warmAudio() {
//       ctx.resume().then(() => {
//         // çok kısa, sessiz bir ses üret → motoru ısıt
//         const osc = ctx.createOscillator();
//         const gain = ctx.createGain();
//         gain.gain.value = 0; // sessiz
//         osc.connect(gain).connect(ctx.destination);
//         osc.start();
//         osc.stop(ctx.currentTime + 0.01);
//       });
//     },

//     async preload(id, url) {
//       if (preloaded.has(id)) return;
//       await loadBuffer(id, url);
//       preloaded.add(id);
//     },

//     async play(id, url = null, volume = 1, loop = false, rate = 1, reset = false, force = false, end = null, bind = false) {
//       if (!id || !soundBuffers[id]) {
//         if (!url) url = soundFiles?.[id];
//         if (!url) return;
//         if(!id && url)
//           id = url;
//         await this.preload(id, url);
//       }
//       const now = performance.now();
//       const buffer = soundBuffers[id];
//       const durationMs = (buffer.duration / rate) * 1000;

//       const prev = playing[id];
//       if (prev) {
//         const elapsed = now - prev.startedAt;
//         const stillPlaying = elapsed < prev.durationMs;

//         if (stillPlaying) {
//           if (!reset) return; // reset = false ve öncekini yok say

//           if (reset && !end && !force && elapsed < COOLDOWN_MS) return; // cooldown dolmadı

//           // reset=true ve cooldown doldu, önceki sesi durdur
//           try {
//             prev.source.stop();
//           } catch (_) {}
//           prev.gain._inUse = false;
//           delete playing[id];
//         }
//       }

//       // Yeni AudioBufferSourceNode yarat
//       const source = ctx.createBufferSource();
//       source.buffer = buffer;
//       source.loop = loop;
//       source.playbackRate.value = rate;

//       // GainNode poolundan al
//       const gain = getGainNode(id);
//       gain.gain.value = volume;
//       gain._inUse = true;

//       source.connect(gain);

//       source.start(0);
//       playing[id] = {
//         source,
//         gain,
//         startedAt: now,
//         durationMs,
//         ended: end
//       };

//       const cleanup = () => { 
//         end?.();
//         gain._inUse = false;
//         if (playing[id]?.source === source)
//           delete playing[id];
//       }; 

//       source.onended = cleanup;

//       return bind ? Promise.resolve(source) : undefined;
//     },

//     stop(id) {
//       const p = playing[id];
//       if (p) {
//         try { p.source.stop(); } catch (_) {}
//         p.gain._inUse = false;
//         delete playing[id];
//       }
//     },

//     stopAll() {
//       for (const id in playing) {
//         this.stop(id);
//       }
//     },

//     clearAll() {
//       this.stopAll();
//       for (const k in soundBuffers) delete soundBuffers[k];
//       preloaded.clear();
//       // Gain node poolu temizleme isteğe bağlı, yoksa kalabilir
//       for (const id in gainNodePools) {
//         gainNodePools[id].length = 0;
//       }
//     }
//   };
// })();