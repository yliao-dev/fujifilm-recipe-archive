// components/RecipeForm.tsx
import { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { SelectChangeEvent, TextField } from "@mui/material";
import SelectField from "./SelectField";
import { basicFields, selectFields, settingFields } from "../data/formData";
import { formatKey } from "../utils/formatKey";

interface RecipeFormProps {
  mode?: "create" | "edit";
  initialData?: any;
  onSubmit: (formData: any) => void;
}

const RecipeForm = ({
  mode = "create",
  initialData,
  onSubmit,
}: RecipeFormProps) => {
  const [form, setForm] = useState(
    initialData || {
      name: "",
      camera_models: "",
      film_simulation: "",
      creator: "",
      tags: "",
      notes: "",
      settings: Object.fromEntries(settingFields.map((key) => [key, ""])),
    }
  );

  const [preview, setPreview] = useState<string | null>(
    initialData?.sample_image_url || null
  );

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (settingFields.includes(name)) {
      setForm((prev: any) => ({
        ...prev,
        settings: { ...prev.settings, [name]: value },
      }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      className="recipeCreate__form__container"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="recipeCreate__form">
        {basicFields.map(({ name, label, required, multiline, rows }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={initialData?.[name] || ""}
            required={required}
            multiline={multiline}
            rows={rows}
            variant="outlined"
            className="custom__textfield"
          />
        ))}

        <label className="image-upload">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="image-upload__preview"
            />
          ) : (
            <div className="image-upload__placeholder">
              <InsertPhotoIcon style={{ fontSize: "3rem" }} />
              Upload a sample image
            </div>
          )}
        </label>

        <button
          className="nav_button"
          type="submit"
          disabled={
            !form.name.trim() ||
            !String(form.camera_models) ||
            !form.film_simulation.trim()
          }
        >
          {mode === "edit" ? "Save Changes" : "Submit"}
        </button>
      </div>

      <div className="recipeCreate__form">
        {settingFields.map((key) => (
          <div key={key}>
            {selectFields[key] ? (
              <SelectField
                label={formatKey(key)}
                name={key}
                value={form.settings[key]}
                options={selectFields[key]}
                onChange={handleChange}
              />
            ) : (
              <TextField
                name={key}
                value={form.settings[key]}
                onChange={handleChange}
                placeholder={initialData?.settings?.[key] || ""}
                variant="outlined"
                className="custom__textfield"
              />
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default RecipeForm;
