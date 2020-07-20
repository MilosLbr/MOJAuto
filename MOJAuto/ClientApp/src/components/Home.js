import React from 'react';
import { LoginForm } from './identityForms/LoginForm';
import { RegisterForm } from './identityForms/RegisterForm';
import { Tabs, Tab } from 'react-bootstrap';

export const Home = ({ isAuthenticated } ) => {
    let displayName = Home.name;
    let isUserAuthenticated = isAuthenticated;
    let forms;

    if (!isUserAuthenticated) {
        forms = <LoginForm />;
    }

    return (
        <div>
            {!isUserAuthenticated &&
                <div>
                    <Tabs defaultActiveKey="login" id="authenticationTab">
                        <Tab className="p-2"  eventKey="login" title="Login">
                            <LoginForm />
                        </Tab>
                        <Tab className="p-2" eventKey="register" title="Register">
                            <RegisterForm />
                        </Tab>
                    </Tabs>
                </div>
            }
        </div>            
    );
}
