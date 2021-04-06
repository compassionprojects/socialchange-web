import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="py-4 bg-white border-bottom">
      <div className="container">
        <NavbarBrand href="/">
          NVC Social Change <code className="text-muted">&#123;data&#125;</code>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="ml-md-3">
              <NavLink href="/projects">Projects</NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <NavLink href="/#about">About</NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <NavLink href="mailto:madhu@nomaddev.co">Contact</NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <a
                className="nav-link"
                href="https://opencollective.com/nvc-social-change"
                target="_blank"
                rel="noopener noreferrer">
                Donate
              </a>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
