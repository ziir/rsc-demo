function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

export function generateId() {
  const arr = new Uint8Array(5);
  crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}
