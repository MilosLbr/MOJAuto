import React from 'react'
import { Component } from 'react';
import alertify from 'alertifyjs';
import myAuthService from '../../services/myAuthService';


export class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            password: "",
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

    async submitForm(event) {
        event.preventDefault();
        if (this.state.confirmPassword !== this.state.password) {
            alertify.error("Lozinka i potvrđena lozinka se ne slažu!")
            return;
        }

        document.getElementById("submitRegisterButton").setAttribute("disabled", "true");

        let postData = Object.assign({}, this.state);
        const response = await myAuthService.register(postData);

        if (!response.ok) {
            response.text().then(text => {
                let errorObj = JSON.parse(text);
                alertify.error(errorObj[0].description);
            });

            document.getElementById("submitRegisterButton").removeAttribute("disabled");
        } else {
            alertify.success("Registracija uspešna!");

            let loginRes = await myAuthService.logIn({ "userName": postData.userName, "password": postData.password });

            if (loginRes) {
                this.props.changeStateAfterLogin(this.state.userName);
            } else {
                alertify.error("Greška prilokom logovanja!");
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <div className="form-group">
                    <label htmlFor="registerUserName">Username:</label>
                    <input onChange={this.handleInputChange} value={this.state.userName} name="userName" type="text" className="form-control" id="registerUserName"  placeholder="Enter a unique username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="registerPassword">Password:</label>
                    <input onChange={this.handleInputChange} value={this.state.password} name="password" type="password" className="form-control" id="registerPassword" placeholder="Password" />
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