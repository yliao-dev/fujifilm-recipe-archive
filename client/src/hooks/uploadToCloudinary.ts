import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";

export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fujirecipes");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dib01af0r/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) throw new Error("Cloudinary upload failed.");
  const data = await res.json();
  return data.secure_url;
}

const updateRecipeImage = async ({
  recipeId,
  imageUrl,
}: {
  recipeId: string;
  imageUrl: string;
}): Promise<void> => {
  const res = await fetch(`${BASE_URL}/items/${recipeId}/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: JSON.stringify({ image: imageUrl }),
  });

  if (!res.ok) throw new Error("Failed to update recipe image.");
};

export function useUpdateRecipeImage() {
  return useMutation<void, Error, { recipeId: string; imageUrl: string }>({
    mutationFn: updateRecipeImage,
  });
}
