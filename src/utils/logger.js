export const logger = {};

for (const method of ["debug", "log", "info", "warn", "error"]) {
  logger[method] = console[method].bind(console, "[rsc-notes-app]");
}
