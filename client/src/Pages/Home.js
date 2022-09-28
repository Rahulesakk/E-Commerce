import React,{useState,useEffect} from 'react'
import {getProductByCount} from '../functions/product'
import ProductCard from '../components/cards/ProductCard';
import Jumbotoron from '../components/cards/Jumbotoron';
import LoadingCard from "../components/cards/LoadingCard";
import NewArraival from "../components/home/NewArraival";
import BestSellers from '../components/home/BestSellers';

function Home() {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);

  

  return (
    <>
      <div className='jumbotron text-danger h1 font-weight-bold text-center'>
        <Jumbotoron text={["Latest products","New Arrivals","Best Seller"]} />
      </div>
      <h4 className='text-center p-3 mt-5 mb-5 jumbotron display-4'>New Arrivals</h4>
      <NewArraival/>
      <h4 className='text-center p-3 mt-5 mb-5 jumbotron display-4'>Best Sellers</h4>
      <BestSellers/>
      <br/>
      <br/>
    </>
  )
}

export default Home