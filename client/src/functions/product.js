import axios from "axios";

export const createProduct = async(product,authtoken) =>{
    return axios.post(`${process.env.REACT_APP_API}/products`,product,{
        headers:{
            authtoken,
        },
    })
}