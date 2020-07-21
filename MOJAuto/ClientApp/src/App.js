import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import authService from './services/AuthorizeService';
import  myAuthService from './services/myAuthService';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';


import './css_styles/custom.css'


export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isAuthenticated: false,
            appUser: null
        }

        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.changeStateAfterLogin = this.changeStateAfterLogin.bind(this);
    }

    componentDidMount() {
        this.isUserLoggedIn();
    }

    isUserLoggedIn() {
        const isAuthenticated = myAuthService.isUserLoggedIn();
        const appUser = myAuthService.getUserName();
        this.setState({
            isAuthenticated,
            appUser
        });
    }

    changeStateAfterLogin(userName) {
        console.log("callling in app js with", userName);
        this.setState({
            appUser: userName,
            isAuthenticated: true
        })
    }



    render() {
        const { isAuthenticated, appUser } = this.state;


        return (
            <Layout isAuthenticated={isAuthenticated} appUser={appUser}>
                <Route exact path='/' render={(props) =>
                    <Home {...props}
                        isAuthenticated={isAuthenticated}
                        appUser={appUser}
                        changeStateAfterLogin={this.changeStateAfterLogin} />
                } />
                <Route path='/counter'
                    component={Counter} />

                <AuthorizeRoute path='/fetch-data'
                    component={FetchData} />

                <Route path={ApplicationPaths.ApiAuthorizationPrefix}
                    component={ApiAuthorizationRoutes} />

            </Layout>
        );
    }
}
