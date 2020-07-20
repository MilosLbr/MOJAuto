import React from 'react'
import { Component } from 'react';

export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    };

    handleInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm(event) {
        event.preventDefault();
        console.log(this.state, 'to submit for login');
        let btn = document.getElementById("submitLoginButton");
        btn.setAttribute("disabled", "true");
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input onChange={this.handleInputChange} value={this.state.email} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleInputChange} value={this.state.password} name="password" type="password" className="form-control" id="password" placeholder="Password"/>
                </div>
                <button id="submitLoginButton" className="btn btn-primary">
                    Login
                </button>
            </form>
        );
    };
};