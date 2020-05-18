import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner,
} from 'reactstrap';

import { createBootcamp } from '../../actions/bootcampAction';

class CreateBootcamp extends Component {
  state = {
    name: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    careers: null,
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    message: null,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleMulti = (e) => {
    var careers = [];
    var options = e.target.options;
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        careers.push(options[i].value);
      }
    }
    this.setState({
      careers,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const bootcamp = {
      name: this.state.name,
      description: this.state.description,
      website: this.state.website,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      careers: this.state.careers,
      housing: this.state.housing,
      jobAssistance: this.state.jobAssistance,
      jobGuarantee: this.state.jobGuarantee,
    };

    this.props.createBootcamp(bootcamp);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error)
      if (error.id === 'BOOTCAMP_CREATE_ERROR') {
        this.setState({
          message: error.message.error,
        });
      } else {
        this.setState({
          message: null,
        });
      }

    if (this.state.name === this.props.bootcamp.name) {
      this.props.history.push(`/bootcamps/${this.props.bootcamp._id}`);
    }
  }

  render() {
    return (
      <div>
        <Container className="overWrite mb-4">
          <h2 style={{ textAlign: 'center' }}>Create a bootcamp</h2>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Name*</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Description*</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Description..."
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                id="website"
                placeholder="Website"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone no"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address*</Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Careers*</Label>
              <Input
                type="select"
                name="careers"
                id="careers"
                onChange={this.handleMulti}
                multiple
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Data Science">Data Science</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Housing</Label>
              <Input
                type="select"
                name="housing"
                id="housing"
                onChange={this.onChange}
              >
                <option value="true">True</option>
                <option value="false" selected>
                  False
                </option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Job Assistance</Label>
              <Input
                type="select"
                name="jobAssistance"
                id="jobAssistance"
                onChange={this.onChange}
              >
                <option value="true">True</option>
                <option value="false" selected>
                  False
                </option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Job Guarantee</Label>
              <Input
                type="select"
                name="jobGuarantee"
                id="jobGuarantee"
                onChange={this.onChange}
              >
                <option value="true">True</option>
                <option value="false" selected>
                  False
                </option>
              </Input>
            </FormGroup>
            {this.state.message ? (
              <Alert className="mt-2" color="danger">
                {this.state.message}
              </Alert>
            ) : null}
            <Button>Submit</Button>
            {this.props.loading ? (
              <Spinner className="ml-2" color="primary" />
            ) : null}
          </Form>
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  error: state.error,
  loading: state.bootcamps.loading,
  bootcamp: state.bootcamps.bootcamp,
});

export default connect(matchStateToProps, { createBootcamp })(CreateBootcamp);
