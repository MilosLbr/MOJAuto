import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';


export const MyLoginMenu = ({ isAuthenticated, appUser })=> {
    const profilePath = "/authentication/profile";

    if (isAuthenticated) {
        return (
            <Fragment>
                <NavItem>
                    <NavLink tag={Link} className="" to={profilePath}>Hello {appUser}</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="" to='/' >Logout</NavLink>
                </NavItem>
            </Fragment>
        )
    } else {
        return null;
    }
    
}