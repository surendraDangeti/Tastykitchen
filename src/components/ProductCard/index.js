import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {imageUrl, name, menuType, rating, id} = productData

  return (
    <Link to={`/products/${id}`} className="list-items">
      <li className="list-items">
        <div className="food-item">
          <img src={imageUrl} alt="product" className="thumbnail" />
          <div className="product-details-container">
            <h1 className="title">{name}</h1>
            <p className="product-details">{menuType}</p>
            <p className="rating">
              <img
                className="star"
                src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1633755694/7_Rating_apvj2o.png"
                alt="star"
              />
              {rating}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default ProductCard
