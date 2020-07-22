import React from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ApplicationPaths, QueryParameterNames } from '../api-authorization/ApiAuthorizationConstants'
import authService from '../../services/AuthorizeService'
import myAuthService from '../../services/myAuthService';
import alertify from 'alertifyjs';

export default class AuthorizeRoute extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isAuthenticated } = this.props;

        const { component: Component, ...rest } = this.props;
        console.log(this.props, ' props passed') 
        return <Route {...rest}
            render={(props) => {
                if (isAuthenticated) {
                    
                    return <Component {...props} />
                } else {
                    { alertify.error("Morate biti ulogovani")}
                    return <Redirect to="/" />
                }
            }} />
        
    }
}
