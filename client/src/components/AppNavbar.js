import React, { Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';

class AppNavbar extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      isOpen: false
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

   toggle = () => {
     this.setState({isOpen : !this.state.isOpen})
   }

render(){

  const { isAuthenticated, user } = this.props.auth;

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
        <NavbarBrand href="/">Todo App With Redux</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="mt-1">
              <NavLink href="https://github.com/Aakash01ak/Todo-Redux"><h6>GitHub</h6></NavLink>
            </NavItem>
             {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);