import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductRead,updateproduct } from "../../../functions/product";
import ProductUpdateFrom from "../../../components/forms/ProductUpdateFrom";
import {
  getCategories,getCategorySubs,
} from "../../../functions/categories";
import  FileUpload   from "../../../components/forms/FileUpload"
import { LoadingOutlined } from "@ant-design/icons";

import {useParams} from 'react-router-dom'
import { useNavigate, Link} from "react-router-dom";

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
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
  
    const { slug } = useParams();
     const history = useNavigate();
  // redux
    // const 

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
    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateproduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
   }
   const handleChange = (e) => {
     setValues({ ...values, [e.target.name]: e.target.value });
     // console.log(e.target.name, " ----- ", e.target.value);
   };
   const handlecategoryChange = (e) => {
     e.preventDefault();
    //  console.log("Button clicked",e.target.value);
    //  console.log({...values},"fghfgfhfghhdfghdf")
    //  setValues({ ...values, subs:[]},"aaaaaaaaaaaaaaaaa");
     setValues({ ...values, subs: []});
     setSelectedCategory(e.target.value);
     getCategorySubs(e.target.value).then((res) => {
       setSubOptions(res.data);
       setValues({ ...values, subs: []});
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
        {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
          )}
          <hr />
          {/* {JSON.stringify(values)} */}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

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
            selectedCategory = {selectedCategory}
            // showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
