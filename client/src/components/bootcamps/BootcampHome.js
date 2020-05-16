import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import {
  Col,
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';

import { getBootcamps, getBootcamp } from '../../actions/bootcampAction';

class BootcampHome extends Component {
  componentDidMount() {
    this.props.getBootcamps();
  }

  render() {
    return (
      <div>
        <ClipLoader
          size={150}
          color={'#123abc'}
          loading={this.props.isLoading}
        />
        <CardDeck>
          {this.props.bootcamps.map((bootcamp) => (
            <Col key={bootcamp._id} sm="12" lg="6">
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
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  bootcamps: state.bootcamps.bootcamps,
  isLoading: state.bootcamps.loading,
});

export default connect(matchStateToProps, { getBootcamps, getBootcamp })(
  BootcampHome
);
