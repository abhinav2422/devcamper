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
  Row,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  Label,
  Input,
  Container,
  Alert,
} from 'reactstrap';

import { getBootcampsOfUser } from '../../actions/bootcampAction';
import {
  changeName,
  changeEmail,
  changePassword,
} from '../../actions/authAction';

class Dashboard extends Component {
  state = {
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    nameModal: false,
    emailModal: false,
    passwordModal: false,
    message: null,
    successMessage: null,
  };

  componentDidMount() {
    this.props.getBootcampsOfUser();
  }

  toggleNameModal = () => {
    this.setState({
      nameModal: !this.state.nameModal,
      name: '',
    });
  };

  toggleEmailModal = () => {
    this.setState({
      emailModal: !this.state.emailModal,
      email: '',
    });
  };

  togglePasswordModal = () => {
    this.setState({
      passwordModal: !this.state.passwordModal,
      currentPassword: '',
      newPassword: '',
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeNameEmail = (e) => {
    e.preventDefault();

    if (this.state.name) {
      this.props.changeName({ name: this.state.name });
      this.toggleNameModal();
    }

    if (this.state.email) {
      this.props.changeEmail({ email: this.state.email });
      this.toggleEmailModal();
    }
  };

  changePassword = (e) => {
    e.preventDefault();

    const body = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
    };

    this.props.changePassword(body);
  };

  componentDidUpdate(prevProps) {
    const { error, success } = this.props;
    if (prevProps.error !== error) {
      if (error.id === 'UPDATE_PASSWORD_FAIL') {
        this.setState({
          message: error.message.error,
        });
      } else {
        this.setState({
          message: null,
        });
      }
    }

    if (prevProps.success !== success && success) {
      this.setState({
        message: null,
        successMessage: 'Update Password Successfully',
      });
    }
  }

  render() {
    return (
      <div>
        <ClipLoader size={150} color={'#123abc'} loading={this.props.loading} />
        <h2>Dashboard</h2>

        <Row className="fixMargin mt-4">
          <Col>
            <h5>Name:</h5>
          </Col>
          <Col>{this.props.user && this.props.user.name}</Col>
        </Row>
        <Row className="fixMargin mt-4">
          <Col>
            <h5>Email:</h5>
          </Col>
          <Col>{this.props.user && this.props.user.email}</Col>
        </Row>
        <Row className="fixMargin mt-4">
          <Col>
            <h5>Role:</h5>
          </Col>
          <Col>{this.props.user && this.props.user.role}</Col>
        </Row>
        <Row className="fixMargin mt-4">
          <Col>
            <Button color="primary" onClick={this.toggleNameModal}>
              Edit Name
            </Button>
          </Col>
          <Col>
            <Button color="primary" onClick={this.toggleEmailModal}>
              Edit Email
            </Button>
          </Col>
          <Col>
            <Button color="primary" onClick={this.togglePasswordModal}>
              Change Password
            </Button>
          </Col>
        </Row>

        <Modal isOpen={this.state.nameModal} toggle={this.toggleNameModal}>
          <ModalHeader toggle={this.toggleNameModal}>Edit Name</ModalHeader>
          <Container className="mt-2 mb-2">
            <Form onSubmit={this.changeNameEmail}>
              <FormGroup>
                <Label>Enter new name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={this.props.user && this.props.user.name}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal>

        <Modal isOpen={this.state.emailModal} toggle={this.toggleEmailModal}>
          <ModalHeader toggle={this.toggleEmailModal}>Edit Email</ModalHeader>
          <Container className="mt-2 mb-2">
            <Form onSubmit={this.changeNameEmail}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={this.props.user && this.props.user.email}
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal>

        <Modal
          isOpen={this.state.passwordModal}
          toggle={this.togglePasswordModal}
        >
          <ModalHeader toggle={this.togglePasswordModal}>
            Change Password
          </ModalHeader>
          <Container className="mt-2 mb-2">
            {this.state.message ? (
              <Alert className="mt-2" color="danger">
                {this.state.message}
              </Alert>
            ) : null}
            {this.state.successMessage ? (
              <Alert className="mt-2" color="success">
                {this.state.successMessage}
              </Alert>
            ) : null}
            <Form onSubmit={this.changePassword}>
              <FormGroup>
                <Label>Enter current password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="******"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Enter new password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="******"
                  onChange={this.onChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal>

        {this.props.user && this.props.user.role === 'publisher' ? (
          <div className="mt-4">
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
  error: state.error,
  success: state.auth.success,
});

export default connect(matchStateToProps, {
  getBootcampsOfUser,
  changeName,
  changeEmail,
  changePassword,
})(Dashboard);
