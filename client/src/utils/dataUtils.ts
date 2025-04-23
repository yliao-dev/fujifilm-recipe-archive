import { getPlaceholderImage } from "./imageUtils";

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

export const getPlaceholder = (value: any): string =>
  Array.isArray(value) ? value.join(", ") : value || "";

export const normalizeArrayField = (
  input: string | string[] | null | undefined
): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};
