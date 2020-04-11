import React, { Component } from "react";
import queryString from "query-string";

import LoginBox from "./loginbox";
import RegisterBox from "./registerbox";
import Nav from "../header/navigation";

import "./authentication.css";

class Authentication extends Component {
	constructor(props) {
		super(props);
		let search = this.props.location.search;
		let params = queryString.parse(search);
		if (params.q === "signup") {
			this.state = { isLoginOpen: false, isRegisterOpen: true };
		} else {
			this.state = { isLoginOpen: true, isRegisterOpen: false };
		}
	}

	showLoginBox() {
		this.setState({ isRegisterOpen: false, isLoginOpen: true });
	}

	showRegisterBox() {
		this.setState({ isRegisterOpen: true, isLoginOpen: false });
	}

	render() {
		return (
			<>
				<Nav />
				<div className="root-container">
					<div className="box-controller">
						<div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
							Login
			  		</div>
						<div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
							Sign Up
			  		</div>
					</div>
					<div className="box-container">
						{this.state.isLoginOpen && <LoginBox />}
						{this.state.isRegisterOpen && <RegisterBox />}
					</div>
				</div>
			</>
		);
	}
}

export default Authentication;