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

import { createReview } from '../../actions/reviewAction';

class CreateReview extends Component {
  state = {
    title: '',
    text: '',
    rating: '',
    message: null,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const review = {
      title: this.state.title,
      text: this.state.text,
      rating: this.state.rating,
    };

    this.props.createReview(review, this.props.id);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (prevProps.error !== error)
      if (error.id === 'REVIEW_CREATE_ERROR') {
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
              <Label>Review*</Label>
              <Input
                type="textarea"
                name="text"
                id="text"
                placeholder="Review..."
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Rating</Label>
              <Input
                type="number"
                name="rating"
                id="rating"
                placeholder="Rating"
                min="1"
                max="10"
                onChange={this.onChange}
              />
            </FormGroup>
            {this.state.message ? (
              <Alert className="mt-2" color="danger">
                {this.state.message}
              </Alert>
            ) : null}
            <Button>Submit</Button>
            {this.props.reviewLoading ? (
              <Spinner className="ml-2" color="primary" />
            ) : null}
          </Form>
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  reviewLoading: state.reviews.reviewLoading,
  error: state.error,
  review: state.reviews.review,
});

export default connect(matchStateToProps, { createReview })(
  withRouter(CreateReview)
);
