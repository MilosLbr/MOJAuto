import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import '../css_styles/NavMenu.css';
import { MyLoginMenu } from './authorizationRoutes/MyLoginMenu';
import myAuthService from '../services/myAuthService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
    }

    componentDidMount() {
        let isLoggedIn = myAuthService.isUserLoggedIn();

        this.setState({
            isLoggedIn
        })
    }



    toggleNavbar () {
    this.setState({
        collapsed: !this.state.collapsed
    });
    }

    render() {
        const { isAuthenticated , appUser, logout } = this.props;

        return (
            <header>
                <Navbar className="navbar navbar-dark bg-dark navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                <Container>
                <NavbarBrand tag={Link} to="/">MOJAuto</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="" to="/counter">Counter</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="" to="/fetch-data">Fetch data</NavLink>
                    </NavItem>
                    <MyLoginMenu logout={logout} isAuthenticated={isAuthenticated} appUser={appUser}/>
                    </ul>
                </Collapse>
                </Container>
            </Navbar>
            </header>
        );
    }
}
