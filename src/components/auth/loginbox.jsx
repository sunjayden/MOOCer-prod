import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { config } from '../../config';
import {
	setInStorage
} from "../utils/storage";

class LoginBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: [],
			loginError: ""
		};
	}

	showValidationErr(elm, msg) {
		this.setState((prevState) => ({
			errors: [
				...prevState.errors, {
					elm,
					msg
				}
			]
		}));
	}

	clearValidationErr(elm) {
		this.setState((prevState) => {
			let newArr = [];
			for (let err of prevState.errors) {
				if (elm !== err.elm) {
					newArr.push(err);
				}
			}
			return { errors: newArr };
		});
	}

	onEmailChange(e) {
		this.setState({ email: e.target.value });
		this.clearValidationErr("email");
	}

	onPasswordChange(e) {
		this.setState({ password: e.target.value });
		this.clearValidationErr("password");
	}

	emailIsValid(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	submitLogin(e) {
		const { email, password } = this.state;

		if (email === "") {
			this.showValidationErr("email", "Email cannot be empty!");
		}

		if (!this.emailIsValid(email)) {
			this.showValidationErr("email", "Email must be a valid email!");
		}

		if (password === "") {
			this.showValidationErr("password", "Password cannot be empty!");
		}

		if (email && password) {
			fetch(config.API_URL + "/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}).then(res => res.json())
				.then(json => {
					if (json.success) {
						setInStorage("moocer", { token: json.token })
						this.props.history.push("/catalog");
					} else {
						this.setState({ loginError: json.message });
					}
					console.log(json.message)
				})
		}
	}

	render() {
		let passwordErr = null,
			emailErr = null;

		for (let err of this.state.errors) {
			if (err.elm === "password") {
				passwordErr = err.msg;
			}
			if (err.elm === "email") {
				emailErr = err.msg;
			}
		}

		return (
			<div className="inner-container">
				<div className="header">
					Login
		  		</div>
				<div className="box">

					<div className="input-group">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							className="login-input"
							placeholder="Email"
							onChange={this
								.onEmailChange
								.bind(this)} />
						<small className="danger-error">{emailErr
							? emailErr
							: ""}</small>
					</div>

					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							className="login-input"
							placeholder="Password"
							onChange={this
								.onPasswordChange
								.bind(this)} />
						<small className="danger-error">{passwordErr
							? passwordErr
							: ""}</small>
					</div>

					<small className="danger-error">{this.state.loginError}</small>

					<button
						type="button"
						className="login-btn"
						onClick={this
							.submitLogin
							.bind(this)}>Login</button>
				</div>
			</div>
		);
	}
}

export default withRouter(LoginBox);