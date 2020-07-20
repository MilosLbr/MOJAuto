import React, { Component } from 'react';
import authService from '../services/AuthorizeService';
import { LoginForm } from './identityForms/LoginForm';

export const Home = ({ isAuthenticated } ) => {
    let displayName = Home.name;
    let isUserAuthenticated = isAuthenticated;
    let form;
    console.log(isAuthenticated);

    form = !isUserAuthenticated ? <LoginForm/> : "register form"

    return (
        <div>
            {form}
        </div>            
    );
}
