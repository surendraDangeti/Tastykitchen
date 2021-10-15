import {BiRupee} from 'react-icons/bi'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SimilarFoodItem from '../SimilarFoodItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarFoodData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    cost: data.cost_for_two,
    cuisine: data.cuisine,
  })

  getSimilarFormattedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    name: data.name,
    rating: data.rating,
    cost: data.cost,
    foodType: data.food_type,
    btnStatus: false,
    tempQuantity: 0,
  })

  changeBtnStatus = currentId => {
    this.setState(prevState => ({
      similarFoodData: prevState.similarFoodData.map(eachitem => {
        if (currentId === eachitem.id) {
          const updatedQuantity = true
          return {...eachitem, btnStatus: updatedQuantity}
        }
        return eachitem
      }),
    }))
  }

  onIncrementTempQuantity = currentId => {
    this.setState(prevState => ({
      similarFoodData: prevState.similarFoodData.map(eachitem => {
        if (currentId === eachitem.id) {
          const updatedQuantity = eachitem.tempQuantity + 1
          return {...eachitem, tempQuantity: updatedQuantity}
        }
        return eachitem
      }),
    }))
  }

  onDecrementTempQuantity = currentId => {
    this.setState(prevState => ({
      similarFoodData: prevState.similarFoodData.map(eachitem => {
        if (currentId === eachitem.id) {
          const updatedQuantity = eachitem.tempQuantity - 1
          return {...eachitem, tempQuantity: updatedQuantity}
        }
        return eachitem
      }),
    }))
  }

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restrauntId = id
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.food_items.map(
        eachSimilarProduct => this.getSimilarFormattedData(eachSimilarProduct),
      )
      this.setState({
        productData: updatedData,
        similarFoodData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => {
    const {productData, similarFoodData, quantity} = this.state
    const {imageUrl, name, location, cuisine, rating, cost} = productData

    return (
      <>
        <div className="restaurant-container">
          <div className="restaurant">
            <img className="restaurant-image" src={imageUrl} alt="restaurant" />
            <div className="restaurant-details">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="location">{location}</p>
              <div className="Rating-and-pricing-section">
                <div className="rating-container">
                  <p className="restaurant-rating">
                    <img
                      className="start"
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="restaurant-rating"
                    />
                    {rating}
                  </p>
                  <span className="numOf-rating">200+ ratings</span>
                </div>
                <span className="vertical-line dot-color">.</span>
                <div className="price-container">
                  <p className="restaurant-price">
                    <BiRupee />
                    {cost}
                  </p>
                  <span className="costForTwo">cost for two</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Food-item-list-container">
          <ul className="Food-item-list">
            {similarFoodData.map(eachFooditem => (
              <SimilarFoodItem
                similarFoodData={eachFooditem}
                changeBtnStatus={this.changeBtnStatus}
                quantity={quantity}
                key={eachFooditem.id}
                onIncrementQuantity={this.onIncrementQuantity}
                onDecrementQuantity={this.onDecrementQuantity}
                onIncrementTempQuantity={this.onIncrementTempQuantity}
                onDecrementTempQuantity={this.onDecrementTempQuantity}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="Oval" color="orange" height="500" width="50" />
    </div>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderProductDetails()}
        <Footer />
      </>
    )
  }
}

export default ProductItemDetails
