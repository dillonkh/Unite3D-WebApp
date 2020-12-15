import React, {useState, useEffect} from 'react';
import uuid4 from 'uuid';
import Nav from 'react-bootstrap/Nav';
import UHeader from './UHeader';
import Footer from './Footer';
import Home from './Home';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import UIElements from './UIElements';
import LogIn from './LogIn';
import CreateAccount from './CreateAccount';
import BrowsingManger from './BrowsingManager';
import CreateJob from './CreateJob';
import ULink from './utilities/ULink';
import NotFound from './NotFound';
import UButton from './utilities/UButton';

export const urls = {
    home: '/',
    register: '/register',
    login: '/login',
    createJob: '/create-job',
    ui: '/ui',
    browsing: '/browsing',
};

export default () => {
    let history = useHistory();
    let location = useLocation();

    const signUpClick = () => {
        // Only navigate if not already there
        if (location.pathname !== urls.register) {
            history.push(urls.register);
        }
    };

    const [navButtons, setNavButtons] = useState([]);

    const updateNavButtons = () => {
        if (localStorage.user && !JSON.parse(localStorage.user).is_vendor) {
            setNavButtons([
                <Nav.Link
                    as={() => (
                        <ULink style={{whiteSpace: 'nowrap'}} to={urls.createJob} isNavLink={true}>
                            New Model
                        </ULink>
                    )}
                    key={uuid4()}
                />,
                <Nav.Link
                    as={() => (
                        <ULink to={urls.login} isNavLink={true}>
                            Login
                        </ULink>
                    )}
                    key={uuid4()}
                />,
                <Nav.Link
                    as={() => (
                        <UButton onClick={signUpClick} variant={'primary'} pill>
                            Sign Up
                        </UButton>
                    )}
                    key={uuid4()}
                    isNavLink={true}
                />,
            ]);
        } else {
            setNavButtons([
                <Nav.Link
                    as={() => (
                        <ULink to={urls.login} isNavLink={true}>
                            Login
                        </ULink>
                    )}
                    key={uuid4()}
                />,
                <Nav.Link
                    as={() => (
                        <UButton onClick={signUpClick} variant={'primary'} pill>
                            Sign Up
                        </UButton>
                    )}
                    key={uuid4()}
                    isNavLink={true}
                />,
            ]);
        }
    };

    useEffect(() => {
        if (navButtons.length === 0) {
            updateNavButtons();
        }
    });

    return (
        <div style={{backgroundColor: '#f8f9fa'}}>
            <UHeader navButtons={navButtons} />
            <Switch>
                <Route exact path={urls.home}>
                    <Home />
                </Route>
                <Route exact path={urls.register}>
                    <CreateAccount updateNavButtons={updateNavButtons} />
                </Route>
                <Route exact path={urls.ui}>
                    <UIElements />
                </Route>
                <Route exact path={urls.login}>
                    <LogIn updateNavButtons={updateNavButtons} />
                </Route>
                <Route exact path={urls.createJob}>
                    <CreateJob />
                </Route>
                <Route exact path={urls.browsing}>
                    <BrowsingManger />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            <Footer />
        </div>
    );
};
