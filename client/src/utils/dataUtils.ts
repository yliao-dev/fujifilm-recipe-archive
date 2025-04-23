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

export const buildFormData = (
  data: Record<string, any>,
  fileFieldMap: Record<string, string>
) => {
  const formData = new FormData();

  if (!data.sampleFile) {
    data.sampleFile = getPlaceholderImage(); // return a File object (either placeholder or user file)
  }
  for (const key in data) {
    const value = data[key];

    if (fileFieldMap[key] && value instanceof File) {
      // Rename key if needed
      formData.append(fileFieldMap[key], value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // Nest object like `settings`
      formData.append(key, JSON.stringify(value));
    } else {
      // Append string or array as a joined string
      formData.append(
        key,
        Array.isArray(value) ? value.join(",") : value ?? ""
      );
    }
  }

  return formData;
};
