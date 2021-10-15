import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1633944278/cooking_1_yqst6n.png"
      className="cart-empty-image"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">No Orders Yet</h1>
    <p className="cart-empty-text">
      {' '}
      Your cart is empty. Add something from the menu
    </p>
    <Link to="/">
      <button type="button" className="shop-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
