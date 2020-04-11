import React, { Component } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import profile_img1 from "../imgs/profile1.svg";
import profile_img2 from "../imgs/profile2.svg";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "../header/navigation";
import { SocialIcon } from "react-social-icons";

import "./about.css"

class About extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Nav />
        <Container className="h-100 mb-5">
          <Row className="h-20 mt-5">
            <Col
              className="h-100 align-items-center justify-content-center"
              xs={{ span: 12 }}
            >
              <Jumbotron
                fluid
                className="pl-5 pr-5"
                style={{
                  backgroundColor: "#f6f8fa",
                }}
              >
                <h1
                  style={{
                    color: "#47646f",
                  }}
                >
                  MOOCer 2.0
                </h1>
                <p
                  style={{
                    color: "#47646f",
                  }}
                >
                  MOOCer v2.0 aims to create a centralized location that allows
                  users to find the right courses, better manage their online
                  portfolios, and be able to follow a well designed
                  specialization this is not limited by platforms as well as
                  potentially tracking all of their course progresses
                </p>
              </Jumbotron>
            </Col>
          </Row>

          <Row className="align-items-stretch mt-2">
            {/* align-items-center justify-content-center */}
            <Col className="h-100" xs={6}>
              <Card
                className="h-100"
                style={{
                  backgroundColor: "#47646f",
                }}
              >
                <Card.Body
                  style={{
                    backgroundColor: "#47646f",
                  }}
                >
                  <Card.Text
                    className="h-100"
                    style={{
                      color: "#f6f8fa",
                      fontSize: "16px",
                    }}
                  >
                    As of 2018, there are 30 million registered users on
                    Coursera, 14 million on edX and 8 million users on Udacity.
                    The growth of Massive Open Online Course(MOOCs) has been
                    booming ever since Stephen Downes and Georgia Siemens
                    offered the first free course on Connectivism and
                    Connectivity Knowledge in 2008 with the intention to explore
                    possibilities of a richer learning made possible by online
                    tools. Ever since, there has been a massive increase in the
                    number of free courses available online ranging from every
                    aspect of knowledge and offered by many top universities and
                    companies around the globe. MOOCs were created with the
                    intention to bring about ease of learning by providing
                    unlimited participation and open access through web.
                    However, with the increasing options for courses among
                    multiple platforms such Coursera, edX, and Udacity users are
                    faced with choice overload that can hinder their learning.
                    In addition, studies show that out of all the people that
                    sign up for MOOCs only about 3.3 percent completed their
                    course in the year 2017-2018. One of the reasons why people
                    fail to complete their courses can be traced back to the
                    fact that there are so many platforms available which makes
                    it difficult to find the right courses, to keep track of
                    user’s online portfolio, and track their course progresses.
                    With our project we want to build on top of the previous
                    MOOCer project to integrate more functionalities and
                    modularities to further facilitate online learning.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col className="h-100" xs={6}>
              <Row
                className="align-self-start align-items-center"
                // style={{ marginBottom: "50px" }}
              >
                <Col xs={12}>
                  <Card
                    className="h-100"
                    style={{
                      backgroundColor: "#8ea6b2",
                    }}
                  >
                    <Card.Body
                      style={{
                        backgroundColor: "#8ea6b2",
                      }}
                    >
                      <Row className="align-self-center intro">
                        <Col xs={5} className="align-items-center">
                          <Image
                            className="course-image align-self-center"
                            src={profile_img1}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Col>
                        <Col xs={7} className="align-items-center">
                          <h3 style={{ color: "#f6f8fa" }}>Jayden Sun</h3>
                          <p
                            className="intro-summary"
                            style={{ color: "#f6f8fa" }}
                          >
                            I'm first year master student at Georgia Tech with 
                            specialization in Machine Learning. During my free
                            time, I like to cook and build LEGOs. I enjoy coding
                            and building apps.
                          </p>
                          <Row className="justify-content-end mr-3">
                            <SocialIcon
                              url="https://www.linkedin.com/in/jaydensun/"
                              className="mr-1"
                            />
                            <SocialIcon url="https://github.com/sunjayden" />
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3 align-self-end align-items-center">
                <Col xs={12}>
                  <Card
                    className="h-100 overflow-auto"
                    style={{
                      backgroundColor: "#8ea6b2",
                    }}
                  >
                    <Card.Body
                      style={{
                        backgroundColor: "#8ea6b2",
                      }}
                    >
                      <Row className="align-self-center overflow-auto">
                        <Col xs={5} className="align-items-center">
                          <Image
                            className="course-image"
                            src={profile_img2}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </Col>
                        <Col xs={7} className="align-items-center">
                          <h3 style={{ color: "#f6f8fa" }}>Yuli Liu</h3>
                          <p
                            className="intro-summary"
                            style={{ color: "#f6f8fa" }}
                          >
                            I'm first year master student at Georgia Tech with
                            specialization in Machine Learning. During my free
                            time, I enjoy exploring new places and especially
                            new restuarants. I enjoy learning new things and
                            tackle complex problems witht logics.
                          </p>
                          <Row className="justify-content-end mr-3">
                            <SocialIcon
                              url="https://www.linkedin.com/in/yuliliu97/"
                              className="mr-1"
                            />
                            <SocialIcon url="https://github.com/Yuliy97" />
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default About;
