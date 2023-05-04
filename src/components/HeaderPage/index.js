import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

class HeaderPage extends Component {
  state = {burgerState: false}

  getHam = () => {
    this.setState({burgerState: false})
  }

  removeToken = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getHamburger = () => {
    const {burgerState} = this.state
    this.setState({burgerState: !burgerState})
  }

  render() {
    const {burgerState} = this.state
    const {history} = this.props
    const {location} = history
    const {pathname} = location

    const homeColor = pathname === '/' ? 'one' : 'removeColor'
    const cartColor = pathname === '/cart' ? 'one' : 'removeColor'

    const burgerStateOne =
      burgerState === true ? 'header-ul-container-add' : null

    return (
      <>
        <nav className="navbar">
          <div className="image-nav-container">
            <div className="add-new-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/image-link-getter/image/upload/v1633350279/Vectorlogo_cxrhby.jpg"
                  alt="website logo"
                  className="tasty-logo"
                />
              </Link>

              <h1 className="home-tasty-name">Tasty Kitchens</h1>
            </div>
            <GiHamburgerMenu
              className="hamBurger"
              onClick={this.getHamburger}
            />
          </div>

          <ul className={`header-ul-container ${burgerStateOne}`}>
            <div className="header-new-list-container">
              <Link to="/" className="header-list">
                <li>
                  <h1 className={`header-home ${homeColor}`}>Home</h1>
                </li>
              </Link>
              <Link to="/cart" className="header-list">
                <li>
                  <h1 className={`header-home ${cartColor}`}>Cart</h1>
                </li>
              </Link>

              <button
                type="button"
                className="header-button"
                onClick={this.removeToken}
              >
                Logout
              </button>
            </div>
            <AiFillCloseCircle className="closer" onClick={this.getHam} />
          </ul>
        </nav>
      </>
    )
  }
}

export default withRouter(HeaderPage)
