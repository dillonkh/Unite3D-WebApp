import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Page from './utilities/Page';
import UTextInput from './utilities/UTextInput';
import UButton from './utilities/UButton';

import './../style/LoginStyle.css';
import ULink from './utilities/ULink';
import {withRouter} from 'react-router-dom';

import {signIn} from '../Backend';
import {urls} from './Main';
import image from './../static/images/loginImage.png';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: '',
            password: '',
        };
    }

    hereLink = (<ULink to='/register'>here</ULink>);

    login = async () => {
        try {
            await signIn(this.state.email, this.state.password);
            this.props.history.push(urls.browsing); // this navigates to the browsing page. This works because we're using withRouter at the bottom of the page.
            this.props.updateNavButtons();
        } catch (err) {
            alert('Could not login. Please try again.');
        }
    };
    render() {
        return (
            <Page>
                <Row>
                    <Col lg={6} className='mt-5'>
                        <Row className='mb-3'>
                            <Col className='ml-auto' lg={9}>
                                <span className='welcome-title'>
                                    <strong>Welcome back to</strong> Unite3D
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
                                    onClick={() => {}}
                                    placeholder='Email'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.password}
                                    onChange={(e) => {
                                        this.setState({password: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    password
                                    placeholder='Password'
                                />
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='ml-auto pr-5' lg={9}>
                                <UButton onClick={() => this.login()}>Login</UButton>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto pr-5' lg={9}>
                                Need an account? Register&nbsp; {this.hereLink}
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6}>
                        <img className='material-design-people' alt='Material Design People' src={image} />
                    </Col>
                </Row>
            </Page>
        );
    }
}

export default withRouter(Login);
