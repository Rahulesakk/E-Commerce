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
export const updateproduct = async (slug,product,authtoken) => {
     return axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
        headers:{
            authtoken,
        },
    })
}

export const getproduct = async(sort,order,limit) =>{
    return axios.post(`${process.env.REACT_APP_API}/product`,{
        sort,order,limit,
    },)
}

export const productCount = async () => {
  return axios.get(`${process.env.REACT_APP_API}/getproducts/total`);
}
  
