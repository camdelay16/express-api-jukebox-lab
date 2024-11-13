import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (formData) => {
  try {
    const res = await axios.post(BASE_URL, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (formData, trackId) => {
  try {
    const res = await axios.put(`${BASE_URL}/${trackId}`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteTrack = async (trackId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${trackId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { index, create, update, deleteTrack };
