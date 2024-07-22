import axios from "axios";
import { resolve } from "./resolver";

const getCategories = async () => {
    const result = await axios.get("https://api.escuelajs.co/api/v1/categories");
    return resolve(result);
}

export { getCategories };


