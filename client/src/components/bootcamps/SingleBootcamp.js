import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { Fab, Action } from 'react-tiny-fab';

import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Spinner,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';

import {
  getBootcamp,
  deleteBootcamp,
  updateBootcamp,
  uploadPhoto,
  clearMessage,
} from '../../actions/bootcampAction';

class SingleBootcamp extends Component {
  state = {
    deleteBootcampModal: false,
    updateBootcampModal: false,
    uploadPhotoModal: false,
    name: '',
    description: '',
    website: '',
    phone: '',
    email: '',
    address: '',
    file: {},
    message: null,
  };

  componentDidMount() {
    this.props.clearMessage();
    this.props.getBootcamp(this.props.match.params.id);
  }

  deleteBootcamp = () => {
    this.setState({ deleteBootcampModal: !this.state.deleteBootcampModal });
  };

  updateBootcamp = () => {
    this.setState({ updateBootcampModal: !this.state.updateBootcampModal });
  };

  uploadPhoto = () => {
    this.setState({ uploadPhotoModal: !this.state.uploadPhotoModal });
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

  fileUpload = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({ file });
  };

  componentDidUpdate(prevProps) {
    if (this.props.bootcampMessage === 'DELETE_SUCCESSFUL') {
      this.props.history.push('/dashboard');
    }

    const { error } = this.props;
    if (prevProps.error !== error) {
      if (
        error.id === 'BOOTCAMP_UPDATE_ERROR' ||
        error.id === 'UPLOAD_IMAGE_ERROR'
      ) {
        this.setState({
          message: error.message.error,
        });
      } else {
        this.setState({
          message: null,
        });
      }
    }

    if (
      this.props.bootcampMessage === 'UPDATE_SUCCESSFUL' &&
      this.state.updateBootcampModal
    ) {
      this.updateBootcamp();
    }

    if (
      this.props.bootcampMessage === 'UPLOAD_SUCCESSFUL' &&
      this.state.uploadPhotoModal
    ) {
      this.uploadPhoto();
      window.location.reload();
    }
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
            <h4 className="mt-4">Contact Details:</h4>
            <h5 className="mt-2">{bootcamp.website}</h5>
            <h5 className="mt-2">{bootcamp.email}</h5>
            <h5 className="mt-2">{bootcamp.phone}</h5>
            <h5 className="mt-4">Average Fees: ${bootcamp.averageCost}</h5>
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

    var tool;
    if (bootcamp && this.props.user && bootcamp.user === this.props.user._id) {
      tool = (
        <Fab position={{ bottom: 0, right: 0 }} icon="🔧">
          <Action
            style={{ backgroundColor: 'black' }}
            text="Edit Bootcamp"
            onClick={this.updateBootcamp}
          >
            <span role="img" aria-label="Edit Bootcamp">
              ✏️
            </span>
          </Action>
          <Action
            style={{ backgroundColor: 'black' }}
            text="Upload Bootcamp Photo"
            onClick={this.uploadPhoto}
          >
            <span role="img" aria-label="Upload Bootcamp Photo">
              🖼
            </span>
          </Action>
          <Action style={{ backgroundColor: '#347aeb' }} text="Add a Course">
            +
          </Action>
          <Action
            style={{ backgroundColor: '#e82c2c' }}
            text="Delete Bootcamp"
            onClick={this.deleteBootcamp}
          >
            <span role="img" aria-label="Delete Bootcamp">
              🗑
            </span>
          </Action>
        </Fab>
      );
    }

    var deleteModal = (
      <div>
        <Modal
          isOpen={this.state.deleteBootcampModal}
          toggle={this.deleteBootcamp}
        >
          <ModalHeader toggle={this.deleteBootcamp}>
            Delete Bootcamp
          </ModalHeader>
          <Container>
            <p className="mt-3">
              Are you sure you want to delete the bootcamp?
            </p>
            <ModalFooter>
              <Button
                color="danger"
                onClick={() => {
                  this.props.deleteBootcamp(bootcamp._id);
                }}
              >
                Delete
              </Button>{' '}
              {this.props.isLoading ? (
                <Spinner className="ml-2" color="primary" />
              ) : null}{' '}
              <Button color="secondary" onClick={this.deleteBootcamp}>
                Cancel
              </Button>
            </ModalFooter>
          </Container>
        </Modal>
      </div>
    );

    var updateModal = (
      <div>
        <Modal
          isOpen={this.state.updateBootcampModal}
          toggle={this.updateBootcamp}
        >
          <ModalHeader toggle={this.updateBootcamp}>
            Update Bootcamp
          </ModalHeader>
          <Container className="mt-2 mb-2">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={bootcamp.name}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder={bootcamp.description}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  id="website"
                  placeholder={bootcamp.website}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder={bootcamp.phone}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder={bootcamp.email}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder={
                    bootcamp.location && bootcamp.location.formattedAddress
                  }
                  onChange={this.onChange}
                />
              </FormGroup>
              {this.state.message ? (
                <Alert className="mt-2" color="danger">
                  {this.state.message}
                </Alert>
              ) : null}
              <Button
                color="primary"
                onClick={() => {
                  const updateBootcamp = {
                    name: this.state.name ? this.state.name : bootcamp.name,
                    description: this.state.description
                      ? this.state.description
                      : bootcamp.description,
                    website: this.state.website
                      ? this.state.website
                      : bootcamp.website,
                    phone: this.state.phone ? this.state.phone : bootcamp.phone,
                    email: this.state.email ? this.state.email : bootcamp.email,
                    address: this.state.address
                      ? this.state.address
                      : bootcamp.address,
                  };

                  this.props.updateBootcamp(updateBootcamp, bootcamp._id);
                }}
              >
                Update
              </Button>{' '}
              {this.props.isLoading ? (
                <Spinner className="ml-2" color="primary" />
              ) : null}{' '}
              <Button color="secondary" onClick={this.updateBootcamp}>
                Cancel
              </Button>
            </Form>
          </Container>
        </Modal>
      </div>
    );

    var uploadModal = (
      <div>
        <Modal isOpen={this.state.uploadPhotoModal} toggle={this.uploadPhoto}>
          <ModalHeader toggle={this.uploadPhoto}>Upload Photo</ModalHeader>
          <Container>
            {this.state.message ? (
              <Alert className="mt-2" color="danger">
                {this.state.message}
              </Alert>
            ) : null}
            <Button
              className="mt-2 mb-2"
              onClick={() => {
                this.upload.click();
              }}
            >
              Select File
            </Button>
            <input
              type="file"
              id="file"
              ref={(ref) => (this.upload = ref)}
              style={{ display: 'none' }}
              onChange={this.fileUpload}
            />
            {this.state.file.name ? (
              <h4>{this.state.file.name} selected</h4>
            ) : null}
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.props.uploadPhoto(this.state.file, bootcamp._id);
                }}
              >
                Upload
              </Button>{' '}
              {this.props.isLoading ? (
                <Spinner className="ml-2" color="primary" />
              ) : null}{' '}
              <Button color="secondary" onClick={this.uploadPhoto}>
                Cancel
              </Button>
            </ModalFooter>
          </Container>
        </Modal>
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
          {tool}
          {deleteModal}
          {updateModal}
          {uploadModal}
        </Container>
      </div>
    );
  }
}

const matchStateToProps = (state) => ({
  user: state.auth.user,
  bootcamp: state.bootcamps.bootcamp,
  bootcampMessage: state.bootcamps.message,
  error: state.error,
  isLoading: state.bootcamps.loading,
});

export default connect(matchStateToProps, {
  getBootcamp,
  deleteBootcamp,
  updateBootcamp,
  uploadPhoto,
  clearMessage,
})(SingleBootcamp);
