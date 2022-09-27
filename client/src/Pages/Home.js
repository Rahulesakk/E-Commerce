import React,{useState,useEffect} from 'react'
import {getProductByCount} from '../functions/product'
import ProductCard from '../components/cards/ProductCard';
import Jumbotoron from '../components/cards/Jumbotoron';

function Home() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    loadallproducts()
  },[]);

  const loadallproducts = () =>{
    setLoading(true);
    getProductByCount(3)
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
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotoron text={["Latest products","New Arrivals","Best Seller"]} />
      </div>
      <div className='container'>
        <div className='row'>
          {products.map((product) => (
            <div key={product._id} className="col-md-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home