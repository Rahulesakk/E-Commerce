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

export const getproduct = async(sort,order,page) =>{
    return axios.post(`${process.env.REACT_APP_API}/product`,{
        sort,order,page,
    },)
}

export const productCount = async () => {
  return axios.get(`${process.env.REACT_APP_API}/getproducts/total`);
}

export const productStar = async (productId,star,authtoken) => {
    return axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`,{star},{
       headers:{
           authtoken,
       },
   })
}

export const relatedProduct = async (productId) => {
    return axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);
  }
