import React,{useEffect,useState} from 'react'
import {ProductRead} from "../functions/product"
import {useParams} from 'react-router-dom'
import SingleProduct from '../components/cards/SingleProduct';

function Product() {
    const [product,setProduct] = useState({});
    const { slug } = useParams();
    useEffect(()=>{
        loadsingleproduct();
    },[])

    const loadsingleproduct = () =>{
        ProductRead(slug).then((res)=>setProduct(res.data))
    }
  return (
    <>
    {/* {JSON.stringify(product)} */}
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProduct product={product}/>
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
        </div>
    </>
  )
}

export default Product