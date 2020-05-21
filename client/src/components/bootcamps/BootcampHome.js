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
  Modal,
  ModalHeader,
  Form,
  FormGroup,
} from 'reactstrap';

import {
  getBootcamps,
  getBootcamp,
  getBootcampsByRadius,
} from '../../actions/bootcampAction';

class BootcampHome extends Component {
  state = {
    sort: '',
    limit: 2,
    page: 1,
    modal: false,
    zipcode: '',
    distance: '',
  };

  call = (e) => {
    const filters = {
      sort: this.state.sort,
      limit: this.state.limit,
      page: this.state.page,
    };

    const { zipcode, distance } = this.state;

    if (zipcode && distance) {
      e.preventDefault();
      this.props.getBootcampsByRadius(zipcode, distance);
      this.toggle();
    } else {
      this.props.getBootcamps(filters);
    }
  };

  componentDidMount() {
    this.call();
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal, zipcode: '', distance: '' });
  };

  onZipRadChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
          <Button color="primary" onClick={this.toggle} className="mb-3">
            Get Bootcamps by Distance
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Get Bootcamps by Distance
            </ModalHeader>
            <Container className="mb-2 mt-2">
              <Form onSubmit={this.call}>
                <FormGroup>
                  <Label>Zipcode</Label>
                  <Input
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    placeholder="00000"
                    onChange={this.onZipRadChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Distance in kilometers</Label>
                  <Input
                    type="number"
                    name="distance"
                    id="distance"
                    placeholder="00"
                    onChange={this.onZipRadChange}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary">
                  Get Bootcamps
                </Button>
              </Form>
            </Container>
          </Modal>
          {this.props.toggleFilters ? (
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
          ) : null}
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
          {this.props.toggleFilters ? (
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
          ) : null}
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  toggleFilters: state.bootcamps.toggleFilters,
  bootcamps: state.bootcamps.bootcamps,
  pagination: state.bootcamps.pagination,
  isLoading: state.bootcamps.loading,
});

export default connect(matchStateToProps, {
  getBootcamps,
  getBootcamp,
  getBootcampsByRadius,
})(BootcampHome);
