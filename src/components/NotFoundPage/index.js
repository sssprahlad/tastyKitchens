import {Link} from 'react-router-dom'

import HeaderPage from '../HeaderPage'
import './index.css'
// import HeaderPage from '../HeaderPage'

const NotFoundPage = () => (
  <>
    <HeaderPage />
    <div className="home-new">
      <img
        src="https://res.cloudinary.com/image-link-getter/image/upload/v1633514187/Layer_1_errxca.jpg"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-name">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="retry-button-one">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFoundPage
