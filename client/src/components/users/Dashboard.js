import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import {
  Button,
  CardDeck,
  Card,
  Col,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from 'reactstrap';

import { getBootcampsOfUser } from '../../actions/bootcampAction';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getBootcampsOfUser();
  }

  render() {
    return (
      <div>
        <ClipLoader size={150} color={'#123abc'} loading={this.props.loading} />
        <h2>Dashboard</h2>

        {this.props.user && this.props.user.role === 'publisher' ? (
          <div>
            <h4>Your Bootcamps</h4>
            <CardDeck>
              {this.props.bootcamps.map((bootcamp) => (
                <Col key={bootcamp._id} sm="12" lg="6" className="mb-4">
                  <Card>
                    <CardImg
                      bottom
                      className="bootcampImage"
                      src={`/uploads/${bootcamp.photo}`}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{bootcamp.name}</CardTitle>
                      <CardText>{bootcamp.description}</CardText>
                      <Link to={'/bootcamps/' + bootcamp._id}>
                        <Button>Know More</Button>
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </CardDeck>
            <Link to="/create/bootcamp">
              <Button color="secondary" className="mb-4">
                Create Bootcamp
              </Button>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.bootcamps.loading,
  bootcamps: state.bootcamps.bootcamps,
});

export default connect(matchStateToProps, { getBootcampsOfUser })(Dashboard);
