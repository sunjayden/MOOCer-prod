import React, { Component } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { TextField } from "@material-ui/core";

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

class AddSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      major: "",
      startDate: new Date(),
      endDate: new Date(),
      badSchool: false,
      badDegree: false,
      badMajor: false,
      badStartDate: false,
      badEndDate: false,
    };
  }
  sendData = () => {
    const startMonth = monthNames[this.state.startDate.getUTCMonth()];
    const startYear = parseInt(this.state.startDate.getUTCFullYear());
    const newStartDate = startMonth + " " + startYear;
    const endMonth = monthNames[this.state.endDate.getUTCMonth()];
    const endYear = parseInt(this.state.endDate.getUTCFullYear());
    const newEndDate = endMonth + " " + endYear;
    this.props.parentDataCallback({
      school: this.state.school,
      degree: this.state.degree,
      major: this.state.major,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  onSubmit = () => {
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    console.log(this.state.description);
    if (this.state.school === "") {
      this.setState({
        badSchool: true,
      });
      this.dissmissSchoolAlert();
    } else if (this.state.degree === "") {
      this.setState({
        badDegree: true,
      });
      this.dissmissDegreeAlert();
    } else if (this.state.major === "") {
      this.setState({
        badMajor: true,
      });
      this.dissmissMajorAlert();
    } else if (this.state.startDate === "") {
      this.setState({
        badStartDate: true,
      });
      this.dissmissStartDateAlert();
      // } else if (this.state.endDate == "") {
      //   this.setState({
      //     badEndDate: true,
      //   });
      //   this.dissmissEndDateAlert();
    } else {
      this.sendData();
    }
  };

  dissmissSchoolAlert() {
    setTimeout(() => {
      this.setState({ badSchool: false });
    }, 5000);
  }
  dissmissDegreeAlert() {
    setTimeout(() => {
      this.setState({ badDegree: false });
    }, 5000);
  }
  dissmissMajorAlert() {
    setTimeout(() => {
      this.setState({ badMajor: false });
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

  schoolChange = (e) => {
    this.setState({
      school: e.target.value,
    });
  };
  degreeChange = (e) => {
    this.setState({
      degree: e.target.value,
    });
  };
  majorChange = (e) => {
    this.setState({
      major: e.target.value,
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
        {this.state.badSchool ? (
          <Alert variant="danger">Must enter a school!</Alert>
        ) : null}
        {this.state.badDegree ? (
          <Alert variant="danger">Must enter a degree!</Alert>
        ) : null}
        {this.state.badMajor ? (
          <Alert variant="danger">Must enter a major!</Alert>
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
              id="schoool"
              label="School"
              type="text"
              fullWidth
              variant="outlined"
              onChange={() => this.schoolChange.bind(this)}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={6}>
            <TextField
              required
              id="degree"
              label="Degree"
              fullWidth
              variant="outlined"
              onChange={() => this.degreeChange.bind(this)}
            />
          </Col>
          <Col xs={6}>
            <TextField
              required
              id="major"
              label="Major"
              fullWidth
              variant="outlined"
              onSelect={() => this.majorChange.bind(this)}
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
                  fullWidth
                  selected={this.state.startDate}
                  onSelect={(date) => this.startDateChange(date)}
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
                  fullWidth
                  dateFormat="MMMM, yyyy"
                  selected={this.state.endDate}
                  onChange={(date) => this.endDateChange(date)}
                />
              </Col>
            </Row>
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

export default AddSchool;
