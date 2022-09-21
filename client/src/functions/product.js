import axios from "axios";
import { registerVersion } from "firebase/app";

export const createProduct = async(product,authtoken) =>{
    return axios.post(`${process.env.REACT_APP_API}/products`,product,{
        headers:{
            authtoken,
        },
    })
}

export const getProductByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
  };

export const removeProduct = async (slug,authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,{
        headers:{
            authtoken,
        },
    })
}

export const ProductRead = async  (slug) =>{
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
}