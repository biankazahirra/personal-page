const STORAGE_KEY = "sound";

/** Sound is off unless the visitor turns it on. */
export function soundOn(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

export function setSound(on: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  window.dispatchEvent(new Event("soundchange"));
}

type AudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

let context: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (context) return context;

  const Ctor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!Ctor) return null;

  try {
    context = new Ctor();
  } catch {
    context = null;
  }
  return context;
}

function tone(
  frequency: number,
  duration: number,
  options: { type?: OscillatorType; gain?: number; delay?: number } = {},
) {
  if (!soundOn()) return;

  const ctx = audioContext();
  if (!ctx) return;

  const start = ctx.currentTime + (options.delay ?? 0);
  const oscillator = ctx.createOscillator();
  const volume = ctx.createGain();

  oscillator.type = options.type ?? "sine";
  oscillator.frequency.setValueAtTime(frequency, start);

  const peak = options.gain ?? 0.08;
  volume.gain.setValueAtTime(0.0001, start);
  volume.gain.exponentialRampToValueAtTime(peak, start + 0.012);
  volume.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(volume);
  volume.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

/** A short typewriter bell, used when the start-up sheet finishes. */
export function playBell() {
  tone(1320, 0.5, { type: "sine", gain: 0.07 });
  tone(1980, 0.35, { type: "sine", gain: 0.025, delay: 0.02 });
}

/** A single key click, used by the logbook console. */
export function playKey() {
  tone(220, 0.035, { type: "square", gain: 0.012 });
}

/** A soft thud, used when the exploded view snaps together. */
export function playStamp() {
  tone(96, 0.16, { type: "triangle", gain: 0.09 });
  tone(58, 0.22, { type: "sine", gain: 0.06, delay: 0.01 });
}
