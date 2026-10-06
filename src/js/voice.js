/****************************************************
 * AAA GIBBERISH VOICE ENGINE - STABLE VERSION
 * - no pitch abuse
 * - no segment crash
 * - role-based spectral selection (warrior fix)
 * - smooth timeline playback
 ****************************************************/

/**********************
 * STATE
 **********************/
const __voices = {};

/**********************
 * CONFIG (PURE DATA)
 **********************/
const __characterVoiceSettings = {
  wizard: {
    base: { gender: "male", rate: 0.95, pause: 0.05 },
    emotions: {
      normal: { energy: 0.9 },
      angry: { energy: 1.3 },
      sleepy: { energy: 0.6 },
      energetic: { energy: 1.2 }
    }
  },

  warrior: {
    base: { gender: "male", rate: 1.0, pause: 0.04 },
    emotions: {
      normal: { energy: 1.0 },
      angry: { energy: 1.6 },
      sleepy: { energy: 0.7 },
      energetic: { energy: 1.3 }
    },
    voiceProfile: {
      segmentRange: [4, 16] // 🔥 MID RANGE FIX (warrior tone)
    }
  },

  tank: {
    base: { gender: "male", rate: 0.9, pause: 0.07 },
    emotions: {
      normal: { energy: 1.0 },
      angry: { energy: 1.6 },
      sleepy: { energy: 0.6 },
      energetic: { energy: 1.2 }
    },
    voiceProfile: {
      segmentRange: [0, 10] // darker range
    }
  },

  archer: {
    base: { gender: "female", rate: 1.03, pause: 0.04 },
    emotions: {
      normal: { energy: 1.0 },
      angry: { energy: 1.25 },
      sleepy: { energy: 0.7 },
      energetic: { energy: 1.35 }
    },
    voiceProfile: {
      segmentRange: [6, 16] // avoid goblin highs
    }
  }
};

/**********************
 * AUDIO CORE
 **********************/
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

const AudioEngine = {
  cache: new Map(),

  async decode(url) {
    if (this.cache.has(url)) return this.cache.get(url);

    const r = await fetch(url);

    // ❗ crash guard
    if (!r.ok) {
      console.warn("Missing audio:", url);
      return null;
    }

    const buf = await r.arrayBuffer();

    try {
      const audioBuffer = await audioCtx.decodeAudioData(buf);
      this.cache.set(url, audioBuffer);
      return audioBuffer;
    } catch (e) {
      console.warn("Decode fail:", url);
      return null;
    }
  }
};

/**********************
 * UTILS
 **********************/
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function countSyllables(w) {
  const vowels = "aeiouy";
  let c = 0, prev = false;

  for (let ch of w.toLowerCase()) {
    const v = vowels.includes(ch);
    if (v && !prev) c++;
    prev = v;
  }

  return Math.max(1, c);
}

function parseSentence(text) {
  return text
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map(w => ({ word: w, syllables: countSyllables(w) }));
}

/**********************
 * SEGMENT SELECTOR
 **********************/
function getSegmentPath(i, gender, profile) {
  const max = gender === "male" ? 22 : 17;

  // default full range
  let start = 0;
  let end = max - 1;

  // role-based spectral gating
  if (profile?.segmentRange) {
    start = profile.segmentRange[0];
    end = profile.segmentRange[1];
  }

  const range = Math.max(1, end - start);

  const idx = start + (i % range);

  return `./images/voices/${gender}/segment_${idx}.wav`;
}

/**********************
 * SILENCE
 **********************/
function silence(sec) {
  return audioCtx.createBuffer(
    1,
    audioCtx.sampleRate * sec,
    audioCtx.sampleRate
  );
}

/**********************
 * TONE ENGINE (STABLE)
 **********************/
function computeTone(cfg, emotion) {
  const mod = cfg.emotions[emotion] || cfg.emotions.normal;

  let rate = cfg.base.rate;

  // energy influence (very mild)
  rate += (mod.energy - 1) * 0.04;

  // stability clamp (IMPORTANT)
  rate = clamp(rate, 0.9, 1.08);

  const gain = clamp(mod.energy, 0.75, 1.35);

  return { rate, gain };
}

/**********************
 * PLAYBACK (SMOOTH TIMELINE)
 **********************/
function play(track) {
  let t = audioCtx.currentTime;

  const master = audioCtx.createGain();
  master.connect(audioCtx.destination);

  for (const x of track) {
    if (!x.buffer) continue;

    const src = audioCtx.createBufferSource();
    src.buffer = x.buffer;
    src.playbackRate.value = x.rate;

    const g = audioCtx.createGain();
    g.gain.value = x.gain;

    src.connect(g);
    g.connect(master);

    src.start(t);

    t += x.buffer.length / audioCtx.sampleRate;
  }
}

/**********************
 * BUILD VOICE
 **********************/
async function BuildVoice(id, char, text, emotion = "normal") {

  const cfg = __characterVoiceSettings[char];
  if (!cfg) throw new Error("Unknown character: " + char);

  const words = parseSentence(text);
  const tone = computeTone(cfg, emotion);

  const track = [];
  let idx = 0;

  for (const w of words) {

    for (let i = 0; i < w.syllables; i++) {

      const path = getSegmentPath(
        idx,
        cfg.base.gender,
        cfg.voiceProfile
      );

      const buf = await AudioEngine.decode(path);

      if (buf) {
        track.push({
          buffer: buf,
          rate: tone.rate,
          gain: tone.gain
        });
      }

      idx++;
    }

    // natural micro pause
    track.push({
      buffer: silence(cfg.base.pause),
      rate: 1,
      gain: 0
    });
  }

  __voices["talk" + id] = {
    char,
    text,
    emotion,
    track
  };

  return __voices["talk" + id];
}

/**********************
 * PLAY API
 **********************/
function PlayVoice(id) {
  const v = __voices["talk" + id];
  if (!v) return console.warn("Missing voice:", id);

  play(v.track);
}