import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';

import { registerUser } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class RegisterUser extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    role: 'user',
    message: null,
  };

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };

    this.props.registerUser(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (prevProps.error !== error)
      if (error.id === 'REGISTRATION_FAIL') {
        this.setState({
          message: error.message.error,
        });
      } else {
        this.setState({
          message: null,
        });
      }

    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <Container>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="mt-2">
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Email"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  onChange={this.onChange}
                >
                  <option value="user">User</option>
                  <option value="publisher">Publisher</option>
                </Input>
              </FormGroup>
              <Button color="dark" type="submit" className="mb-2">
                Register
              </Button>
            </Form>
          </Container>
        </Modal>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(matchStateToProps, { registerUser, clearErrors })(
  RegisterUser
);
