import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

import { logout } from '../../actions/authAction';

class LogoutUser extends Component {
  render() {
    return (
      <div>
        <NavLink onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(matchStateToProps, { logout })(LogoutUser);
