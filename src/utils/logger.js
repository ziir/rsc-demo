export const logger = {};
for (const method of ["log", "info", "error", "debug", "warn"]) {
  logger[method] = console[method].bind(console, "[rsc-notes-app]");
}
