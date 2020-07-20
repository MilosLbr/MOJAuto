import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import authService from './services/AuthorizeService';
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
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.isUserAuthenticated();
    }

    async isUserAuthenticated() {
        const isauth = await authService.isAuthenticated();
        this.setState({
            isAuthenticated: isauth
        });
    }

    render() {
        const isAuthenticated = this.state.isAuthenticated;


        return (
            <Layout>
                <Route exact path='/' render={(props) =>
                    <Home {...props} isAuthenticated={isAuthenticated}/>
                } />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}
