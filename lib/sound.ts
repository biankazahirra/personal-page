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

/** A short ukulele pluck. Only audible when sound is enabled. */
export function playPluck(frequency: number) {
  tone(frequency, 0.7, { type: "triangle", gain: 0.05 });
  tone(frequency * 2, 0.35, { type: "sine", gain: 0.018, delay: 0.01 });
}

/** A loose staple pulled out of the paper. */
export function playStaple() {
  tone(1760, 0.05, { type: "triangle", gain: 0.035 });
  tone(240, 0.09, { type: "square", gain: 0.012, delay: 0.03 });
}

/** Four strings, struck once. Used by the typed ukulele. */
export function playChord() {
  playPluck(261.63);
  playPluck(329.63);
  playPluck(392);
  playPluck(523.25);
}

/** The ink pad: a soft press, then a stamp. */
export function playInk() {
  tone(180, 0.08, { type: "sine", gain: 0.03 });
  playStamp();
}

/** Three rising notes for the service override. */
export function playOverride() {
  tone(392, 0.16, { type: "triangle", gain: 0.04 });
  tone(523.25, 0.16, { type: "triangle", gain: 0.04, delay: 0.1 });
  tone(659.25, 0.3, { type: "triangle", gain: 0.05, delay: 0.2 });
}
