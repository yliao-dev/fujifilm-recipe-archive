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
    const newFileName = file.name.replace(/\.\w+$/, ".webp");
    const webpFile = new File([compressedFile], newFileName, {
      type: "image/webp",
    });
    return webpFile;
  } catch (error) {
    console.error("Image compression failed", error);
    throw new Error("Image compression failed");
  }
};

export const getPlaceholderImage = async (): Promise<File> => {
  const response = await fetch("/images/placeholder.webp");
  if (!response.ok) {
    throw new Error("Failed to load placeholder image");
  }
  const blob = await response.blob();
  return new File([blob], "placeholder.webp", { type: "image/webp" });
};
