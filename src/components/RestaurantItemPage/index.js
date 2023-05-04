import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'

import './index.css'

const RestaurantItemPage = props => {
  const {item} = props
  const addColorToRating =
    item.rating >= 4.0 ? 'ratingColor' : 'removeRatingColor'

  return (
    <li className="main-restaurant-list">
      <Link to={`/restaurant/${item.id}`} className="add-new">
        <div className="list-item-restaurant">
          <div className="home-restaurant-image-container">
            <img
              src={item.imageUrl}
              alt="restaurant"
              className="home-restaurant-image"
            />
          </div>
          <div className="restaurant-name-container">
            <h1 className="restaurant-name">{item.name}</h1>
            <p className="foodType">{item.menuType}</p>
            <p className="food-count">{item.cuisine}</p>
            <div className="star-container">
              <BsStarFill className={`${addColorToRating} ratingColor`} />
              <p className="food-rating">{item.rating}</p>
              <h1 className="food-review-count">{`(${item.reviewCount} reviews)`}</h1>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItemPage
