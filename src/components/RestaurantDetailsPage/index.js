import {BsStarFill} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import './index.css'

const RestaurantDetailsPage = props => {
  const {specificItemsDetails} = props
  const restaurantTime = specificItemsDetails.opensAt.split(' ')
  return (
    <div className="item-details-containers">
      <div className="specific-card">
        <img
          src={specificItemsDetails.imageUrl}
          alt="restaurant"
          className="specific-item"
        />
        <div className="details-con">
          <h1 className="specific-name">{specificItemsDetails.name}</h1>
          <p className="specific-cuisine">{specificItemsDetails.cuisine}</p>
          <p className="specific-location">{specificItemsDetails.location}</p>
          <div className="merge">
            <div className="one">
              <div className="merge">
                <BsStarFill className="rating" />
                <p className="specific-rating">{specificItemsDetails.rating}</p>
              </div>
              <p className="specific-reviewCount">{`${specificItemsDetails.reviewsCount}+ Ratings`}</p>
            </div>
            <img
              src="https://res.cloudinary.com/image-link-getter/image/upload/v1633843754/Line_6line_szofua.jpg"
              alt="line"
              className="line"
            />
            <div className="one">
              <div className="merge">
                <BiRupee className="ratingTwo" />
                <p className="specific-rating">
                  {specificItemsDetails.costForTwo}
                </p>
              </div>
              <p className="specific-reviewCount">Cost for two</p>
            </div>
          </div>
          <p className="open-time">{`${restaurantTime[0]} ${restaurantTime[1]} Open Time`}</p>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetailsPage
