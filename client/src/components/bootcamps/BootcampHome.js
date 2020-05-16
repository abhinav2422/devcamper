import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';

import { getBootcamps, getBootcamp } from '../../actions/bootcampAction';

class BootcampHome extends Component {
  state = {
    sort: '',
    limit: 2,
    page: 1,
  };

  call = () => {
    const filters = {
      sort: this.state.sort,
      limit: this.state.limit,
      page: this.state.page,
    };

    this.props.getBootcamps(filters);
  };

  componentDidMount() {
    this.call();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    setTimeout(() => {
      this.call();
    }, 1000);
  };

  render() {
    return (
      <div>
        <ClipLoader
          size={150}
          color={'#123abc'}
          loading={this.props.isLoading}
        />

        <Container>
          <Row className="mb-4">
            <Col>
              <Label>Sort by</Label>
              <Input
                type="select"
                name="sort"
                id="sort"
                onChange={this.onChange}
              >
                <option value="">Created</option>
                <option value="name">Name</option>
              </Input>
            </Col>
            <Col>
              <Label>Results per page</Label>
              <Input
                type="select"
                name="limit"
                id="limit"
                onChange={this.onChange}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="6">6</option>
              </Input>
            </Col>
          </Row>
        </Container>

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

        <Container className="mb-4">
          <Pagination size="lg" aria-label="Page navigation example">
            {this.props.pagination.prev ? (
              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={() => {
                    this.setState({
                      page: --this.state.page,
                    });

                    this.call();
                  }}
                />
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink>.</PaginationLink>
            </PaginationItem>
            {this.props.pagination.next ? (
              <PaginationItem>
                <PaginationLink
                  next
                  onClick={() => {
                    this.setState({
                      page: ++this.state.page,
                    });

                    this.call();
                  }}
                />
              </PaginationItem>
            ) : null}
          </Pagination>
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  bootcamps: state.bootcamps.bootcamps,
  pagination: state.bootcamps.pagination,
  isLoading: state.bootcamps.loading,
});

export default connect(matchStateToProps, { getBootcamps, getBootcamp })(
  BootcampHome
);
