import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'
import SVG from 'react-inlinesvg'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {jump} from "../utils/jump";
import {GlobalContext} from "./GlobalStore";
import {useWindowScroll} from "react-use";

function Header({router, title, navItems, logo}) {
  const {state} = useContext(GlobalContext);
  const {y} = useWindowScroll();

  const renderLogo = (logo) => {
    if (!logo || !logo.asset) {
      return null
    }

    if (logo.asset.extension === 'svg') {
      return <SVG src={logo.asset.url} />
    }

    return <img src={logo.asset.url} alt={logo.title} />
  }

  return (
    <Navbar expand={y > 100 ? "sm" : "lg"} bg={y > 100 && "dark"}>
      <Container>
        <Navbar.Brand href="#home">{renderLogo(logo)}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link active={state.id === "home" && state.inView} href="#" onClick={() => jump("__next")}>Home</Nav.Link>
            <Nav.Link href="#" active={state.id === "specialisations" && state.inView} onClick={() => jump("specialisations")}>Specialisations</Nav.Link>
            <Nav.Link href="#" active={state.id === "services" && state.inView} onClick={() => jump("services")}>Services</Nav.Link>
            <Nav.Link href="#" active={state.id === "woweare" && state.inView} onClick={() => jump("woweare")}>Who We Are?</Nav.Link>
            <Button variant="primary" active={state.id === "contactus" && state.inView} onClick={() => jump("contactus")}>Contact Us</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Header.propTypes = {
  router: PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.shape({
      slug: PropTypes.string,
    }),
    events: PropTypes.any,
  }),
  title: PropTypes.string,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  logo: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
      extension: PropTypes.string,
    }),
    logo: PropTypes.string,
    title: PropTypes.string,
  }),
}

export default withRouter(Header)
