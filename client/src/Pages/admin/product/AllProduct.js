import React, { useEffect, useState } from 'react'
import AdminNav from '../../../components/nav/AdminNav';
// import AdminNav from '../../components/nav/AdminNav'
import { getProductByCount,removeProduct } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

function AllProduct() {
  const [products, Setproducts] = useState([]);
  const [loading, setloading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    listallproducts()
  }, [])

  const listallproducts = () => {
    setloading(true)
    getProductByCount(100)
      .then((res) => {
        setloading(false)
        Setproducts(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        setloading(false)
        console.log(err)
      })
  }
  const handleRemove = (slug) => {
    if(window.confirm("Delete?")){
        removeProduct(slug,user.token)
        .then((res)=>{
            listallproducts()
            toast.error(`${res.data.title} is deleted`);
        })
        .catch((err)=>{
            console.log(err)
            if(err.response.status==400) toast.err(err.response.data)
        })
    }
  }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (<h4 className='text-danger'>Loading....</h4>) : (<h4>All Products</h4>)}
          <div className='row'>
            {products.map((product) => (
              <div className='col-md-4 pb-3' key={product._id}>

                <AdminProductCard product={product}
                handleRemove = {handleRemove}/>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct