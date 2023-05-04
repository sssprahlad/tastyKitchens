import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import HeaderPage from '../HeaderPage'
import RestaurantItemPage from '../RestaurantItemPage'
import Footer from '../Footer'
import Loading from '../Loader'
import './index.css'

const openRestaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class OpenRestaurantsPage extends Component {
  state = {
    getOpenedRestaurantAPI: openRestaurantComponent.initial,
    openRestaurantData: [],
    date: new Date(),
  }

  componentDidMount = () => {
    this.getOpenedRestaurantDetails()
  }

  getOpenedRestaurantDetails = async () => {
    this.setState({getOpenedRestaurantAPI: openRestaurantComponent.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const restaurantUrl = `https://apis.ccbp.in/restaurants-list?offset=${0}&limit=${50}&sort_by_rating=${'Lowest'}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantUrl, options)
    if (response.ok === true) {
      const restaurantInfo = await response.json()
      const updatedOpenRestaurantData = restaurantInfo.restaurants.map(
        eachRestaurant => ({
          name: eachRestaurant.name,
          menuType: eachRestaurant.menu_type,
          hasOnlineDelivery: eachRestaurant.has_online_delivery,
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          imageUrl: eachRestaurant.image_url,
          id: eachRestaurant.id,
          reviewCount: eachRestaurant.user_rating.total_reviews,
          cuisine: eachRestaurant.cuisine,
          opensAt: eachRestaurant.opens_at,
        }),
      )

      this.setState({
        getOpenedRestaurantAPI: openRestaurantComponent.success,
        openRestaurantData: updatedOpenRestaurantData,
      })
    } else {
      this.setState({getOpenedRestaurantAPI: openRestaurantComponent.failure})
    }
  }

  initiateRestaurant = () => {
    this.getOpenedRestaurantDetails()
  }

  openRestaurantFailure = () => (
    <div className="home-new">
      <img
        src="https://res.cloudinary.com/image-link-getter/image/upload/v1633514187/Layer_1_errxca.jpg"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-name">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.initiateRestaurant}
      >
        Retry
      </button>
    </div>
  )

  openRestaurantInprogress = () => (
    <Loading testValue="restaurant-details-loader" />
  )

  openRestaurantSuccess = () => {
    const {openRestaurantData, date} = this.state
    const getCurrentlyOpenRestaurant = openRestaurantData.filter(eachOne => {
      const splittedTime = eachOne.opensAt.split(':')
      const getTime = splittedTime[0]

      let compareTimes = date.toLocaleTimeString()[0]
      if (compareTimes.length === 1) {
        compareTimes = '0'.concat(compareTimes)
      }
      if (compareTimes === getTime) {
        return eachOne
      }
      return null
    })
    return getCurrentlyOpenRestaurant.length > 0 ? (
      <>
        <ul
          data-testid="restaurant-item"
          className="ul-openRestaurant-item-container"
        >
          {getCurrentlyOpenRestaurant.map(eachOne => (
            <RestaurantItemPage item={eachOne} key={eachOne.id} />
          ))}
        </ul>
      </>
    ) : (
      <div className="no-orders-container">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1641734134/manager_james_wdczmi.gif"
          alt="No-order-found"
          className="no-orders-found"
        />
        <h1 className="no-open-items">oops!! No Restaurants Found</h1>
      </div>
    )
  }

  getOpenRestaurantComponent = () => {
    const {getOpenedRestaurantAPI} = this.state
    switch (getOpenedRestaurantAPI) {
      case openRestaurantComponent.success:
        return this.openRestaurantSuccess()
      case openRestaurantComponent.inprogress:
        return this.openRestaurantInprogress()
      case openRestaurantComponent.failure:
        return this.openRestaurantFailure()
      default:
        return null
    }
  }

  render() {
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="openRestaurant-container">
        <div className="openRestaurant-items-container">
          <HeaderPage />
          <h1 className="opened-restaurant">Currently Opened Restaurants</h1>
          <p className="open-description">
            We Can See Restaurants Based on Current Time.
          </p>
          {this.getOpenRestaurantComponent()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default OpenRestaurantsPage
