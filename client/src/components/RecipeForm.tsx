// components/RecipeForm.tsx
import { useState } from "react";
import { SelectChangeEvent, TextField } from "@mui/material";
import SelectField from "./SelectField";
import ImageUploader from "./ImageUploader";
import {
  basicFields,
  ExampleData,
  selectFields,
  settingFieldConfigs,
} from "../data/formData";
import { formatKey } from "../utils/dataUtils";
import { getPlaceholder } from "../utils/dataUtils";

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
      sample_image_url: "",
      settings: Object.fromEntries(
        settingFieldConfigs.map(({ name }) => [name, ""])
      ),
    }
  );

  const [sampleFile, setSampleFile] = useState<File | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (settingFieldConfigs.some((field) => field.name === name)) {
      setForm((prev: any) => ({
        ...prev,
        settings: { ...prev.settings, [name]: value },
      }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageReady = (file: File, previewUrl: string) => {
    setSampleFile(file);
    setForm((prev: any) => ({ ...prev, sample_image_url: previewUrl }));
  };

  const example = ExampleData[0];

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
            placeholder={
              getPlaceholder(initialData?.[name]) ||
              getPlaceholder((example as any)?.[name])
            }
            required={required}
            multiline={multiline}
            rows={rows}
            variant="outlined"
            className="custom__textfield"
          />
        ))}

        <ImageUploader
          initialUrl={initialData?.sample_image_url}
          onImageReady={handleImageReady}
        />

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
        {settingFieldConfigs.map(({ name, type }) => (
          <div key={name}>
            {type === "select" && selectFields[name] ? (
              <SelectField
                label={formatKey(name)}
                name={name}
                value={form.settings[name]}
                options={selectFields[name]}
                onChange={handleChange}
              />
            ) : (
              <TextField
                name={name}
                label={formatKey(name)}
                value={form.settings[name]}
                onChange={handleChange}
                placeholder={
                  getPlaceholder(initialData?.settings?.[name]) ||
                  getPlaceholder(
                    example.settings[name as keyof typeof example.settings]
                  )
                }
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
