import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import HeaderPage from '../HeaderPage'
import CartItems from '../CartItems'
import Footer from '../Footer'
import Loading from '../Loader/index'
import './index.css'

const specificRestaurantComponent = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  payed: 'PAYED',
}

class CartTub extends Component {
  state = {
    cartApiStatus: specificRestaurantComponent.initial,
    itemsCount: 1,
    cartIdentify: '',
    count: 0,
  }

  componentDidMount() {
    this.getCart()
    this.getCost()
  }

  getCart = () => {
    this.setState({cartApiStatus: specificRestaurantComponent.inprogress})
    this.setState({cartApiStatus: specificRestaurantComponent.success})
  }

  getCost = () => {
    const getValues = localStorage.getItem('cartData')
    let convert = []
    if (getValues !== null) {
      convert = JSON.parse(getValues)
    }

    if (convert.length !== 0) {
      const getTotalPrice = convert.map(
        eachItemCost => eachItemCost.quantity * eachItemCost.cost,
      )
      const addGetTotalPrice = getTotalPrice.reduce((One, add) => One + add)
      this.setState({count: addGetTotalPrice})
    }
  }

  restaurantPayed = () => (
    <div className="payed-container">
      <div className="payed-bottom-container">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1634020176/Vectorsucces_mkuizy.jpg"
          alt="success"
          className="success"
        />
        <h1 className="payment-name">Payment Successful</h1>
        <p className="payment-status">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="order">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  cartFailure = () => (
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
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  cartInprogress = () => <Loading />

  updateState = () => {
    localStorage.removeItem('cartData')
    this.setState({cartApiStatus: specificRestaurantComponent.payed})
  }

  changeState = () => {
    this.setState({cartApiStatus: specificRestaurantComponent.success})
  }

  updateItems = id => {
    this.setState(prev => ({itemsCount: prev.itemsCount + 1, cartIdentify: id}))
  }

  cartSuccess = () => {
    const {itemsCount, cartIdentify, count} = this.state
    const getValuesFromLocal = localStorage.getItem('cartData')
    let converting = []
    if (getValuesFromLocal !== null) {
      converting = JSON.parse(getValuesFromLocal)
    }
    return converting.length <= 0 ? (
      <div className="cart-bottom-container">
        <img
          src="https://res.cloudinary.com/image-link-getter/image/upload/v1633884154/OBJECTSbowl_xqhwmy.jpg"
          alt="empty cart"
          className="cart-bowl"
        />
        <h1 className="cart-noProduct">No Order Yet!</h1>
        <p className="cart-your">
          Your cart is empty. Add something from the menu.
        </p>
        <Link to="/">
          <button type="button" className="order">
            Order Now
          </button>
        </Link>
      </div>
    ) : (
      <div>
        <div className="cart-section-container">
          <div className="first-section-container">
            <div className="name-con">
              <h1 className="item-name mention-width">Item</h1>
              <h1 className="item-name">Item Name</h1>
              <h1 className="item-name">Quantity</h1>
              <h1 className="item-name">Price</h1>
              <h1 className="item-name">Remove</h1>
            </div>
            <ul className="cart-ul-container">
              {converting.map(eachOne => (
                <CartItems
                  itemCart={eachOne}
                  updateCost={this.updateCost}
                  itemsCount={itemsCount}
                  updateItems={this.updateItems}
                  key={eachOne.id}
                  isTrue={cartIdentify}
                  getCostFun={this.getCost}
                  changeState={this.changeState}
                />
              ))}
            </ul>
            <hr className="horizontal-line" />
            <div className="order-container">
              <h1 className="order-name">Order Total: </h1>
              <div>
                <div className="total-price-merge">
                  <BiRupee />
                  <p data-testid="total-price">{count}</p>
                </div>

                <button
                  type="button"
                  className="place-order-button"
                  onClick={this.updateState}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  getCartComponent = () => {
    const {cartApiStatus} = this.state
    switch (cartApiStatus) {
      case specificRestaurantComponent.success:
        return this.cartSuccess()
      case specificRestaurantComponent.inprogress:
        return this.cartInprogress()
      case specificRestaurantComponent.failure:
        return this.cartFailure()
      case specificRestaurantComponent.payed:
        return this.restaurantPayed()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cart-container">
        <HeaderPage />
        {this.getCartComponent()}
      </div>
    )
  }
}

export default CartTub
