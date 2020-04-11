import React, { Component } from "react";
import { Container, Row, Col, Jumbotron, Media, Card, ListGroup, ListGroupItem, Image } from "react-bootstrap";
import Chip from "@material-ui/core/Chip";

import Experience from "./profile-experiences";
import Nav from "../header/navigation";
import { Link } from "react-router-dom";
import { VerifyToken, GetToken } from "../utils/auth";
import { config } from '../../config';

import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      title: "",
      location: "",
      email: "",
      about: "",
      skills: [],
      courses: [],
      experiences: [],
      educations: [],
    };
  }

  componentDidMount() {
    if (!VerifyToken()) {
      return this.props.history.push("/");
    }
    window.scrollTo(0, 0);
    this.loadData();
  }

  loadData = async () => {
    const token = GetToken().token;
    this.setState({ token: token });
    await fetch(config.API_URL + `/api/user/profile`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let _location = "";
        let _title = "";
        let _about = "";
        let _skills = [];
        let _courses = [];
        let _experiences = [];
        let _educations = [];
        if (data.hasOwnProperty("profile")) {
          _location = data.profile.location;
          _title = data.profile.title;
          _about = data.profile.about;
          _skills = data.profile.skills;
          _courses = data.profile.courses;
          _experiences = data.profile.experiences;
          _educations = data.profile.education;
        }

        this.setState(() => ({
          firstName: data.firstName,
          lastName: data.lastName,
          title: _title,
          location: _location,
          email: data.email,
          about: _about,
          skills: _skills,
          courses: _courses,
          experiences: _experiences,
          educations: _educations,
        }));
      });
  };

  renderSkillList() {
    return this.state.skills.map((skill, index) => {
      return (
        <Chip
          key={index}
          style={{
            backgroundColor: "#8ea6b2",
            fontSize: "medium",
            color: "#f6f8fa",
            marginRight: "5px",
            marginTop: "5px",
          }}
          label={skill}
        />
      );
    });
  }

  renderCourseList() {
    return this.state.courses.map((course, index) => {
      return (
        <ListGroupItem key={index} style={{ border: "none" }}>
          <Media
            className="course-card"
            style={{ backgroundColor: "#f6f8fa", boxShadow: "none" }}
          >
            <Image className="mr-3 course-image" src={course.image} />
            <Media.Body>
              <h3>{course.title}</h3>
              <p className="course-summary">{course.shortSummary}</p>
              <div className="text-right"></div>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    });
  }
  renderEducation() {
    return this.state.educations.map((education, index) => {
      return (
        <Row className="h-30 pb-2 mt-3" key={index}>
          <Col>
            <Card>
              <Card.Body style={{ backgroundColor: "#f6f8fa", border: "none" }}>
                <Card.Title>{education.school}</Card.Title>
                <Card.Subtitle>
                  {education.degree} | {education.major}
                </Card.Subtitle>
                {education.startDate} - {education.endDate}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <>
        <Nav />
        <Container>
          <Row className="justify-content-end mr-3 mt-4">
            <Link to={"/portfolio/edit"} style={{ color: "#1e383c" }}>
              Edit Portfolio
            </Link>
          </Row>
          <Row>
            <Col xs={12} className="mb-0 mt-3">
              <Jumbotron
                style={{
                  backgroundImage:
                    "url(" +
                    "https://mdbootstrap.com/img/Photos/Others/background.jpg" +
                    ")",
                  backgroundSize: "cover",
                }}
              >
                <h2>
                  {this.state.firstName} {this.state.lastName}
                </h2>
                <h5 style={{ color: "#47646f" }}>
                  {this.state.title} | {this.state.location} |{" "}
                  {this.state.email}
                </h5>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Card.Title>About</Card.Title>
                  <Card.Subtitle muted style={{ color: "#47646f" }}>
                    {this.state.about}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>Skills</Card.Title>
                  {this.renderSkillList()}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>Educations</Card.Title>
                  <ListGroup>{this.renderEducation()}</ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col xs={12} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>Experiences</Card.Title>
                  <Experience
                    className="mt-5"
                    experiencesList={this.state.experiences}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col xs={12} className="mt-4">
              <Card>
                <Card.Body>
                  <Card.Title>Courses</Card.Title>
                  <ListGroup>{this.renderCourseList()}</ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
