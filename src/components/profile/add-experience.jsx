import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { TextField } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
      badTitle: false,
      badCompany: false,
      badStartDate: false,
      badEndDate: false,
    };

    console.log(this.state);
  }
  sendData = () => {
    const startMonth = monthNames[this.state.startDate.getUTCMonth()];
    const startYear = this.state.startDate.getUTCFullYear();
    const newStartDate = startMonth + " " + startYear;
    const endMonth = monthNames[this.state.endDate.getUTCMonth()];
    const endYear = this.state.endDate.getUTCFullYear();
    const newEndDate = endMonth + " " + endYear;

    this.props.parentDataCallback({
      title: this.state.title,
      company: this.state.company,
      startDate: newStartDate,
      endDate: newEndDate,
      description: this.state.description,
    });
  };

  onSubmit = () => {
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(typeof this.state.startDate);
    console.log(this.state.description);

    if (this.state.title === "") {
      this.setState({
        badTitle: true,
      });
      this.dissmissTitleAlert();
    } else if (this.state.company === "") {
      this.setState({
        badCompany: true,
      });
      this.dissmissCompanyAlert();
      // } else if (typeof this.state.startDate != "string") {
      //   this.setState({
      //     badStartDate: true,
      //   });
      //   this.dissmissStartDateAlert();
      // } else if (this.state.endDate == "") {
      //   this.setState({
      //     badEndDate: true,
      //   });
      //   this.dissmissEndDateAlert();
    } else {
      this.sendData();
    }
  };

  dissmissTitleAlert() {
    setTimeout(() => {
      this.setState({ badTitle: false });
    }, 5000);
  }
  dissmissCompanyAlert() {
    setTimeout(() => {
      this.setState({ badCompany: false });
    }, 5000);
  }
  dissmissStartDateAlert() {
    setTimeout(() => {
      this.setState({ badStartDate: false });
    }, 5000);
  }
  dissmissEndDateAlert() {
    setTimeout(() => {
      this.setState({ badEndDate: false });
    }, 5000);
  }

  titleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  companyChange = (e) => {
    this.setState({
      company: e.target.value,
    });
  };

  startDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  endDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };
  descriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    return (
      <Container>
        {this.state.badTitle ? (
          <Alert variant="danger">Must enter a title!</Alert>
        ) : null}
        {this.state.badCompany ? (
          <Alert variant="danger">Must enter a company!</Alert>
        ) : null}
        {this.state.badStartDate ? (
          <Alert variant="danger">Must select a start date!</Alert>
        ) : null}
        {this.state.badEndDate ? (
          <Alert variant="danger">Must select a end date!</Alert>
        ) : null}
        <Row className="mt-3">
          <Col xs={12}>
            <TextField
              required
              id="jobTitle"
              label="Job Title"
              type="text"
              fullWidth
              variant="outlined"
              onChange={this.titleChange.bind(this)}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12}>
            <TextField
              required
              id="company"
              label="Company"
              fullWidth
              variant="outlined"
              onChange={this.companyChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={6}>
            <Row>
              <Col>Start Date</Col>
            </Row>
            <Row>
              <Col>
                <DatePicker
                  dateFormat="MMMM, yyyy"
                  selected={this.state.startDate}
                  onSelect={this.startDateChange.bind(this)}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <Col>End Date</Col>
            </Row>
            <Row>
              <Col>
                <DatePicker
                  dateFormat="MMMM, yyyy"
                  selected={this.state.endDate}
                  onSelect={this.endDateChange.bind(this)}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row>
          <Col xs={6}>my currently working in this role with a selector</Col>
        </Row> */}
        <Row className="mt-3">
          <Col>
            <TextField
              required
              id="description"
              label="Description"
              fullWidth
              variant="outlined"
              onChange={this.descriptionChange.bind(this)}
            />
          </Col>
        </Row>
        <Row className="justify-content-end mt-3">
          <Button className="mr-3" onClick={() => this.onSubmit()}>
            Submit
          </Button>
          <Button onClick={() => this.props.parentCancelCallback()}>
            Cancel
          </Button>
        </Row>
      </Container>
    );
  }
}

export default AddExperience;
