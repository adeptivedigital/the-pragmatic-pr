import React, {useContext, useState} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'next/router'
import styled from "styled-components";
import SVG from 'react-inlinesvg'
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useWindowScroll} from "react-use";
import {jump} from "../utils/jump";
import {GlobalContext} from "./GlobalStore";

const BurgerButtonWrapper = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
`

const BurgerButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 35px;
  height: 35px;
`

const BurgerButtonIcon = styled.div`
  cursor: pointer;
  border-radius: 1px;
  height: 2px;
  width: 35px;
  background: white;
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  content: '';

  &:before, &:after {
    cursor: pointer;
    border-radius: 1px;
    height: 2px;
    width: 35px;
    background: white;
    position: absolute;
    left: 0;
    top: 50%;
    display: block;
    content: '';
    transition: all 0.5s ease-in-out;
  }

  &:before {
    top: -10px;
  }

  &:after {
    top: 10px;
  }

  ${({open}) => open && `
    background: transparent;
    &::before,
    &::after {
      top: 0;
    }
    &::after {
      transform: rotate(-135deg);
    }
    &::before {
      transform: rotate(135deg);
    }
  `}
`

function Header({router, title, navItems, logo}) {
  const [open, setOpen] = useState(false);
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
      <Navbar className="p-0 m-0" expand="lg" expanded={open} bg={y > 100 && "dark"}>
        <Container>
          <Navbar.Brand href="#" onClick={(e) => {
            e.preventDefault();
            jump("__next");
          }}
          >{renderLogo(logo)}</Navbar.Brand>
          <BurgerButtonWrapper className="d-lg-none d-block">
            <BurgerButton variant="link" className="position-absolute" onClick={() => setOpen(!open)}>
              <BurgerButtonIcon open={open} />
            </BurgerButton>
          </BurgerButtonWrapper>
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
