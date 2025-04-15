export const formatKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/iso/gi, "ISO")
    .replace(/fx/gi, "FX")
    .replace(/dr/gi, "DR")
    .replace(/wb/gi, "WB")
    .replace(/nr/gi, "NR")
    .replace(/\b\w/g, (m) => m.toUpperCase());
};
