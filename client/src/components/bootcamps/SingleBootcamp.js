import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { Container, Row, Col } from 'reactstrap';

import { getBootcamp } from '../../actions/bootcampAction';

class SingleBootcamp extends Component {
  componentDidMount() {
    this.props.getBootcamp(this.props.match.params.id);
  }

  render() {
    const bootcamp = this.props.bootcamp;
    var show = (
      <div>
        <Row>
          <Col sm="4" style={{ borderRight: '1px solid grey' }}>
            <img
              src={`/uploads/${bootcamp.photo}`}
              className="boo"
              alt="No display for this bootcamp"
            />
            <h3 className="mt-4">{bootcamp.name}</h3>
            <h4 className="mt-4">Details:</h4>
            <h5 className="mt-2">{bootcamp.website}</h5>
            <h5 className="mt-2">{bootcamp.email}</h5>
            <h5 className="mt-2">{bootcamp.phone}</h5>
            <h5 className="mt-4">{bootcamp.averageCost}</h5>
          </Col>
          <Col sm="8">
            <p mt-2>{bootcamp.description}</p>
            <hr />
            <p>
              Careers:{' '}
              {bootcamp.careers
                ? bootcamp.careers.map((career) => `${career}, `)
                : null}
            </p>
            <hr />
            <p mt-2>
              City: {bootcamp.location ? bootcamp.location.city : null}
            </p>
            <hr />
            <Row>
              <Col>
                Job assistance: {bootcamp.jobAssistance ? 'Given' : 'Not Given'}
              </Col>
              <Col>
                Job guarantee: {bootcamp.jobGuarantee ? 'Given' : 'Not Given'}
              </Col>
            </Row>
            <hr />
            Courses Reviews
          </Col>
        </Row>
      </div>
    );

    return (
      <div>
        <Container>
          <ClipLoader
            size={150}
            color={'#123abc'}
            loading={this.props.isLoading}
          />
          {show}
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  bootcamp: state.bootcamps.bootcamp,
  isLoading: state.bootcamps.loading,
});

export default connect(matchStateToProps, { getBootcamp })(SingleBootcamp);