import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import HeaderPage from '../HeaderPage'
import CarouselImages from '../CarouselImages'
import PopularRestaurantPage from '../PopularRestaurantPage'
import RestaurantItemPage from '../RestaurantItemPage'
import Counter from '../Counter'
import Footer from '../Footer'
import Loading from '../Loader/index'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselComponent = {
  initiaL: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const restaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    carouselData: [],
    restaurantData: [],
    carouselApiStatus: carouselComponent.initial,
    restaurantApiStatus: restaurantComponent.initial,
    sortedValue: sortByOptions[1].value,
    offSetValue: 1,
    search: '',
  }

  componentDidMount() {
    this.getCarousel()
    this.getRestaurant()
  }

  getCarousel = async () => {
    this.setState({carouselApiStatus: carouselComponent.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const carouselUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselUrl, options)
    if (response.ok === true) {
      const carouselInfo = await response.json()
      const updatedCarouselInfo = carouselInfo.offers.map(eachItem => ({
        id: eachItem.id,
        imageItem: eachItem.image_url,
      }))
      this.setState({
        carouselData: updatedCarouselInfo,
        carouselApiStatus: carouselComponent.success,
      })
    } else {
      this.setState({carouselApiStatus: carouselComponent.failure})
    }
  }

  getRestaurant = async () => {
    const {sortedValue, offSetValue} = this.state
    this.setState({restaurantApiStatus: restaurantComponent.inprogress})
    const offset = (offSetValue - 1) * 9
    const jwtToken = Cookies.get('jwt_token')
    const restaurantUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${9}&sort_by_rating=${sortedValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantUrl, options)
    if (response.ok === true) {
      const restaurantInfo = await response.json()
      const updatedRestaurantData = restaurantInfo.restaurants.map(
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
        restaurantApiStatus: restaurantComponent.success,
        restaurantData: updatedRestaurantData,
      })
    } else {
      this.setState({restaurantApiStatus: restaurantComponent.failure})
    }
  }

  updateSortItems = sortValue => {
    this.setState({sortedValue: sortValue}, this.getRestaurant)
  }

  decreaseItems = () => {
    const {offSetValue} = this.state
    this.setState({offSetValue: offSetValue - 1}, this.getRestaurant)
  }

  increaseItems = () => {
    const {offSetValue} = this.state
    this.setState({offSetValue: offSetValue + 1}, this.getRestaurant)
  }

  updateSearchResult = search => {
    this.setState({search})
  }

  initiateRestaurant = () => {
    this.getRestaurant()
  }

  restaurantFailure = () => (
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

  restaurantInprogress = () => <Loading testValue="restaurants-offers-loader" />

  restaurantSuccess = () => {
    const {restaurantData, search} = this.state
    const searchResult = restaurantData.filter(eachSearch =>
      eachSearch.name.toLowerCase().includes(search.toLowerCase()),
    )
    return searchResult.length > 0 ? (
      <>
        <ul
          className="ul-restaurant-item-container"
          data-testid="restaurant-item"
        >
          {searchResult.map(eachOne => (
            <RestaurantItemPage item={eachOne} key={eachOne.id} />
          ))}
        </ul>
      </>
    ) : (
      <div className="no-results-item-container">
        <h1 className="no-items">No Results Found</h1>
      </div>
    )
  }

  getRestaurantComponent = () => {
    const {restaurantApiStatus} = this.state
    switch (restaurantApiStatus) {
      case restaurantComponent.success:
        return this.restaurantSuccess()
      case restaurantComponent.inprogress:
        return this.restaurantInprogress()
      case restaurantComponent.failure:
        return this.restaurantFailure()
      default:
        return null
    }
  }

  initiateCarousel = () => this.getCarousel()

  carouselFailure = () => (
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
        onClick={this.initiateCarousel}
      >
        Retry
      </button>
    </div>
  )

  carouselInprogress = () => <Loading testid="restaurants-offers-loader" />

  carouselSuccess = () => {
    const {carouselData} = this.state
    return (
      <ul className="carousel-list">
        <CarouselImages item={carouselData} />
      </ul>
    )
  }

  getCarouselComponent = () => {
    const {carouselApiStatus} = this.state
    switch (carouselApiStatus) {
      case carouselComponent.success:
        return this.carouselSuccess()
      case carouselComponent.inprogress:
        return this.carouselInprogress()
      case carouselComponent.failure:
        return this.carouselFailure()
      default:
        return null
    }
  }

  render() {
    const {sortedValue} = this.state
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home-container">
        <div className="home-items-container">
          <HeaderPage />
          {this.getCarouselComponent()}
          <PopularRestaurantPage
            sortByOptions={sortByOptions}
            updateSortItems={this.updateSortItems}
            sortedValue={sortedValue}
            updateSearchResult={this.updateSearchResult}
          />
          <hr />
          {this.getRestaurantComponent()}
          <Counter
            decreaseItems={this.decreaseItems}
            increaseItems={this.increaseItems}
          />
        </div>
        <Footer />
      </div>
    )
  }
}
export default HomePage
