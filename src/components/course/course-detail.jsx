import React, { Component } from "react";
import { Button, Container, Row, Col, Jumbotron } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Nav from "../header/navigation";
import Lessons from "./lesson";
import Reviews from "./reviews";
import { VerifyToken, GetToken } from "../utils/auth"
import { config } from '../../config';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: false,
      duration: "",
      learning: "",
      key: "",
      image: "",
      level: "",
      isFreeCourse: "",
      lessons: [],
      prerequisite: "",
      shortSummary: "",
      url: "",
      subtitle: "",
      summary: "",
      title: "",
      platform: "",
      review_page: 0,
      reviews: "",
      courseid: "",
      courseStatus: "",
      token: ""
    };
  }

  componentDidMount() {
    if (!VerifyToken()) {
      return this.props.history.push("/");
    }

    window.scrollTo(0, 0);

    const token = GetToken().token;
    this.setState({ token: token })

    const handle = this.props.match.params.id;
    fetch(config.API_URL + `/api/courses/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState(() => ({
          degree: data[0].degree,
          duration: data[0].duration,
          learning: data[0].learning,
          key: data[0].key,
          image: data[0].image,
          level: data[0].level,
          isFreeCourse: data[0].isFreeCourse,
          lessons: data[0].lessons,
          prerequisite: data[0].prerequisite,
          shortSummary: data[0].shortSummary,
          url: data[0].url,
          subtitle: data[0].subtitle,
          summary: data[0].summary,
          title: data[0].title,
          platform: data[0].platform,
          reviews: data[0].reviews,
          courseid: data[0]._id,
        }));
      });

    fetch(config.API_URL + `/api/user/course/${handle}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const status = data.message;
        console.log(status);
        if (status === "New Course") {
          this.setState({ courseStatus: "Start Course" });
        } else if (status === "In Progress") {
          this.setState({ courseStatus: "Marked as Completed" });
        } else if (status === "Completed") {
          this.setState({ courseStatus: "Completed" });
        }
      });
  }

  loadMoreReview(pageNumber) {
    this.setState(
      {
        review_page: pageNumber,
      },
      () => this.loadPage()
    );
  }

  changeStatus() {
    const MySwal = withReactContent(Swal);
    const courseStatus = this.state.courseStatus;
    let newStatus = "inProgress"
    if (courseStatus === "Marked as Completed") {
      newStatus = "Completed"
    }

    fetch(config.API_URL + `/api/user/course`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.state.token,
      },
      body: JSON.stringify({
        courseId: this.props.match.params.id,
        newStatus: newStatus
      })
    }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (newStatus === "inProgress") {
            this.setState({ courseStatus: "Marked as Completed" })
            return MySwal.fire({
              title: <p>Woohoo! Start learning by navigating to the course link. </p>,
              icon: 'info'
            })
          } else {
            this.setState({ courseStatus: "Completed" })
            return MySwal.fire({
              title: <p>Congratulation! You have completed the course. </p>,
              icon: 'success'
            })
          }
        }
      });
  }

  render() {
    let freeCourse = this.state.isFreeCourse === true ? "Free " : "Paid";

    let captalize = (str) => {
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    };

    return (
      <>
        <Nav />
        <Container className="align-items-center justify-content-center align-middle">
          <Row>
            <Col className="summary mt-5" xs={12}>
              <Jumbotron
                style={{
                  backgroundImage:
                    "url(" +
                    "https://mdbootstrap.com/img/Photos/Others/gradient1.jpg" +
                    ")",
                  backgroundSize: "cover",
                }}
              >
                <h1>{this.state.title}</h1>
                <p style={{ color: "#47646f" }}>{this.state.subtitle}</p>
                <Button
                  className="courseLinkButton mt-2"
                  onClick={(event) => {
                    event.preventDefault();
                    window.open(this.state.url);
                  }}
                >
                  Course Link
              </Button>
                {this.state.courseStatus !== "Completed" ? <Button className="mt-2" onClick={this.changeStatus.bind(this)}> {this.state.courseStatus} </Button> : <Button className="mt-2 completedBtn" > <FaCheck /> {this.state.courseStatus} </Button>}

              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col className="summary" xs={6}>
              <h4 style={{ color: "#1e383c" }}>About this Course</h4>
              <div className="summary-text">
                <p style={{ color: "#47646f" }}>{this.state.summary}</p>
              </div>
            </Col>

            <Col className="details" xs={6}>
              <Row className="section">
                <Col xs={4}>
                  <h6>Cost</h6>
                  <h5>{freeCourse}</h5>
                </Col>
                <Col xs={4}>
                  <h6>Timeline</h6>
                  <h5>Aprox. {this.state.duration}</h5>
                </Col>
                <Col xs={4}>
                  <h6>Type</h6>
                  <h5>{captalize(this.state.level)}</h5>
                </Col>
              </Row>
              <Row className="prerequisite mt-3">
                <Col xs={12}>
                  <h6>Prerequisite</h6>
                  <h5>{this.state.prerequisite.replace(/(<([^>]+)>)/gi, "")}</h5>
                </Col>
              </Row>

              <Row className="platform mt-3">
                <Col xs={12}>
                  <h6>Platform</h6>
                  <h5>{captalize(this.state.platform)}</h5>
                </Col>
              </Row>
            </Col>
          </Row>

          {this.state.lessons.length !== 0 ? <Row>
            <Col className="lesson" xs={12}>
              <Lessons lessonList={this.state.lessons} />
            </Col>
          </Row> : <Row><Col className="cluter" style={{margin: "24px 0px 24px 0px"}}></Col></Row>}

          <Row className="Reviews">
            <Col xs={12}>
              <div>
                <Reviews courseId={this.props.match.params.id} />
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CourseDetail;
