import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import RegisterUser from '../components/users/RegisterUser';
import LoginUser from '../components/users/LoginUser';
import LogoutUser from '../components/users/LogoutUser';

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    if (this.props.isAuthenticated == null) {
      var show = <ClipLoader size={25} color={'#0DB855'} loading={true} />;
    } else if (this.props.isAuthenticated) {
      show = (
        <NavItem>
          <LogoutUser></LogoutUser>
        </NavItem>
      );
    } else {
      show = (
        <React.Fragment>
          <NavItem>
            <RegisterUser></RegisterUser>
          </NavItem>
          <NavItem>
            <LoginUser></LoginUser>
          </NavItem>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <Link to="/">
              <NavbarBrand>DevCamper</NavbarBrand>
            </Link>
            <NavLink style={{ color: 'gray' }}>
              {this.props.user ? `Welcome ${this.props.user.name}` : null}
            </NavLink>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link style={{ textDecoration: 'none' }} to="/bootcamps">
                    <NavLink>Bootcamps</NavLink>
                  </Link>
                </NavItem>
                {show}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(matchStateToProps, {})(AppNavbar);
