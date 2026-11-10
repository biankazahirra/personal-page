"use client";

import { useEffect, useRef, useState } from "react";

import { bootLines, manual } from "@/content/manual";
import { ASSEMBLY_TOTAL, foundCount, writeFound } from "@/lib/assembly";
import {
  GRAIN_DEFAULT,
  GRAIN_MAX,
  GRAIN_MIN,
  readGrain,
  writeGrain,
} from "@/lib/bench";
import { EGG_TOTAL, eggCount, resetEggs } from "@/lib/eggs";

/**
 * The calibration bench on the colophon. Three controls, each with an effect
 * the visitor can see: the paper grain, the assembly counters, and a replay of
 * the start-up self-test. Everything is local to this browser.
 */
export function CalibrationBench() {
  const [ready, setReady] = useState(false);
  const [grain, setGrain] = useState(GRAIN_DEFAULT);
  const [parts, setParts] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [armed, setArmed] = useState(false);
  const [status, setStatus] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [testing, setTesting] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    setReady(true);
    setGrain(readGrain());

    const sync = () => {
      setParts(foundCount());
      setEggs(eggCount());
    };
    sync();
    window.addEventListener("assemblychange", sync);
    window.addEventListener("eggchange", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("assemblychange", sync);
      window.removeEventListener("eggchange", sync);
      window.removeEventListener("storage", sync);
      window.clearTimeout(timer.current);
    };
  }, []);

  // The armed state is a guard, not a mode: it gives up on its own.
  useEffect(() => {
    if (!armed) return;
    const timeout = window.setTimeout(() => {
      setArmed(false);
      setStatus("");
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, [armed]);

  function runTest() {
    if (testing) return;
    const instant = document.documentElement.dataset.motion !== "full";
    setTesting(!instant);
    setLines(instant ? [...bootLines] : bootLines.map(() => ""));
    if (instant) return;

    let line = 0;
    let char = 0;

    const step = () => {
      const text = bootLines[line];
      char = Math.min(text.length, char + 3);
      setLines((previous) => {
        const next = [...previous];
        next[line] = text.slice(0, char);
        return next;
      });

      if (char >= text.length) {
        line += 1;
        char = 0;
        if (line >= bootLines.length) {
          setTesting(false);
          return;
        }
        timer.current = window.setTimeout(step, 90);
        return;
      }
      timer.current = window.setTimeout(step, 12 + Math.random() * 8);
    };

    timer.current = window.setTimeout(step, 60);
  }

  function resetCounters() {
    if (!armed) {
      setArmed(true);
      setStatus("press again to clear both counters");
      return;
    }
    writeFound([]);
    resetEggs();
    setArmed(false);
    setStatus("counters cleared · 0 parts · 0 field kit");
  }

  return (
    <div className="calibration">
      <div className="calibration-head">
        <p className="eyebrow text-ink-muted">calibration · bench 8-1</p>
        <p className="eyebrow text-ink-muted">
          {manual.model} · {manual.printedRev}
        </p>
      </div>

      <div className="calibration-grid">
        <div className="calibration-unit">
          <label htmlFor="bench-grain" className="label text-[10px] text-ink-muted">
            paper grain
          </label>
          <p className="calibration-value">{grain}%</p>
          <input
            id="bench-grain"
            type="range"
            className="grain-range"
            min={GRAIN_MIN}
            max={GRAIN_MAX}
            step={5}
            value={grain}
            disabled={!ready}
            onChange={(event) => setGrain(writeGrain(Number(event.target.value)))}
            aria-describedby="bench-grain-note"
          />
          <p id="bench-grain-note" className="calibration-note">
            factory mark 100%. below wipes the fleck, above doubles it. the
            choice stays on this browser.
          </p>
        </div>

        <div className="calibration-unit">
          <p className="label text-[10px] text-ink-muted">self-test</p>
          <div className="calibration-readout" aria-hidden="true">
            {lines.length === 0 ? (
              <p className="calibration-idle">idle · press run self-test</p>
            ) : (
              bootLines.map((line, index) => (
                <p key={line} className="whitespace-pre">
                  {lines[index] ?? "\u00a0"}
                </p>
              ))
            )}
          </div>
          <p className="sr-only">
            {testing ? "running self-test" : lines.join(". ")}
          </p>
          <button
            type="button"
            className="calibration-button eyebrow"
            onClick={runTest}
            disabled={!ready || testing}
          >
            {testing ? "running…" : "run self-test"}
          </button>
        </div>

        <div className="calibration-unit">
          <p className="label text-[10px] text-ink-muted">counters</p>
          <p className="calibration-value">
            {parts}/{ASSEMBLY_TOTAL}
            <span className="calibration-unit-label">parts</span>
          </p>
          <p className="calibration-value">
            {eggs}/{EGG_TOTAL}
            <span className="calibration-unit-label">field kit</span>
          </p>
          <button
            type="button"
            className="calibration-button eyebrow"
            onClick={resetCounters}
            disabled={!ready}
            data-armed={armed}
          >
            {armed ? "press again to clear" : "reset counters"}
          </button>
        </div>
      </div>

      <p className="calibration-status eyebrow" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
