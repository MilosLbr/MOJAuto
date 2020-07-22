import React from 'react';
import { Fragment } from 'react';
import { NavItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';

export const MyLoginMenu = ({ isAuthenticated,  logout })=> {

    if (isAuthenticated) {
        return (
            <Fragment>
                <NavItem>
                    <LogoutButton logout={logout}/>
                </NavItem>
            </Fragment>
        )
    } else {
        return null;
    }
    
}

const LogoutButton = withRouter((props) => {

    return (
        <button  
                className="btn btn-link nav-link"
                onClick={() => props.logout(props.history)}>
                Logout
            </button>
        )
    }
);