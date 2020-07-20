import React from 'react'
import { Component } from 'react';

export class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerEmail: "",
            registerPassword: "",
            confirmPassword: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    };

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitForm(event) {
        event.preventDefault();
        if (this.state.confirmPassword !== this.state.registerPassword) {
            console.log("Passwords dont match")
            return;
        }
        console.log(this.state, 'to submit for register');
        let btn = document.getElementById("submitRegisterButton");
        btn.setAttribute("disabled", "true");
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="registerEmail">Email address:</label>
                    <input onChange={this.handleInputChange} value={this.state.registerEmail} name="registerEmail" type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword">Password:</label>
                    <input onChange={this.handleInputChange} value={this.state.registerPassword} name="registerPassword" type="password" className="form-control" id="registerPassword" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input onChange={this.handleInputChange} value={this.state.confirmPassword} name="confirmPassword" type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
                </div>
                <button id="submitRegisterButton" className="btn btn-primary">
                    Register
                </button>
            </form>
        );
    };
};