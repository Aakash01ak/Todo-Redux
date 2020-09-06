import React, { Component } from 'react';
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


class AppNavbar extends Component {

  constructor(props){
    super(props);
    this.state= {
      isOpen: false
    }
  }

   toggle = () => {
     this.setState({isOpen : !this.state.isOpen})
   }

render(){
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
        <NavbarBrand href="/">Todo App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Aakash01ak/MERN-To-Do-App"><h6>GitHub</h6></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
}

export default AppNavbar;