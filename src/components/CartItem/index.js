import {BiRupee} from 'react-icons/bi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../Context'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, name, quantity, cost, imageUrl} = cartItemDetails
      const onClickDecrement = () => {
        decrementCartItemQuantity(id)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(id)
      }
      const onRemoveCartItem = () => {
        removeCartItem(id)
      }
      const totalPrice = cost * quantity

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={name} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{name}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                testid="minus"
                onClick={onClickDecrement}
              >
                <BsDashSquare color="black" size={18} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                testid="plus"
                onClick={onClickIncrement}
              >
                <BsPlusSquare color="black" size={18} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">
                {' '}
                <BiRupee /> {totalPrice}.00
              </p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
            testid="remove"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
