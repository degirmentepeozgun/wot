const __voices = {}; // talkId -> VoiceData

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const EMOTION_PRESETS = {
  normal: {
    rate: 1.0,
    pitch: 1.0,
    variance: 0.05,
    filter: null
  },
  energetic: {
    rate: 1.25,
    pitch: 1.2,
    variance: 0.12,
    filter: { type: "highpass", freq: 1200 }
  },
  angry: {
    rate: 1.35,
    pitch: 0.9,
    variance: 0.18,
    filter: { type: "distortion", amount: 20 }
  },
  sad: {
    rate: 0.85,
    pitch: 0.85,
    variance: 0.08,
    filter: { type: "lowpass", freq: 800 }
  },
  sleepy: {
    rate: 0.65,
    pitch: 0.75,
    variance: 0.03,
    filter: { type: "lowpass", freq: 600 }
  },
  happy: {
    rate: 1.15,
    pitch: 1.25,
    variance: 0.15,
    filter: { type: "bandpass", freq: 1800 }
  }
};

async function loadAudioBuffer(url) {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return await audioCtx.decodeAudioData(arrayBuffer);
}

async function createVoice(id, text, languageCode, gender, age, emotion = "normal") {
  const basePath = gender === "female"
    ? "./images/voices/female"
    : "./images/voices/male";

  const segmentCount = gender === "female" ? 24 : 29;

  const promises = [];

  for (let i = 1; i <= segmentCount; i++) {
    const url = `${basePath}/segment_${i}.wav`;
    promises.push(loadAudioBuffer(url));
  }

  const buffers = await Promise.all(promises);

  __voices["talk" + id] = {
    id,
    text,
    languageCode,
    gender,
    age,
    emotion,
    buffers,
    ready: true
  };
}

function playVoice(id) {
  const voice = __voices["talk" + id];
  if (!voice || !voice.ready) return;

  const preset = EMOTION_PRESETS[voice.emotion] || EMOTION_PRESETS.normal;

  const sourceNodes = [];

  let time = audioCtx.currentTime;

  // Sims-like: 4–12 segment arası konuşma
  const count = 4 + Math.floor(Math.random() * 8);

  for (let i = 0; i < count; i++) {
    const buffer =
      voice.buffers[Math.floor(Math.random() * voice.buffers.length)];

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    // emotion-based pitch variation
    const rand = (Math.random() * 2 - 1) * (preset.variance || 0.1);

    source.playbackRate.value =
      preset.rate * (1 + rand);

    // basic filter chain
    let node = source;

    if (preset.filter) {
      const filter = audioCtx.createBiquadFilter();

      if (preset.filter.type === "lowpass") {
        filter.type = "lowpass";
        filter.frequency.value = preset.filter.freq;
      }

      if (preset.filter.type === "highpass") {
        filter.type = "highpass";
        filter.frequency.value = preset.filter.freq;
      }

      if (preset.filter.type === "bandpass") {
        filter.type = "bandpass";
        filter.frequency.value = preset.filter.freq;
      }

      node.connect(filter);
      filter.connect(audioCtx.destination);
    } else {
      node.connect(audioCtx.destination);
    }

    // random timing spacing (natural speech jitter)
    const offset = i * (0.12 + Math.random() * 0.08);

    source.start(time + offset);

    sourceNodes.push(source);
  }

  return sourceNodes;
}


async function playNow() {
	await createVoice(1, "What can you do? Sometimes and in the tabela we lost", "en", 
	"male", 25, "happy");
	playVoice(1);
}