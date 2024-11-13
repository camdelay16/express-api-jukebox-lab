import { useState } from "react";

const TrackForm = (props) => {
  const { selected, handleAddTrack } = props;

  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState(selected ? selected : initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (selected) {
      handleUpdateTrack(formData, selected._id);
    } else {
      handleAddTrack(formData);
    }
    setFormData({ title: "", artist: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <button type="submit">
          {selected ? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
