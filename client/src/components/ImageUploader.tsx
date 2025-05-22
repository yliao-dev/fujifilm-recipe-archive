import { useEffect, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { compressImage } from "../utils/imageUtils";

interface Props {
  initialUrl?: string;
  onImageReady: (file: File, previewUrl: string) => void;
}

const ImageUploader = ({ initialUrl, onImageReady }: Props) => {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);

  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl);
    }
  }, [initialUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file);
      const previewUrl = URL.createObjectURL(compressed);
      setPreview(previewUrl);
      onImageReady(compressed, previewUrl);

      // console.log("Compressed Image Info:");
      // console.log("Size:", (compressed.size / 1024).toFixed(2), "KB");
      // console.log("Type:", compressed.type);

      const img = new Image();
      // img.onload = () => {
      //   console.log("Width:", img.width, "px");
      //   console.log("Height:", img.height, "px");
      // };
      img.src = previewUrl;
    } catch (err) {
      console.error("Image compression error:", err);
    }
  };

  return (
    <label className="image-upload">
      <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
      {preview ? (
        <img src={preview} alt="Preview" className="image-upload__preview" />
      ) : (
        <div className="image-upload__placeholder">
          <InsertPhotoIcon style={{ fontSize: "3rem" }} />
          Upload a sample image
        </div>
      )}
    </label>
  );
};

export default ImageUploader;
