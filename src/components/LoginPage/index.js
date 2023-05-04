import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorText: '',
    errorMessage: false,
    loginLoader: false,
  }

  setError = errorText => {
    this.setState({errorText, errorMessage: true, loginLoader: false})
  }

  setToken = JwtToken => {
    this.setState({loginLoader: false})

    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    history.replace('/')
  }

  getLoginUser = async event => {
    event.preventDefault()
    this.setState({loginLoader: true})
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setToken(data.jwt_token)
    } else {
      const data = await response.json()
      this.setError(data.error_msg)
    }
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const JwtToken = Cookies.get('jwt_token')
    if (JwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {errorText, errorMessage, loginLoader} = this.state
    return (
      <div className="login-container">
        <div className="login-details-container">
          <div className="user-details-container">
            <div className="tasty-logo-container">
              <img
                src="https://res.cloudinary.com/image-link-getter/image/upload/v1633350279/Vectorlogo_cxrhby.jpg"
                alt="website logo"
                className="tasty-logo"
              />
              <h1 className="tasty-name">Tasty Kitchens</h1>
            </div>
            <h1 className="login">Login</h1>
            {loginLoader && (
              <div className="login-spinner">
                <Loader
                  type="TailSpin"
                  height="30px"
                  width="30px"
                  color="#F7931E"
                />
              </div>
            )}
            <form className="form-container" onSubmit={this.getLoginUser}>
              <div className="add-login">
                <label htmlFor="username" className="username">
                  USERNAME
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  className="username-bar"
                  placeholder="Username"
                  onChange={this.updateUsername}
                />
              </div>
              <div className="add-login">
                <label htmlFor="password" className="username">
                  PASSWORD
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  className="username-bar"
                  onChange={this.updatePassword}
                  placeholder="Password"
                />
              </div>
              {errorMessage && <p className="errorMessage">{errorText}</p>}
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/image-link-getter/image/upload/v1633358584/Rectangle_1456_ndmsuf.jpg"
            alt="website login"
            className="login-website-image"
          />
        </div>
      </div>
    )
  }
}

export default LoginPage
