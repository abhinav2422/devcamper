import React, { Component } from 'react';
import { connect } from 'react-redux';
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

import { getBootcamps } from '../../actions/bootcampAction';

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
                  <Button>Know More</Button>
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

export default connect(matchStateToProps, { getBootcamps })(BootcampHome);
