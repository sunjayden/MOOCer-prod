import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { ListGroup, Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { GetToken } from "../utils/auth.jsx";
import { config } from '../../config';

import "./reviews.css";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.courseId,
      reviews: [],
      limit: 3,
      currentPage: 1,
      maxPage: 1,
      avgRating: 0,
      reviewModal: false,
      rating: 0,
      comment: "",
      username: "Frank",
      showGood: false,
      showbad: false,
    };
  }
  componentDidMount() {
    this.loadPage();
  }

  getReviewPage(pageNumber) {
    this.setState(
      {
        currentPage: pageNumber,
      },
      () => this.loadPage()
    );
  }

  loadPage() {
    let url = config.API_URL + `/api/reviews?courseId=${this.state.courseId}&perPage=${this.state.limit}&page=${this.state.currentPage}`;

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          reviews: data.reviews,
          // currentPage: data.page,
          maxPage: data.pages,
        });
        if (data.avg_rating != null) {
          this.setState({
            avgRating: data.avg_rating,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  renderReviewCardList() {
    return this.state.reviews.map((review, index) => {
      return (
        <ListGroup.Item key={index} className="border-bottom-0 review-card">
          <Card className="overflow-auto sing-card">
            <Card.Body>
              <Card.Title>
                <Container>
                  <Row>
                    <Col xs={5} className="author">
                      {review.rated_by.firstName}
                    </Col>
                    <Col xs={7} className="inline-block float-right">
                      <StarRatings
                        className="ml-auto"
                        rating={review.rating}
                        starRatedColor="#FEBF00"
                        starDimension="23px"
                        starSpacing="1px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </Col>
                  </Row>
                </Container>
              </Card.Title>
              <Card.Text>{review.comment}</Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      );
    });
  }
  toggleReviewModal = () => {
    this.setState((state) => ({
      reviewDiv: !state.reviewDiv,
    }));
  };
  dismiss5Success = () => {
    setTimeout(() => {
      this.setState({ showGood: false });
    }, 5000);
  };
  dismiss5Warning = () => {
    setTimeout(() => {
      this.setState({ showBad: false });
    }, 5000);
  };
  sumbitReview() {
    // console.log("in submit");
    // console.log(GetToken().token);

    if (this.state.rating > 0) {
      let url = config.API_URL + `/api/reviews?courseId=${this.state.courseId}`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: GetToken().token,
        },
        body: JSON.stringify({
          course: `${this.state.courseId}`,
          rating: `${this.state.rating}`,
          comment: `${this.state.comment}`,
        }),
      };

      fetch(url, requestOptions)
        .then(async (response) => {
          this.setState({
            showGood: true,
          });
          this.dismiss5Success();
          this.toggleReviewModal();
          this.loadPage();
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      this.setState({
        showBad: true,
      });
      this.dismiss5Warning();
    }
  }
  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };
  changeReview = (text) => {
    this.setState({
      comment: text.target.value,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} className="pl-5">
            <h3>Review </h3>
          </Col>
          <Col xs={6}>
            <Row className="justify-content-end pr-5">
              <StarRatings
                className="float-right"
                rating={this.state.avgRating}
                starRatedColor="#FEBF00"
                starDimension="23px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col cs={12} className="pl-5">
            <button className="control-btn" onClick={this.toggleReviewModal}>
              Leave a review
            </button>
            {this.state.showGood ? (
              <Alert variant="success">Thanks for the review!</Alert>
            ) : null}
            {this.state.showBad ? (
              <Alert variant="danger">Must select a rating!</Alert>
            ) : null}

            {this.state.reviewDiv ? (
              <Container>
                <Form>
                  <Form.Group controlId="reviewText">
                    <Row className="align-items-center justify-content-center">
                      <Col xs={12}>
                        <StarRatings
                          className="ml-auto"
                          rating={this.state.rating}
                          changeRating={this.changeRating}
                          starRatedColor="#FEBF00"
                          starDimension="30px"
                          starSpacing="2px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Form.Control
                          as="textarea"
                          size="lg"
                          rows="5"
                          className="mt-3 mb-3"
                          onChange={this.changeReview}
                        />
                      </Col>
                    </Row>
                    <Row className="justify-content-end">
                      <Button
                        className="mr-3"
                        variant="primary"
                        onClick={() => this.sumbitReview()}
                      >
                        Submit
                      </Button>
                      <Button
                        className="mr-3"
                        variant="secondary"
                        onClick={this.toggleReviewModal}
                      >
                        Cancel
                      </Button>
                    </Row>
                  </Form.Group>
                </Form>
              </Container>
            ) : null}
          </Col>
        </Row>
        <Row className="overflow-auto">
          <Col xs={12}>
            <ListGroup className="borderless card-container" variant="flush">
              {this.renderReviewCardList()}
            </ListGroup>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs={6} className="pl-5 previous-btn">
            <div
              style={{
                visibility: this.state.currentPage > 1 ? "visible" : "hidden",
              }}
            >
              <ArrowLeft
                className="left-arrow"
                onClick={() => this.getReviewPage(this.state.currentPage - 1)}
              />
              <button
                className="control-btn"
                onClick={() => this.getReviewPage(this.state.currentPage - 1)}
              >
                Previous
              </button>
            </div>
          </Col>
          <Col xs={6} className="pr-5">
            <Row className="justify-content-end">
              <div
                style={{
                  visibility:
                    this.state.currentPage < this.state.maxPage
                      ? "visible"
                      : "hidden",
                }}
              >
                <ArrowRight
                  className="right-arrow"
                  onClick={() => this.getReviewPage(this.state.currentPage + 1)}
                />
                <button
                  className="control-btn"
                  onClick={() => this.getReviewPage(this.state.currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reviews;
