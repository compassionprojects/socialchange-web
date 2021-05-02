import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/client';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Link from 'components/Link';
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      color="light"
      light
      expand="md"
      className="py-4 bg-white border-bottom">
      <div className="container">
        <NavbarBrand href="/" tag={Link}>
          NVC Social Change <code className="text-muted">&#123;data&#125;</code>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="ml-md-3">
              <NavLink tag={Link} href="/projects">
                Projects
              </NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <NavLink tag={Link} href="/#about">
                About
              </NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <NavLink tag={Link} href="mailto:madhu@nomaddev.co">
                Contact
              </NavLink>
            </NavItem>
            <NavItem className="ml-md-3">
              <a
                className="nav-link"
                href="https://opencollective.com/nvc-social-change"
                target="_blank"
                rel="noopener noreferrer">
                Donate <FiArrowUpRight />
              </a>
            </NavItem>
            {!loading && session && (
              <UncontrolledDropdown nav inNavbar className="ml-md-3">
                <DropdownToggle nav>
                  Account <FiChevronDown />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>{session.user.email}</DropdownItem>
                  <DropdownItem onClick={signOut}>Sign out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
