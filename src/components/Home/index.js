import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import AllProductsSection from '../AllProducts'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
  }

  componentDidMount() {
    this.getimagesData()
  }

  getimagesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const res = await response.json()
    console.log(res.image_url)
  }

  play() {
    this.slider.slickPlay()
  }

  pause() {
    this.slider.slickPause()
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
    }
    // eslint-disable-next-line
    const sliders = slider => {
      this.slider = slider
    }

    return (
      <>
        <div>
          <Header />
          <div className="container">
            <Slider ref={this.sliders} {...settings}>
              <div>
                <img
                  className="offersImage"
                  src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1634106416/Frame_7_1_ho74pw.png"
                  alt="offers-image1"
                />
              </div>
              <div>
                <img
                  className="offersImage"
                  src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-rajasthani-special.jpg"
                  alt="offers-image2"
                />
              </div>
              <div>
                <img
                  className="offersImage"
                  src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-uttar-pradesh-special.jpg"
                  alt="offers-image3"
                />
              </div>
              <div>
                <img
                  className="offersImage"
                  src="https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-north-indian-special.jpg"
                  alt="offers-image4"
                />
              </div>
            </Slider>
          </div>
          <AllProductsSection />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
