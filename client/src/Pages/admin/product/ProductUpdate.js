import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductRead } from "../../../functions/product";
import ProductCreateFrom from "../../../components/forms/ProductCreateFrom";
import {
  getCategories,getCategorySubs,
} from "../../../functions/categories";
import  FileUpload   from "../../../components/forms/FileUpload"

import {useParams} from 'react-router-dom'

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
}




const ProductUpdate = () => {
    const [values,setvalues] = useState(initialState);
  
    const { slug } = useParams();
  // redux

  const { user } = useSelector((state) => ({ ...state }));

   useEffect(()=>{
    ProductRead(slug)
    .then((res)=>{
        setvalues({...values,...res.data})
        console.log(res,"product information")
    })
   },[])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>Product Update</h4>
          <hr />
        {JSON.stringify(values)}
          </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
