import { useState } from "react";

const RecipeCreatePage = () => {
  const [form, setForm] = useState({
    name: "",
    creator: "",
    cameraModels: "",
    tags: "",
    notes: "",
  });

  const handleChange = (e: {
    target: HTMLInputElement | HTMLTextAreaElement;
  }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", form);
  };

  return (
    <div className="form-page">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Add Recipe</h1>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
        />
        <input
          name="creator"
          value={form.creator}
          onChange={handleChange}
          placeholder="Creator"
        />
        <input
          name="cameraModels"
          value={form.cameraModels}
          onChange={handleChange}
          placeholder="Camera Models"
        />
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          rows={4}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default RecipeCreatePage;
