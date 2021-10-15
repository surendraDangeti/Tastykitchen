import CartContext from '../../Context'
import CartListView from '../CartListView'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'
import Header from '../Header'
import './index.css'
import Footer from '../Footer'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="myCart-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAllBtn}
                  >
                    Remove All
                  </button>
                </div>
                <div className="main-cart-container">
                  <div className="order-details-container">
                    <p className="food-item">Item</p>
                    <div className="item-priceandQuantity">
                      <p className="food-Quantity">Quantity</p>
                      <p className="food-price">Price</p>
                    </div>
                  </div>
                  <CartListView />
                </div>
                <CartSummary />
              </div>
            )}
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
