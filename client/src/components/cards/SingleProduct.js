import React from "react";
import { Card,Tabs} from "antd";
import { Link} from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import laptop from "../../images/laptop.png"
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProduct = ({ product,starrating,star}) => {
  const { title, description, images, _id } = product;

  return (
    <>
    {/* {product.title} */}
      <div className="col-md-7">
         {images ? <Carousel showArrows={true} autoPlay infiniteLoop>
              {images && images.map((i)=><img src={i.url} key={i.public_id}/>)}
          </Carousel> :
          <Card 
            cover={<img src={laptop}
            className="m-2 card-image" />} 
            >

          </Card>
        }
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
          <h1 className="bg-info p-3">{title}</h1>

          {/* <StarRating
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) =>
            console.log("newRating", newRating, "name", name)
          }
          isSelectable={true}
          starRatedColor="red"
        /> */}
       {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
              <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={starrating}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          {/* <Meta title={title} description={description} /> */}
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
