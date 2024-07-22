import axios from "axios";
import { resolve } from "./resolver";

const postImage = async (formData) => {
  const result = await axios.post(
    "https://api.escuelajs.co/api/v1/files/upload",
    formData
  );
  return resolve(result);
};

export { postImage };
