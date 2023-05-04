import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import SpecificRestaurantPage from './components/SpecificRestaurantPage'
import CartTub from './components/CartTub'

import OpenRestaurantsPage from './components/OpenRestaurantsPage'
import NotFoundPage from './components/NotFoundPage'
import ProtectRoute from './components/ProtectRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectRoute exact path="/" component={HomePage} />
      <ProtectRoute
        exact
        path="/restaurant/:id"
        component={SpecificRestaurantPage}
      />
      <ProtectRoute exact path="/cart" component={CartTub} />
      <ProtectRoute
        exact
        path="/open-restaurant"
        component={OpenRestaurantsPage}
      />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
