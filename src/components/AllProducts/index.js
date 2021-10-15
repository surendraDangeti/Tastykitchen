import {Component} from 'react'
import {BiChevronRight, BiChevronLeft} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'

import FoodItemHeader from '../ProductHeader'

import './index.css'

const sortbyOptions = [
  {
    optionId: 'Lowest',
    displayText: 'Lowest',
  },
  {
    optionId: 'Highest',
    displayText: 'Highest',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    offsetNum: 1,
    activeOptionId: sortbyOptions[0].optionId,
  }

  componentDidMount() {
    this.getProducts()
  }

  onIncrementOffset = () => {
    const {offsetNum} = this.state
    if (offsetNum <= 20)
      this.setState(prevState => ({offsetNum: prevState.offsetNum + 1}))
    console.log(offsetNum)
    this.getProducts()
  }

  onDecrementOffset = () => {
    const {offsetNum} = this.state
    if (offsetNum > 1)
      this.setState(prevState => ({offsetNum: prevState.offsetNum - 1}))
    this.getProducts()
  }

  getProducts = async () => {
    const {activeOptionId, offsetNum} = this.state
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offsetNum}&limit=9&sort_by_rating=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(product => ({
        costForTwo: product.cost_for_two,
        cuisine: product.cuisine,
        groupByTime: product.group_by_time,
        hasOnlineDelivery: product.has_online_delivery,
        hasTableBooking: product.has_table_booking,
        id: product.id,
        imageUrl: product.image_url,
        isDeliveringNow: product.is_delivering_now,
        location: product.location,
        menuType: product.menu_type,
        name: product.name,
        opensAt: product.opens_at,
        ratingText: product.user_rating.rating_text,
        ratingColor: product.user_rating.rating_color,
        rating: product.user_rating.rating,
        ratingReview: product.user_rating.rating_review,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  updateActiveOptionId = activeOptionId => {
    this.setState(
      {
        activeOptionId,
      },
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, offsetNum} = this.state
    return (
      <>
        <div className="productContainer">
          <div className="sub">
            <ul className="products-list">
              {productsList.map(product => (
                <ProductCard productData={product} key={product.id} />
              ))}
            </ul>
          </div>
        </div>
        <div className="nextAndpreviewBtn-container">
          <button
            className="nextBtn"
            type="button"
            onClick={this.onDecrementOffset}
          >
            <BiChevronLeft />
          </button>
          <p className="current-page">{offsetNum} of 20</p>
          <button
            className="previewBtn"
            type="button"
            onClick={this.onIncrementOffset}
          >
            <BiChevronRight />
          </button>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="Oval" color="orange" height="50" width="500" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {activeOptionId} = this.state
    return (
      <div>
        <FoodItemHeader
          sortbyOptions={sortbyOptions}
          activeOptionId={activeOptionId}
          changeSortby={this.changeSortby}
        />
        {isLoading ? this.renderLoader() : this.renderProductsList()}
      </div>
    )
  }
}

export default AllProductsSection
