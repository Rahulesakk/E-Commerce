import React,{useState,useEffect} from 'react'
import {getProductByCount,getproduct,productCount} from '../../functions/product'
import ProductCard from '../cards/ProductCard';
import Jumbotoron from '../cards/Jumbotoron';
import LoadingCard from "../cards/LoadingCard";
import {Pagination} from "antd";

function NewArraival() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [productsCount,setproductsCount] = useState(0);
  const [page,setPage] = useState(1);

  useEffect(() => {
    loadallproducts()
  },[page]);

  useEffect(() =>{
    productCount().then((res)=>setproductsCount(res.data))
  },[]);

  const loadallproducts = () =>{
    setLoading(true);
    getproduct('createdAt','desc',3)
    .then((res)=>{  
      setLoading(false);
      setProducts(res.data);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <>
      {productsCount}
      <div className='container'>
        
         {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination current={page} total={(productsCount/3)*10} onChange={(value)=>setPage(value)}/>
    </>
  )
}

export default NewArraival