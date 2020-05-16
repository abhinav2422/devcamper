import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Jumbotron, Button } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Jumbotron>
            <h1 className="display-3">Welcome</h1>
            <p className="lead">
              Devcamper is a place where you can look for bootcamps.
            </p>
            <hr className="my-2" />
            <p>
              Devcamper helps you look for bootcamps and their details.
              Bootcamps can be found within a certain distance as well.
            </p>
            <p className="lead">
              <Link to="/bootcamps">
                <Button color="primary">Bootcamps</Button>
              </Link>
            </p>
            {this.props.user && this.props.user.role === 'publisher' ? (
              <p className="lead">
                <Link to="/dashboard">
                  <Button color="primary">Manage bootcamps</Button>
                </Link>
              </p>
            ) : null}
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(matchStateToProps, {})(Home);
