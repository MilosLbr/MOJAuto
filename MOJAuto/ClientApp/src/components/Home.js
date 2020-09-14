import React from 'react';
import { LoginForm } from './identityForms/LoginForm';
import { RegisterForm } from './identityForms/RegisterForm';
import { Tabs, Tab } from 'react-bootstrap';
import { UsersCars } from './UsersCars';

export const Home = ({ isAuthenticated, appUser,changeStateAfterLogin } ) => {
    
    let isUserAuthenticated = isAuthenticated;    

    return (
        <div>
            {!isUserAuthenticated &&
                <div>
                    <Tabs defaultActiveKey="login" id="authenticationTab">
                        <Tab className="p-2"  eventKey="login" title="Login">
                            <LoginForm changeStateAfterLogin={changeStateAfterLogin} />
                        </Tab>
                        <Tab className="p-2" eventKey="register" title="Register">
                            <RegisterForm changeStateAfterLogin={changeStateAfterLogin}/>
                        </Tab>
                    </Tabs>
                </div>
            }
            {isUserAuthenticated &&
                <div>
                    <h3 className="font-weight-normal mb-5">
                        Zdravo &nbsp;
                        <span className="font-weight-bold">{appUser}</span>
                    </h3>

                    <UsersCars/>
                </div>
            }
        </div>            
    );
}

