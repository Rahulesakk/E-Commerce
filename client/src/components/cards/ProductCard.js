import React from 'react'
import { Card } from 'antd';
import laptop from "../../images/laptop.png"
import { EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { showAverage } from "../../functions/rating";

const {Meta} = Card;
function ProductCard({product}) {
    const { title, description, images,slug } = product;

  return (
    <>
     {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
    <Card
        cover={<img src={images && images.length ? images[0].url : laptop} style={{ height: "150px", objectFit: "cover",width:"95%" }}
            className="m-2" />}
        actions={
            [
                <Link to={`product/${slug}`}>
                     <EyeOutlined className='text-warning' /><br /> View Product
                </Link>,
                <>
                <ShoppingCartOutlined
                    // onClick={()=>{
                    //     handleRemove(slug)
                    // }}
                 className='text-danger' /> <br /> Add to Cart
                </>
                
            ]
        }
    >
        <Meta title={title} description={`${description && description.substr(0,40)}... `} />
    </Card>
    </>
  )
}

export default ProductCard