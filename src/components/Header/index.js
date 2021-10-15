import {withRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie'
import {Navbar, Container, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      className="backgroundNavbar"
      variant="light"
    >
      <Container className="backgroundContainer">
        <Navbar.Brand>
          <div className="logoContainer">
            <img
              className="navLogo"
              src="https://res.cloudinary.com/dbmvwqck0/image/upload/v1634032692/Frame_274_vzeums.png"
              alt="logo"
            />
            <Nav.Link
              className="webSiteHeading"
              variant="light"
              href="#features"
            >
              Tasty Kitchens
            </Nav.Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Cart">
              <Nav.Link href="/cart">Cart</Nav.Link>
            </LinkContainer>
            <Nav.Link eventKey={2}>
              <button
                className="LogoutBtn"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(Header)
