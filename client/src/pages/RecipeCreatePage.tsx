import { useState } from "react";
import { formatKey } from "../utils/formatKey";

const settingFields = [
  "film_simulation",
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

const RecipeCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    creator: "",
    cameraModels: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="recipeCreate__page">
      <form className="recipeCreate__form" onSubmit={handleSubmit}>
        <h1>Add Recipe</h1>

        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Recipe Name"
            required
          />
        </label>

        <label>
          Creator
          <input
            name="creator"
            value={form.creator}
            onChange={handleChange}
            placeholder="Creator"
          />
        </label>

        <label>
          Camera Models
          <input
            name="cameraModels"
            value={form.cameraModels}
            onChange={handleChange}
            placeholder="Camera Models"
          />
        </label>

        <label>
          Tags
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags"
          />
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes"
            rows={3}
          />
        </label>

        {settingFields.map((key) => (
          <label key={key}>
            {formatKey(key)}
            <input
              name={key}
              value={form.settings[key]}
              onChange={handleChange}
              placeholder={formatKey(key)}
            />
          </label>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RecipeCreatePage;
