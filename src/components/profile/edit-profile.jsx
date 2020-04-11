import React, { Component } from "react";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import ChipInput from "material-ui-chip-input";

import TabPanel from "./tab-panel";
import Nav from "../header/navigation";
import AddExperience from "./add-experience";
import AddSchool from "./add-school";
import UpdateUserInfo from "./user-info";
import { Tabs, Tab } from "@material-ui/core";
import { VerifyToken, GetToken } from "../utils/auth";
import { config } from '../../config';

import "./edit-profile.css";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxTabs: 3,
      addExpDiv: false,
      addEduDiv: false,
      showSuccExpUpdate: false,
      showSuccEduUpdate: false,
      showSuccSave: false,
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      location: "",
      about: "",
      value: 0,
      skills: [],
      educations: [],
      // courses: [],
      experiences: [],
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
    await fetch(config.API_URL + `/api/user`, {
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
        let _experiences = [];
        let _educations = [];
        if (data.hasOwnProperty("profile")) {
          _location = data.profile.location;
          _title = data.profile.title;
          _about = data.profile.about;
          _skills = data.profile.skills;
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
          // courses: _courses,
          experiences: _experiences,
          educations: _educations,
        }));
        console.log(this.state);
        console.log(data);
      });
  };
  onSaveChanges = () => {
    const token = GetToken().token;
    this.setState({ token: token });
    console.log(this.state);
    fetch(config.API_URL + `/api/user/profile`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        title: this.state.title,
        location: this.state.location,
        education: this.state.educations,
        about: this.state.about,
        skills: this.state.skills,
        // courses: this.state.courses,
        experiences: this.state.experiences,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    this.toggleUpdateSuc();
    this.dissmissSuccSaveAlert();
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  allyProps(index) {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  }

  LinkTab = (label, href, index) => {
    return (
      <Tab
        label={label}
        href={href}
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...this.allyProps(index)}
      />
    );
  };

  renderEducation() {
    return this.state.educations.map((education, index) => {
      return (
        <Row className="h-30 pb-2 mt-3" key={index}>
          <Col>
            <Card>
              <Card.Body>
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

  renderExperience() {
    return this.state.experiences.map((exp, index) => {
      return (
        <Row className="h-30 pb-2 mt-3" key={index}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{exp.title}</Card.Title>
                <Card.Subtitle>
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </Card.Subtitle>
                {exp.description}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    });
  }
  infoCallBackFunction = async (childData) => {
    console.log(childData);
    await this.setState(childData);
    console.log(this.state);
    this.handleChange(1, 1);
  };

  expCallBackFunction = async (childData) => {
    await this.setState((experiences) => {
      const list = this.state.experiences;
      list.push(childData);
      return list;
    });
    this.toggleAddExp();
    this.toggleExpUpdateSuc();
    this.dissmissSuccExpAlert();
  };

  dissmissSuccExpAlert() {
    setTimeout(() => {
      this.setState({ showSuccExpUpdate: false });
    }, 3000);
  }
  dissmissSuccEduAlert() {
    setTimeout(() => {
      this.setState({ showSuccEduUpdate: false });
    }, 3000);
  }
  dissmissSuccSaveAlert() {
    setTimeout(() => {
      this.setState({ showSuccSave: false });
    }, 3000);
  }

  eduCallBackFunction = async (childData) => {
    await this.setState((educations) => {
      const list = this.state.educations;
      list.push(childData);
      return list;
    });
    this.toggleAddEdu();
    this.toggleEduUpdateSuc();
    this.dissmissSuccEduAlert();
  };

  toggleAddExp = () => {
    this.setState((state) => ({
      addExpDiv: !state.addExpDiv,
    }));
  };
  toggleAddEdu = () => {
    this.setState((state) => ({
      addEduDiv: !state.addEduDiv,
    }));
  };

  toggleExpUpdateSuc = () => {
    this.setState((state) => ({
      showSuccExpUpdate: !state.showSuccExpUpdate,
    }));
  };

  toggleEduUpdateSuc = () => {
    this.setState((state) => ({
      showSuccEduUpdate: !state.showSuccEduUpdate,
    }));
  };
  toggleUpdateSuc = () => {
    this.setState((state) => ({
      showSuccSave: !state.showSuccSave,
    }));
  };

  handleSkillChange = async (chips) => {
    await this.setState({
      skills: chips,
    });
  };

  render() {
    return (
      <>
        <Nav />
        <Container className="mt-5 mb-5">
          <Row>
            <Col xs={4}>
              <h5 className="text-center">User Profile</h5>
              <Tabs
                orientation="vertical"
                value={this.state.value}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
              >
                {this.LinkTab("User Info", "#userinfo", 0)}
                {this.LinkTab("Skills", "#skills", 1)}
                {this.LinkTab("Educations", "#educations", 2)}
                {this.LinkTab("Experiences", "#experiences", 3)}
              </Tabs>
            </Col>
            <Col xs={8}>
              <TabPanel value={this.state.value} index={0}>
                <UpdateUserInfo
                  parentDataCallback={this.infoCallBackFunction}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  title={this.state.title}
                  location={this.state.location}
                  email={this.state.email}
                  about={this.state.about}
                />
              </TabPanel>
              <TabPanel value={this.state.value} index={1}>
                <Container>
                  <Row>
                    <Col>
                      <h5 className="mb-3">Add your skills</h5>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={12}>
                      <ChipInput
                        defaultValue={this.state.skills}
                        onChange={(chips) => this.handleSkillChange(chips)}
                        // onChange={(chips) => handleChange(chips)} => update skill state
                      />
                      {console.log(this.state)}
                    </Col>
                  </Row>
                  <Row className="mt-3 ml-3">
                    <Col xs={6}>
                      <Row className="mt-3">
                        <ArrowLeft
                          className="left-arrow"
                          style={{ marginLeft: 0 }}
                          onClick={() => this.handleChange(0, 0)}
                        />
                      </Row>
                      <Row>
                        <button
                          className="control-btn"
                          onClick={() => this.handleChange(0, 0)}
                        >
                          Previous
                        </button>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <Row className="justify-content-end mt-3 mr-3">
                        <ArrowRight
                          className="right-arrow"
                          onClick={() => this.handleChange(2, 2)}
                        />
                      </Row>
                      <Row className="justify-content-end mr-3">
                        <button
                          className="control-btn"
                          onClick={() => this.handleChange(2, 2)}
                        >
                          Next
                        </button>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </TabPanel>
              <TabPanel value={this.state.value} index={2}>
                <Container>
                  <Row>
                    <Col>
                      <h5 className="mb-3">Add Your Past Educations</h5>
                    </Col>
                  </Row>
                  {this.state.showSuccEduUpdate ? (
                    <Alert variant="success">Education Updated!</Alert>
                  ) : null}
                  <Row>
                    <Col>
                      <Row className="justify-content-end mt-3 mr-3">
                        <button
                          className="control-btn"
                          onClick={() => this.toggleAddEdu()}
                        >
                          Add School
                        </button>

                        {this.state.addEduDiv ? (
                          <AddSchool
                            parentDataCallback={this.eduCallBackFunction}
                            parentCancelCallback={this.toggleAddEdu}
                          />
                        ) : null}
                      </Row>
                    </Col>
                  </Row>
                  {this.renderEducation()}
                  <Row className="mt-3 ml-3">
                    <Col xs={6}>
                      <Row className="mt-3">
                        <ArrowLeft
                          className="left-arrow"
                          style={{ marginLeft: 0 }}
                          onClick={() => this.handleChange(1, 1)}
                        />
                      </Row>
                      <Row>
                        <button
                          className="control-btn"
                          onClick={() => this.handleChange(1, 1)}
                        >
                          Previous
                        </button>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <Row className="justify-content-end mt-3 mr-3">
                        <ArrowRight
                          className="right-arrow"
                          onClick={() => this.handleChange(3, 3)}
                        />
                      </Row>
                      <Row className="justify-content-end mr-3">
                        <button
                          className="control-btn"
                          onClick={() => this.handleChange(3, 3)}
                        >
                          Next
                        </button>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </TabPanel>

              <TabPanel value={this.state.value} index={3}>
                <Container>
                  <Row>
                    <Col>
                      {this.state.showSuccSave ? (
                        <Alert variant="success">Profile Updated!</Alert>
                      ) : null}
                      <h5 className="mb-3">Add Your Past Experiences</h5>
                    </Col>
                  </Row>
                  {this.state.showSuccExpUpdate ? (
                    <Alert variant="success">Experience Updated!</Alert>
                  ) : null}
                  <Row>
                    <Col>
                      <Row className="justify-content-end mt-3 mr-3">
                        <button
                          className="control-btn"
                          onClick={() => this.toggleAddExp()}
                        >
                          Add Experience
                        </button>
                        {this.state.addExpDiv ? (
                          <AddExperience
                            parentDataCallback={this.expCallBackFunction}
                            parentCancelCallback={this.toggleAddExp}
                          />
                        ) : null}
                      </Row>
                    </Col>
                  </Row>
                  {this.renderExperience()}
                  <Row className="mt-3">
                    <Col xs={6}>
                      <Row className="mt-3">
                        <ArrowLeft
                          className="left-arrow"
                          style={{ marginLeft: 0 }}
                          onClick={() => this.handleChange(2, 2)}
                        />
                      </Row>
                      <Row>
                        <button
                          className="control-btn"
                          onClick={() => this.handleChange(2, 2)}
                        >
                          Previous
                        </button>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <Row className="mr-3 justify-content-end">
                        <Button
                          style={{
                            backgroundColor: "#8ea6b2",
                            outlineColor: "#8ea6b2",
                          }}
                          onClick={() => this.onSaveChanges()}
                        >
                          Save Changes
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </TabPanel>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default EditProfile;
