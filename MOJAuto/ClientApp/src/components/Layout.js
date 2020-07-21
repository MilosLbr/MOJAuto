import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

    render() {
        const { isAuthenticated, appUser } = this.props;

    return (
      <div>
        <NavMenu isAuthenticated={isAuthenticated} appUser={appUser}/>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
