import React, { Component } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { TextField } from "@material-ui/core";

import "./edit-profile.css";

class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      location: "",
      email: "",
      about: "",
      badFirstName: false,
      badLastName: false,
      badEmail: false,
    };
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      title: this.props.title,
      location: this.props.location,
      email: this.props.email,
      about: this.props.about,
    });
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.firstName !== this.props.firstName) |
      (prevProps.lastName !== this.props.lastName) |
      (prevProps.title !== this.props.title) |
      (prevProps.location !== this.props.location) |
      (prevProps.email !== this.props.email) |
      (prevProps.about !== this.props.about)
    ) {
      this.setState({
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        title: this.props.title,
        location: this.props.location,
        email: this.props.email,
        about: this.props.about,
      });
    }
  }

  firstNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };
  lastNameChange = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };
  titleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  locationChange = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  aboutChange = (e) => {
    this.setState({
      about: e.target.value,
    });
  };

  toggleBadFirstName = () => {
    this.setState((state) => ({
      badFirstName: !state.badFirstName,
    }));
  };
  toggleBadLastName = () => {
    this.setState((state) => ({
      badLastName: !state.badLastName,
    }));
  };
  toggleBadEmail = () => {
    this.setState((state) => ({
      badEmail: !state.badEmail,
    }));
  };

  onNext = () => {
    // check to make sure first name, last name and email are always there
    if (this.state.firstName.length === 0) {
      this.setState({
        badFirstName: true,
      });
    } else if (this.state.lastName === "") {
      this.setState({
        badLastName: true,
      });
    } else if (this.state.email === "") {
      this.setState({
        badEmail: true,
      });
    } else {
      this.props.parentDataCallback({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title,
        location: this.state.location,
        email: this.state.email,
        about: this.state.about,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h5 className="mb-3">Tell us a little about yourself...</h5>
          </Col>
        </Row>

        {this.state.badFirstName ? (
          <Alert
            variant="danger"
            dismissible
            onClose={() => this.toggleBadFirstName()}
          >
            Must enter a first name!
          </Alert>
        ) : null}
        {this.state.badLastName ? (
          <Alert
            variant="danger"
            dismissible
            onClose={() => this.toggleBadLastName()}
          >
            Must enter a last name!
          </Alert>
        ) : null}
        {this.state.badEmail ? (
          <Alert
            variant="danger"
            dismissible
            onClose={() => this.toggleBadEmail()}
          >
            Must select an email!
          </Alert>
        ) : null}

        <Row className="mt-3">
          <Col xs={6}>
            <TextField
              id="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              value={this.state.firstName}
              onChange={() => this.firstNameChange.bind(this)}
            />
          </Col>
          <Col xs={6}>
            <TextField
              id="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              value={this.state.lastName}
              onChange={() => this.lastNameChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={6}>
            <TextField
              id="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={this.state.title}
              onChange={() => this.titleChange.bind(this)}
            />
          </Col>
          <Col xs={6}>
            <TextField
              id="location"
              label="Location"
              fullWidth
              variant="outlined"
              value={this.state.location}
              onChange={() => this.locationChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <TextField
              id="email"
              label="Email"
              fullWidth
              variant="outlined"
              value={this.state.email}
              onChange={() => this.emailChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <TextField
              id="about"
              variant="outlined"
              label="About me..."
              value={this.state.about}
              fullWidth
              multiline
              rows="4"
              onChange={() => this.aboutChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="justify-content-end mt-3 mr-3">
          <ArrowRight className="right-arrow" onClick={() => this.onNext()} />
        </Row>
        <Row className="justify-content-end mr-3">
          <button className="control-btn" onClick={() => this.onNext()}>
            Next
          </button>{" "}
        </Row>
      </Container>
    );
  }
}

export default UpdateUserInfo;
