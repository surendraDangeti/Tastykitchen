import swal from 'sweetalert'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../Context'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })
      const onSwal = () => {
        swal({
          title: 'Payment Successful',
          text: 'Thank you for ordering',
          align: 'center',
          icon: 'success',
          buttons: {
            confirm: {
              text: 'OK',
              value: true,
              visible: true,
              className: 'SwalBtn',
              closeModal: true,
            },
          },
        })
        removeAllCartItems()
      }

      return (
        <>
          <div className="cart-summary-container">
            <div className="cart-sub-container">
              <h1 className="order-total-value">Order Total :</h1>
              <p className="order-total-value">
                <BiRupee className="Amount" /> {total}.00
              </p>
            </div>
            <p className="total-items">{cartList.length} Items in cart</p>
            <button type="button" onClick={onSwal} className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
