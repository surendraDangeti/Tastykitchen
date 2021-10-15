import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1633945254/erroring_1_fuazac.png"
        alt="not-found"
        className="not-found-img"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-description">
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="Home-page-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
