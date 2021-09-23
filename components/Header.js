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
  const loggedIn = session && !loading;

  return (
    <Navbar
      color="light"
      light
      expand="lg"
      className="py-4 bg-white border-bottom">
      <div className="container">
        <NavbarBrand href="/" tag={Link}>
          NVC Social Change{' '}
          <code className="text-muted d-none d-sm-inline-block">
            &#123;stories&#125;
          </code>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {loggedIn && (
              <NavItem className="ml-lg-3">
                <NavLink tag={Link} href="/projects/add">
                  Add project
                </NavLink>
              </NavItem>
            )}
            <NavItem className="ml-lg-3">
              <NavLink tag={Link} href="/projects">
                Projects
              </NavLink>
            </NavItem>
            <NavItem className="ml-lg-3">
              <NavLink tag={Link} href="mailto:nvc@socialchange.io">
                Contact
              </NavLink>
            </NavItem>
            {!loggedIn && (
              <NavItem className="ml-lg-3">
                <NavLink tag={Link} href="/#about">
                  About
                </NavLink>
              </NavItem>
            )}
            <NavItem className="ml-lg-3">
              <a
                className="nav-link"
                href="https://opencollective.com/compassion-projects"
                target="_blank"
                rel="noopener noreferrer">
                Donate <FiArrowUpRight />
              </a>
            </NavItem>
            {!loading && session && (
              <UncontrolledDropdown nav inNavbar className="ml-lg-3">
                <DropdownToggle nav>
                  Account <FiChevronDown />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>{session.user.email}</DropdownItem>
                  <Link className="dropdown-item" href="/account/projects">
                    My Projects
                  </Link>
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
