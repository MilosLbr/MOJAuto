import React from 'react';
import { LoginForm } from './identityForms/LoginForm';
import { RegisterForm } from './identityForms/RegisterForm';
import { Tabs, Tab } from 'react-bootstrap';

export const Home = ({ isAuthenticated, appUser,changeStateAfterLogin } ) => {
    
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
                        <LoginForm changeStateAfterLogin={changeStateAfterLogin} />
                        </Tab>
                        <Tab className="p-2" eventKey="register" title="Register">
                            <RegisterForm />
                        </Tab>
                    </Tabs>
                </div>
            }
            {isUserAuthenticated &&
                <div>
                    <h3 className="font-weight-normal">
                        Welcome &nbsp;  
                        <span className="font-weight-bold">{appUser}</span>
                    </h3>
                </div>
            }
        </div>            
    );
}
