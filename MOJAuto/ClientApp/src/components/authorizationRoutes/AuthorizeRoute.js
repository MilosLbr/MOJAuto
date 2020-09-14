import React from 'react'
import { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import alertify from 'alertifyjs';

export default class AuthorizeRoute extends Component {
    

    render() {
        const { isAuthenticated }  = this.props;
        
        const { component: Component, ...rest } = this.props;

        return <Route {...rest}
            render={(props) => {
                if (isAuthenticated) {
                    
                    return <Component {...props} />
                } else {
                    alertify.error("Morate biti ulogovani")
                    return <Redirect to="/" />
                }
            }} />
        
    }
}
