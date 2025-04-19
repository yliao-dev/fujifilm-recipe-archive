import { useState } from "react";
import { ExampleData, selectFields, settingFields } from "../data/formData";
import { formatKey } from "../utils/formatKey";
import { useNavigate } from "react-router-dom";
import SelectField from "../components/SelectField";
import { SelectChangeEvent } from "@mui/material";

const example = ExampleData[0]; // single example

const RecipeCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    cameraModels: "",
    filmSimulation: "",
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
            <label>
              <span className="required">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={example.name}
                required
              />
            </label>

            <label>
              <span className="required">Camera Models</span>
              <input
                name="cameraModels"
                value={form.cameraModels}
                onChange={handleChange}
                placeholder={example.camera_models.join(", ")}
              />
            </label>

            <label>
              <span className="required">Film Simulation</span>
              <input
                name="filmSimulation"
                value={form.filmSimulation}
                onChange={handleChange}
                placeholder={example.film_simulation}
                required
              />
            </label>

            <label>
              Creator
              <input
                name="creator"
                value={form.creator}
                onChange={handleChange}
                placeholder={example.creator}
              />
            </label>

            <label>
              Tags
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder={example.tags.join(", ")}
              />
            </label>
            <label>
              Notes
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder={example.notes}
                rows={3}
              />
            </label>
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
                  Upload a sample image
                </div>
              )}
            </label>
            <button
              className="nav_button"
              type="submit"
              disabled={
                !form.name.trim() ||
                !form.cameraModels.trim() ||
                !form.filmSimulation.trim()
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
                  <label>
                    {formatKey(key)}
                    <input
                      name={key}
                      value={form.settings[key]}
                      onChange={handleChange}
                      placeholder={
                        example.settings[key as keyof typeof example.settings]
                      }
                    />
                  </label>
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
