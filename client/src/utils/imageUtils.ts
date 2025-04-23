import imageCompression from "browser-image-compression";

type CompressOptions = {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
};

export const compressImage = async (file: File): Promise<File> => {
  const options: CompressOptions = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed", error);
    throw new Error("Image compression failed");
  }
};

export const getPlaceholderImage = async (): Promise<File> => {
  const placeholderImagePath = "/images/placeholder.webp";
  const response = await fetch(placeholderImagePath);
  if (!response.ok) {
    throw new Error("Failed to load placeholder image");
  }
  const blob = await response.blob();
  return new File([blob], "placeholder.webp", { type: "image/webp" });
};
