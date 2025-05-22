import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../config";
import { ApiError } from "../types/apiResponses";

const uploadImage = async ({
  recipeId,
  file,
}: {
  recipeId: string;
  file: File;
}): Promise<string> => {
  const formData = new FormData();
  formData.append("sample_image", file);

  const res = await fetch(`${BASE_URL}/items/${recipeId}/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: formData,
  });

  if (!res.ok) {
    try {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to upload the image.");
    } catch (err) {
      throw new Error("Unexpected error occurred while uploading the image.");
    }
  }

  const response = await res.json();
  return response.image_url; // Assuming the response contains the image URL
};

const useUploadImage = () =>
  useMutation<string, Error, { recipeId: string; file: File }>({
    mutationFn: ({ recipeId, file }) => uploadImage({ recipeId, file }),
    onSuccess: (imageUrl) => {
      console.log("Image uploaded successfully:", imageUrl);
    },
    onError: (error) => {
      console.error("Error uploading image:", error.message);
    },
  });

export default useUploadImage;
