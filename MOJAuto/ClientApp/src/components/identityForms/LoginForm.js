import React from 'react'
import { Component } from 'react';
import alertify from "alertifyjs";
import authService from '../api-authorization/AuthorizeService';
import { UserManager } from 'oidc-client';



export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isSubmitDisabled: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.sendPostRequest = this.sendPostRequest.bind(this);
    };

    componentDidMount() {
        
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm(event) {
        event.preventDefault();
        
        console.log(this.state, 'to submit for login');
        this.setState({
            isSubmitDisabled: true
        })
        this.sendPostRequest();
    }

    async sendPostRequest() {

        

        let postData = Object.assign({}, this.state);

        const response = await fetch("/api/auth", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        console.log(response);
        if (!response.ok) {
            response.text().then(text => {
                console.log('should alert, ', alertify);
                alertify.error(text);
                this.setState({
                    isSubmitDisabled: false
                })
            });
        } else {
           alertify.success("Loged in")
        }
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
                <button id="submitLoginButton" className="btn btn-primary" disabled={this.state.isSubmitDisabled}>
                    Login
                </button>
            </form>
        );
    };
};