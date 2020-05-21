import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

import { createCourse } from '../../actions/courseAction';

class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    weeks: '',
    tuition: '',
    minimumSkill: 'beginner',
    scholarhipsAvailable: false,
    message: null,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const course = {
      title: this.state.title,
      description: this.state.description,
      weeks: this.state.weeks,
      tuition: this.state.tuition,
      minimumSkill: this.state.minimumSkill,
      scholarhipsAvailable: this.state.scholarhipsAvailable,
    };

    this.props.createCourse(course, this.props.id);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error)
      if (error.id === 'COURSE_CREATE_ERROR') {
        this.setState({
          message: error.message.error,
        });
      } else {
        this.setState({
          message: null,
        });
      }
  }

  render() {
    return (
      <div>
        <Container className="overWrite mt-3 mb-4">
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Title*</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
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
              <Label>Weeks</Label>
              <Input
                type="number"
                name="weeks"
                id="weeks"
                placeholder="Weeks"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Tuition</Label>
              <Input
                type="number"
                name="tuition"
                id="tuition"
                placeholder="Tuition"
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Minimum Skill</Label>
              <Input
                type="select"
                name="minimumSkill"
                id="minimumSkill"
                onChange={this.onChange}
              >
                <option value="beginner" selected>
                  Beginner
                </option>
                <option value="intermediate">Intermdeiate</option>
                <option value="advanced">Advanced</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Scholarhips Available</Label>
              <Input
                type="select"
                name="scholarhipsAvailable"
                id="scholarhipsAvailable"
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
            {this.props.courseLoading ? (
              <Spinner className="ml-2" color="primary" />
            ) : null}
          </Form>
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  courseLoading: state.courses.courseLoading,
  error: state.error,
  course: state.courses.course,
});

export default connect(matchStateToProps, { createCourse })(
  withRouter(CreateCourse)
);
