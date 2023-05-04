import {BiRupee} from 'react-icons/bi'
import {Component} from 'react'
import {MdRemoveShoppingCart} from 'react-icons/md'

import './index.css'

class CartItems extends Component {
  state = {newArrayOne: 0}

  componentDidMount() {
    this.showQuantity()
  }

  showQuantity = () => {
    const {itemCart} = this.props

    const getSaveItemsOne = localStorage.getItem('cartData')
    let convertSaveItemsOne
    if (getSaveItemsOne !== null) {
      convertSaveItemsOne = JSON.parse(getSaveItemsOne)
    }

    if (convertSaveItemsOne !== undefined) {
      const getQuantityFromSaveItemsOne = convertSaveItemsOne.filter(
        eachOne => eachOne.id === itemCart.id,
      )

      if (getQuantityFromSaveItemsOne.length > 0) {
        this.setState({newArrayOne: getQuantityFromSaveItemsOne[0].quantity})
      }
    }
  }

  removeItemsFromCart = () => {
    const {itemCart, changeState, getCostFun} = this.props
    const getSaveItemsFromCart = localStorage.getItem('cartData')
    let convertSaveItemsFromCart
    if (getSaveItemsFromCart !== null) {
      convertSaveItemsFromCart = JSON.parse(getSaveItemsFromCart)
    }

    if (convertSaveItemsFromCart !== undefined) {
      const removeFromCart = convertSaveItemsFromCart.filter(
        eachItem => eachItem.id !== itemCart.id,
      )
      if (removeFromCart.length > 0) {
        localStorage.setItem('cartData', JSON.stringify(removeFromCart))
        changeState()
      } else {
        localStorage.removeItem('cartData')
        changeState()
      }
    }
    getCostFun()
  }

  updateItemsCount = () => {
    const {itemCart, getCostFun} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    let convertSaveItems
    if (getSaveItems !== null) {
      convertSaveItems = JSON.parse(getSaveItems)
    }
    if (convertSaveItems !== undefined) {
      const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
        if (eachFood.id === itemCart.id) {
          return {...eachFood, quantity: eachFood.quantity + 1}
        }
        return eachFood
      })

      localStorage.setItem('cartData', JSON.stringify(getSaveItemsFromMap))
    }
    this.showQuantity()
    getCostFun()
  }

  removeCartSaveItems = () => {
    const {itemCart, getCostFun, changeState} = this.props

    const getSaveItems = localStorage.getItem('cartData')
    let convertSaveItems
    if (getSaveItems !== null) {
      convertSaveItems = JSON.parse(getSaveItems)
    }
    if (convertSaveItems !== undefined) {
      const getSaveItemsFromMap = convertSaveItems.map(eachFood => {
        if (eachFood.id === itemCart.id) {
          if (eachFood.quantity > 1) {
            return {...eachFood, quantity: eachFood.quantity - 1}
          }
          return null
        }
        return eachFood
      })
      const getValueFromFilters = getSaveItemsFromMap.filter(
        eachFilter => eachFilter !== null,
      )

      localStorage.setItem('cartData', JSON.stringify(getValueFromFilters))
      changeState()
    }
    this.showQuantity()
    getCostFun()
  }

  render() {
    const {itemCart} = this.props
    const {newArrayOne} = this.state
    return (
      <div data-testid="cartItem">
        <li className="cart-list">
          <div className="cart-merge">
            <img src={itemCart.imageUrl} alt="Items" className="cart-image" />
          </div>
          <div className="cart-star-container">
            <h1 className="cart-name-mobile">{itemCart.name}</h1>
            <div className="cart-star-con">
              <div>
                <button
                  type="button"
                  className="removeItems"
                  data-testid="decrement-quantity"
                  onClick={this.removeCartSaveItems}
                >
                  -
                </button>
              </div>
              <div>
                <p data-testid="item-quantity">{newArrayOne}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="removeItems"
                  data-testid="increment-quantity"
                  onClick={this.updateItemsCount}
                >
                  +
                </button>
              </div>
            </div>

            <div className="hide-button">
              <BiRupee className="color" />
              <p className="color">{itemCart.cost}</p>
            </div>
          </div>
          <MdRemoveShoppingCart
            className="remove-icon"
            onClick={this.removeItemsFromCart}
          />
        </li>
      </div>
    )
  }
}

export default CartItems
