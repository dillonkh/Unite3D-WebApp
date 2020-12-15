import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {useHistory} from 'react-router-dom';
import ULogo from './utilities/ULogo';
import './../style/UNavStyle.css';
import {urls} from './Main';

/**
 * Dynamic Header Component, with nav links changing depending on the route
 * The nav links are to be passed in via props defined below
 *
 * @required props
 *      navButtons: (Nav.Link || Nav.Dropdown)[] // React Bootstrap Components
 */
export default (props) => {
    let history = useHistory();

    const logoClicked = () => {
        // Only navigate if not already there
        if (localStorage.authToken) {
            history.push(urls.browsing);
        } else {
            history.push(urls.login);
        }
    };

    return (
        <Navbar className={'u-nav sticky-top px-5'}>
            <Navbar.Brand onClick={logoClicked}>
                <ULogo height={'70px'} long />
            </Navbar.Brand>
            <Nav className={'ml-auto'}>{props.navButtons}</Nav>
        </Navbar>
    );
};
