import axios from "axios";
import { resolve } from "./resolver";

const getProducts = async (pagination, searchQuery = '', priceRange = { min: 0, max: 10000 }, category = '') => {
    const { offset, limit } = pagination;
    const { min, max } = priceRange;

    const result = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
            offset,
            limit,
            title: searchQuery,
            price_min: min,
            price_max: max,
            categoryId: category,
        },
    });
    return resolve(result);
};


const createProducts = async (productData) => {
    const result = await axios.post("https://api.escuelajs.co/api/v1/products", productData);
    return resolve(result);
}

const editProducts = async (id, productData) => {
    const result = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, productData);
    return resolve(result);
}

const deleteProducts = async (id) => {
    const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    return resolve(result);
}

const findLimit = async (limit , searchQuery = '', priceRange = { min: 0, max: 10000 }, category = '') => {
    const { min, max } = priceRange;

    const result = await axios.get('https://api.escuelajs.co/api/v1/products', {
        params: {
            limit,
            title: searchQuery,
            price_min: min,
            price_max: max,
            categoryId: category,
        },
    });
    const resolvedresult = await resolve(result)
    return resolvedresult.data.length
}

export { getProducts, createProducts, editProducts, deleteProducts, findLimit };


