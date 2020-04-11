import React, { Component } from "react";
import { Container, Row, Col, Card, } from "react-bootstrap";

import { VerifyToken, GetToken } from "../utils/auth"
import { config } from '../../config';
import Nav from "../header/navigation";

import "./classroom.css";

class Classroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: "",
			inprogress: [],
			completed: []
		}
	}

	componentDidMount() {
		if (!VerifyToken()) {
			return this.props.history.push("/");
		}
		const token = GetToken().token;
		fetch(config.API_URL + `/api/user/profile`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: token,
			}
		}).then((res) => res.json())
			.then((data) => {
				if (data.profile) {
					this.setState({
						inprogress: data.profile.in_progress,
						completed: data.profile.courses
					})
				}
			});
	}

	renderCard(data) {
		return data.map((course, index) => {
			return (
				<Card style={{ width: '15rem' }} key={index}>
					<Card.Img variant="top" src={course.image} />
					<Card.Body>
						<Card.Link href={"/course/" + course._id}>{course.title}</Card.Link>
						<Card.Text>{course.shortSummary}</Card.Text>
						{/* <Button variant="primary">Go To Course</Button> */}
					</Card.Body>
				</Card>
			);
		});
	}

	render() {
		return (
			<>
				<Nav />
				<Container className="class-container">
					<Row>
						<Col>
							<h3 className="title">{this.state.inprogress.length === 0 ? "No Course in progress" : "Current Course Enrollments"}</h3>
							<div className="d-flex flex-row flex-wrap">
								{this.renderCard(this.state.inprogress)}
							</div>

							<h3 className="title">{this.state.completed.length === 0 ? "No course completed" : "Graduated"}</h3>
							<div className="d-flex flex-row flex-wrap">
								{this.renderCard(this.state.completed)}
							</div>
						</Col>
					</Row>
				</Container>

			</>
		);
	}
}

export default Classroom;
