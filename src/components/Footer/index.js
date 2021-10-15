import './index.css'

const Footer = () => (
  <div className="footer">
    <center>
      <div className="Footer-SubContainer">
        <img
          className="logo-kitchen"
          src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1632589271/Frame_275_min2f9.png"
          alt="logo"
        />
        <h1 className="footerHeading">Tasty Kitchens</h1>
      </div>
      <p className="footer-subHeading">
        The only thing we are serious about is food
      </p>
      <p className="footer-subHeading">Contact us on</p>
      <div>
        <img
          className="logo"
          src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1632589256/Frame_12_g71fv0.png"
          alt="printrest-log"
        />
        <img
          className="logo"
          src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1632589231/Frame_10_poymvt.png"
          alt="insta-log"
        />
        <img
          className="logo"
          src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1632589292/Frame_11_us2pgc.png"
          alt="twitter-log"
        />
        <img
          className="logo"
          src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1632589283/Frame_13_qijqfy.png"
          alt="fb-log"
        />
      </div>
    </center>
  </div>
)

export default Footer
