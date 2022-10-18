import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {getCategory} from '../../functions/categories'
import ProductCard from '../../components/cards/ProductCard'


function CategoryHome() {
    const [loading,setloading] = useState(false);
    const [category,setCategory] = useState({});
    const [products,setProducts] = useState([]);
    let {slug} = useParams();

    useEffect(() => {
        setloading(true)
        getCategory(slug)
        .then((c)=>{
            setloading(false);
            console.log(JSON.stringify(c.data,null,4));
            setCategory(c.data.category);
            setProducts(c.data.products);
            setloading(false);
        })  
    },[]);
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                {loading ? 
                (<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'> Loading...</h4>) 
                : 
                (<h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'> 
                {products.length} products in "{category.name}" category
                </h4>)}
            </div>
        </div>
        <div className='row'>
            {products.map((p)=>(
                <div className='col' key = {p._id}> <ProductCard product={p}/></div>
            ))}
        </div>            
    </div>
  )
}

export default CategoryHome