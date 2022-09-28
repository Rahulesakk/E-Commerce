import React,{useState,useEffect} from 'react'
import {getProductByCount,getproduct} from '../../functions/product'
import ProductCard from '../cards/ProductCard';
import Jumbotoron from '../cards/Jumbotoron';
import LoadingCard from "../cards/LoadingCard";

function BestSellers() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    loadallproducts()
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
    </>
  )
}

export default BestSellers