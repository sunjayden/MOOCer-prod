import React, { Component } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

import Nav from "../header/navigation";
import homeImage from "../imgs/home.png";

import "./home.css"

class Main extends Component {
  state = {};
  render() {
    return (
      <>
        <Nav />
        <Container fluid className="hero h-100">
          <Row>
            <Col md={6} className="content">
            <h1 className="home-title"> Your online course management tool </h1>
            <h2 className="home-description"> A better application for online course management. </h2>
            <Button className="startBtn" href="/auth">Start learning</Button>
            </Col>
            <Col md={6}>
              <Image src={homeImage} className="home-image"></Image>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;
