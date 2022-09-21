import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductRead } from "../../../functions/product";
import ProductUpdateFrom from "../../../components/forms/ProductUpdateFrom";
import {
  getCategories,getCategorySubs,
} from "../../../functions/categories";
import  FileUpload   from "../../../components/forms/FileUpload"

import {useParams} from 'react-router-dom'

const initialState = {
    title: "",
    description: "",
    price: "",
    // categories: [],
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
    const [values,setValues] = useState(initialState);
    const [categor, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState(false);
    const [arrayOfSubs,setArrayOfSubs] = useState([]);
  
    const { slug } = useParams();
  // redux

  const { user } = useSelector((state) => ({ ...state }));

   useEffect(()=>{
    loadCategories();
    loadproduct();
    
   },[])
   const loadproduct = () =>{
    ProductRead(slug).then((res) => {
      setValues({ ...values, ...res.data });
      console.log(res, "product information");

      getCategorySubs(res.data.category._id).then((res) => {
        console.log("aaaaaaaaaaaaaaa", res.data);
        setSubOptions(res.data);
      });
      let arr = [];
      res.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ssssssssssssss", arr);
      setArrayOfSubs((prev) => arr);
    });
  }
   const loadCategories = () =>
     getCategories().then((c) => {
      setCategories(c.data);
      console.log("asdadadadadd",c.data)
      // setValues({ ...values, categories: c.data });
     });


   const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
   }
   const handleChange = (e) => {
     setValues({ ...values, [e.target.name]: e.target.value });
     // console.log(e.target.name, " ----- ", e.target.value);
   };
   const handlecategoryChange = (e) => {
     e.preventDefault();
     console.log("Button clicked",e.target.value);
     console.log({...values},"fghfgfhfghhdfghdf")
     setValues({ ...values, subs:[],category: e.target.value },"aaaaaaaaaaaaaaaaa");
     setValues({ ...values, subs: [], category: e.target.value });
     getCategorySubs(e.target.value).then((res) => {
       setSubOptions(res.data);
       setValues({ ...values, subs: [], category: e.target.value });
       console.log("new select", res.data);
     });

     if(values.category._id===e.target.value) {
      loadproduct();
     }
     setArrayOfSubs([]);
    //  SetShowSub(true);
   };

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
          <ProductUpdateFrom
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            categor={categor}
            handlecategoryChange={handlecategoryChange}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            // showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
