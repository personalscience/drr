import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import logo from './drr_ai_logo.svg';

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
        <img
            alt="Health App"
            src={logo}
            width="60"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/input"><FormattedMessage id="input.title" /></Nav.Link>
            <Nav.Link as={Link} to="/results"><FormattedMessage id="results.title" /></Nav.Link>
            <Nav.Link as={Link} to="/diet"><FormattedMessage id="diet.title" /></Nav.Link>
            <Nav.Link as={Link} to="/settings"><FormattedMessage id="settings.title" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
