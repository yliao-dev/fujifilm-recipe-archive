import { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import {
  basicFields,
  ExampleData,
  selectFields,
  settingFields,
} from "../data/formData";
import { formatKey } from "../utils/formatKey";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import { SelectChangeEvent, TextField } from "@mui/material";

const example = ExampleData[0]; // single example

const RecipeCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    camera_models: "",
    film_simulation: "",
    creator: "",
    tags: "",
    notes: "",
    settings: Object.fromEntries(settingFields.map((key) => [key, ""])),
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    if (settingFields.includes(name)) {
      setForm((prev) => ({
        ...prev,
        settings: { ...prev.settings, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [preview, setPreview] = useState<string | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/recipes");
  };

  return (
    <>
      <div className="recipeCreate__page">
        <h1>Add Your Custom Film Recipe</h1>
        <hr className="recipeList__divider" />

        <form className="recipeCreate__form__container" onSubmit={handleSubmit}>
          <div className="recipeCreate__form">
            {basicFields.map(({ name, label, required, multiline, rows }) => {
              const value = (form as any)[name];
              const placeholder = (example as any)?.[name];
              const placeholderText = Array.isArray(placeholder)
                ? placeholder.join(", ")
                : placeholder || "";

              return (
                <TextField
                  key={name}
                  label={label}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  placeholder={placeholderText}
                  required={required}
                  multiline={multiline}
                  rows={rows}
                  variant="outlined"
                  className="custom__textfield"
                />
              );
            })}
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
                !form.camera_models.trim() ||
                !form.film_simulation.trim()
              }
              onClick={() => {
                handleSubmit;
              }}
            >
              Submit
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
                    required={false}
                  />
                ) : (
                  <TextField
                    name={key}
                    value={form.settings[key]}
                    onChange={handleChange}
                    placeholder={
                      example.settings[key as keyof typeof example.settings]
                    }
                    variant="outlined"
                    className="custom__textfield"
                  />
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default RecipeCreatePage;
