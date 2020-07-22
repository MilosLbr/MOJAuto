﻿import React from 'react'
import { Component } from 'react';
import alertify from "alertifyjs";
import myAuthService from '../../services/myAuthService';



export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
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

        const loginStatus = await myAuthService.logIn(postData);

        if (!loginStatus.success) {
            alertify.error(loginStatus.text);

            document.getElementById("submitLoginButton").removeAttribute("disabled");
        } else {
            
            alertify.success("Uspešno!");
            this.props.changeStateAfterLogin(this.state.userName);
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="userName">Username:</label>
                    <input onChange={this.handleInputChange} value={this.state.userName} name="userName" type="text" className="form-control" id="userName"placeholder="Enter your username" required/>
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