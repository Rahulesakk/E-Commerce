import React,{useState,useEffect} from 'react'
import {getSubs} from '../../functions/sub';
import {Link} from 'react-router-dom';

function CategoryList() {
    const [loading,setLoading] = useState(false);
    const [category,setCategory] = useState([]);

    useEffect(() => {
        setLoading(true);
        getSubs()
        .then((c)=>{
            setCategory(c.data)
            setLoading(false);
        })
    },[]);
    // const showcategories = () =>{
    //     category.map((c)=>{
    //         console.log(c.name);
    //         <div
    //             key ={c._id} 
    //             className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3">
    //             {c.name}
    //         </div>
    //     })
    // }
  return (
    <div className="container">
        <div className="row">
           
            {loading?(<h4 className="text-center">Loading...</h4>)
            :(category.map((c)=>{
            return(
                 <div
                key ={c._id} 
                className="col btn btn-outline-primary btn-lg btn-block btn-raised m-3"
                >
                <Link to={`sub/${c.slug}`}>{c.name} </Link>
            </div>
            )
           
        }))
            }
            
        </div>
    </div>
  )
}

export default CategoryList