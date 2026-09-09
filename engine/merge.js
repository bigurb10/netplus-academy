// Pure merge helpers for cross-device course progress. No DOM, no network, no engine state.
// Loaded as a plain script in the browser (sets window.FRAMerge) and required directly by tests.
(function (root, factory) {
  const api = factory();
  root.FRAMerge = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const VERSION = 1;

  return { VERSION };
}));
