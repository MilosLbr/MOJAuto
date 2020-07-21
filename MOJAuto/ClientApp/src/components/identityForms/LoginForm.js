import React from 'react'
import { Component } from 'react';
import alertify from "alertifyjs";
import authService from '../api-authorization/AuthorizeService';
import { UserManager } from 'oidc-client';
import myAuthService from '../../services/myAuthService';



export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.sendPostRequest = this.sendPostRequest.bind(this);
    };


    handleInputChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm(event) {
        event.preventDefault();
        
        this.setState({
            isSubmitDisabled: true
        })

        this.sendPostRequest();
    }

    async sendPostRequest() {       
        document.getElementById("submitLoginButton").setAttribute("disabled", true);
        let postData = Object.assign({}, this.state);

        const response = await myAuthService.logIn(postData);
        console.log(response);
        if (!response.ok) {
            response.text().then(text => {
                alertify.error(text);
            });

            document.getElementById("submitLoginButton").removeAttribute("disabled");
        } else {
            let jsonResponse = await response.json();
            let token = jsonResponse.token;

            sessionStorage.setItem("token", token);
            alertify.success("Loged in");
            this.props.changeStateAfterLogin(this.state.email);
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
                <button id="submitLoginButton" className="btn btn-primary" >
                    Login
                </button>
            </form>
        );
    };
};