"use client";

import { useEffect, useRef, useState } from "react";

import type { Project } from "@/content/types";

type SchematicNode = NonNullable<Project["schematic"]>[number];

const STEP_MS = 900;

/**
 * The parts of a project as a powered circuit: the trace fills as the flow
 * reaches each node. Runs once when it scrolls into view; `step`, `run` and
 * `reset` let a visitor replay it. Clicking a node jumps the flow there.
 */
export function ProjectSchematic({ nodes }: { nodes: SchematicNode[] }) {
  // -1 = no power yet, nodes.length = cycle complete.
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    const element = root.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (document.documentElement.dataset.motion === "reduce") {
          setActive(nodes.length);
          return;
        }
        setActive(0);
        setRunning(true);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [nodes.length]);

  useEffect(() => {
    if (!running) return;
    if (active >= nodes.length) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(() => setActive((value) => value + 1), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, nodes.length]);

  const complete = active >= nodes.length;
  const current = complete ? null : active >= 0 ? nodes[active] : null;
  const status = complete ? "cycle complete" : current ? `step ${active + 1} / ${nodes.length}` : "standby";
  const readout = current ? current.step ?? current.role : complete ? "The cycle finished. It can run again." : "Power is off.";

  function jumpTo(index: number) {
    setRunning(false);
    setActive(index);
  }

  function step() {
    setRunning(false);
    setActive((value) => Math.min(value + 1, nodes.length));
  }

  function run() {
    if (document.documentElement.dataset.motion === "reduce") {
      setActive(nodes.length);
      return;
    }
    setActive(0);
    setRunning(true);
  }

  return (
    <div ref={root}>
      <div className="flex flex-wrap items-center gap-3">
        {[
          { label: "run", onClick: run, disabled: running },
          { label: "step", onClick: step, disabled: running || complete },
          { label: "reset", onClick: () => jumpTo(-1), disabled: active < 0 && !running },
        ].map((control) => (
          <button
            key={control.label}
            type="button"
            onClick={control.onClick}
            disabled={control.disabled}
            className="eyebrow border border-ink/20 px-3 py-1.5 text-ink-muted transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/20 disabled:hover:text-ink-muted"
          >
            {control.label}
          </button>
        ))}
      </div>

      <ol className="mt-6">
        {nodes.map((node, index) => {
          const reached = active >= 0 && index <= active;
          const linked = active >= 0 && index + 1 <= active;
          const isLast = index === nodes.length - 1;
          return (
            <li key={node.label} className="relative grid grid-cols-[1.75rem_1fr] gap-4 pb-6 last:pb-0">
              {isLast ? null : (
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-3.5 top-8 w-px transition-colors duration-500 ${
                    linked ? "bg-accent-warm shadow-[0_0_8px_rgba(192,139,87,0.7)]" : "bg-ink/15"
                  }`}
                />
              )}

              <span className="relative z-10 flex h-7 w-7 items-center justify-center">
                <span
                  className={`node-label transition-colors duration-500 ${
                    reached
                      ? "border-accent bg-accent text-paper"
                      : "text-ink-muted"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>

              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => jumpTo(index)}
                  aria-pressed={index === active}
                  className={`flex w-full items-baseline justify-between gap-4 border-b pb-3 text-left transition-colors duration-500 ${
                    reached ? "border-accent/40" : "border-ink/15"
                  }`}
                >
                  <span
                    className={`display text-lg transition-colors duration-500 ${
                      reached ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {node.label}
                  </span>
                </button>
                <p className="mt-2 max-w-[52ch] text-sm text-ink-muted">{node.role}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-6 flex flex-wrap items-baseline gap-3 border-t border-ink/15 pt-4">
        <span className="eyebrow text-ink-muted">{status}</span>
        <span aria-live="polite" className="max-w-[52ch] text-sm text-ink-muted">
          {readout}
        </span>
      </p>
    </div>
  );
}
