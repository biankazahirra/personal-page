# Working agreement

Instructions for AI agents working in this repository. They override defaults.

## Do the task, nothing else

1. Do only what was asked. Work nobody asked for does not get done: no refactors,
   no doc updates, no "while I am here" fixes.
2. Match verification to the size of the change. Changing a CSS value means
   reading the value back. It does not mean a rebuild, a server, or a browser
   run. Logic changes get the gates in `package.json` (`tsc`, `lint`, `test`,
   `build`).
3. No production checks, route sweeps, timing measurements, or deploys unless the
   owner asks for them in that message.
4. When extra verification looks warranted, ask first instead of running it.
5. Report the diff and what was checked. If something was not checked, say so in
   one line. Never claim coverage that was not measured.
