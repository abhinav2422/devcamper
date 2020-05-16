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

import { login } from '../../actions/authAction';
import { clearErrors } from '../../actions/errorAction';

class LoginUser extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
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
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (prevProps.error !== error)
      if (error.id === 'LOGIN_FAIL') {
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
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <Container>
            {this.state.message ? (
              <Alert className="mt-2" color="danger">
                {this.state.message}
              </Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="mt-2">
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
              <Button color="dark" type="submit" className="mb-2">
                Login
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

export default connect(matchStateToProps, { login, clearErrors })(LoginUser);
