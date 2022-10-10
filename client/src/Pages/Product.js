import React,{useEffect,useState} from 'react'
import {ProductRead, relatedProduct} from "../functions/product"
import {useParams} from 'react-router-dom'
import SingleProduct from '../components/cards/SingleProduct';
import {productStar} from '../functions/product';
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

function Product() {
    const [product,setProduct] = useState({});
    const [star,setStar] = useState(0);
    const [related,setRelatedproduct] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams();
    useEffect(()=>{
        loadsingleproduct();
    },[])

    useEffect(() => {
        if (product.ratings && user) {
          let existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString()
          );
          existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
      });

    const loadsingleproduct = () =>{
        ProductRead(slug).then((res)=>{
            setProduct(res.data)
            relatedProduct(res.data._id).then((res)=>setRelatedproduct(res.data))
        })
    }
    const starrating = (rating,name) =>{
        setStar(rating);
        productStar(name,rating,user.token).then((res) => {
            console.log("rating clicked", res.data);
            loadsingleproduct(); // if you want to s)
        });    
        console.log(rating,name,"aaaaaaaaaaaaa");
    }

  return (
    <>
    {/* {JSON.stringify(product)} */}
        <div className='container-fluid'>
            <div className='row pt-4'>
                <SingleProduct product={product} starrating={starrating} star={star}/>
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                    {/* {JSON.stringify(relatedproduct)} */}
                </div>
            </div>
            <div className="row pb-5">
                {related.length ? (
                related.map((r) => (
                    <div key={r._id} className="col-md-4">
                    <ProductCard product={r} />
                    </div>
                ))
                ) : (
                <div className="text-center col">No Products Found</div>
                )}
            </div>
        </div>
    </>
  )
}

export default Product