import { useState } from "react";
import { ExampleData } from "../data/exampleData";
import { formatKey } from "../utils/formatKey";
import { useNavigate } from "react-router-dom";

const settingFields = [
  "grain_effect",
  "color_chrome_effect",
  "color_chrome_fx_blue",
  "white_balance",
  "dynamic_range",
  "highlight",
  "shadow",
  "color",
  "sharpness",
  "high_iso_nr",
  "clarity",
  "iso",
  "exposure_compensation",
  "noise_reduction",
];

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

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
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

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("recipeSuccess", "1");
    navigate("/recipes");
  };

  return (
    <>
      <div className="recipeCreate__page">
        <h1>Add Your Custom Film Recipe</h1>
        <hr className="recipeList__divider" />

        <form className="recipeCreate__form__container" onSubmit={handleSubmit}>
          <div className="recipeCreate__form">
            {settingFields.map((key) => (
              <label key={key}>
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
            ))}
          </div>

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
            <label>
              Sample Image
              <input type="file" accept="image/*" />
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
        </form>
      </div>
    </>
  );
};

export default RecipeCreatePage;
