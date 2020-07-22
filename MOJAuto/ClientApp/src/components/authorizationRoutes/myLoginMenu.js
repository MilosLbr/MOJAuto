import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

export const MyLoginMenu = ({ isAuthenticated, appUser, logout })=> {
    const profilePath = "/authentication/profile";

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
            <a
                className="nav-link"
                onClick={() => props.logout(props.history)}>
                Logout
            </a>
        )
    }
);