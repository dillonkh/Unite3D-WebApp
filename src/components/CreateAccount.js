import React from 'react';
import {register, registerPrinter} from '../Backend';
import {withRouter} from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Page from './utilities/Page';
import UTextInput from './utilities/UTextInput';
import UButton from './utilities/UButton';

import './../style/LoginStyle.css';
import ULink from './utilities/ULink';
import MultiSelect from 'react-multi-select-component'; // https://www.npmjs.com/package/react-multi-select-component

import config from './../static/config';
import image from './../static/images/loginImage.png';
import UDimensionsModal from './utilities/UDimensionsModal';
import {urls} from './Main';

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            is_vendor: false,
            token: '',
            selectedFilaments: [],
            printerMake: '',
            printerModel: '',

            show: false,
            dimensions: '',
            xDim: '',
            yDim: '',
            zDim: '',
            selectedUnits: '',

            user: {},
        };
    }

    terms = (<ULink to='/terms-of-service'>Terms of Service</ULink>);

    async signUp() {
        try {
            //prettier-ignore
            await register( this.state.email, this.state.password, this.state.firstName, this.state.lastName, this.state.isVendor);
            if (this.state.isVendor) {
                let filaments = '';
                this.state.selectedFilaments.forEach((filament) => {
                    filaments += `${filament.value} `;
                });
                //prettier-ignore
                await registerPrinter(this.state.printerMake, this.state.printerModel, filaments, 
                    this.state.xDim, this.state.yDim, this.state.zDim, this.state.selectedUnits,);
            }
            this.props.history.push(urls.browsing); // this navigates to the browsing page. This works because we're using withRouter at the bottom of the page.
            this.props.updateNavButtons();
        } catch (err) {
            alert(err);
        }
    }

    materials = config.materials;
    options() {
        let op = [];
        for (let i = 0; i < this.materials.length - 1; i++) {
            op.push({label: this.materials[i], value: this.materials[i]});
        }
        return op;
    }

    getPrinterRegistrationForm() {
        if (this.state.isVendor) {
            return (
                <Row width='100%' className='mx-0 mb-3 width-100'>
                    <Col>
                        <span className='register-printer-title'>Register Printer</span>
                        <UTextInput
                            value={this.state.printerMake}
                            onChange={(e) => this.setState({printerMake: e.target.value})}
                            onClick={() => {}}
                            placeholder='Make'
                        />
                        <UTextInput
                            value={this.state.printerModel}
                            onChange={(e) => this.setState({printerModel: e.target.value})}
                            onClick={() => {}}
                            placeholder='Model'
                        />
                        <UTextInput
                            value={this.state.dimensions}
                            onChange={() => {}}
                            onClick={() => this.handleShow()}
                            onFocus={() => this.handleShow()}
                            placeholder='Build Size'></UTextInput>
                        <label /> Supported Filament
                        <MultiSelect
                            options={this.options()}
                            value={this.state.selectedFilaments}
                            onChange={(value) => this.setState({selectedFilaments: value})}
                            labelledBy={'Supported Filament'}
                        />
                    </Col>
                </Row>
            );
        } else {
            return <></>;
        }
    }

    // Modal stuff

    handleShow = () => {
        this.setState({show: true});
        document.activeElement.blur();
    };
    changeDimensions() {
        if (this.state.xDim && this.state.yDim && this.state.zDim && this.state.selectedUnits) {
            this.setState({
                dimensions:
                    this.state.xDim +
                    this.state.selectedUnits +
                    ' x ' +
                    this.state.yDim +
                    this.state.selectedUnits +
                    ' x ' +
                    this.state.zDim +
                    this.state.selectedUnits,
            });
        }
    }
    render() {
        return (
            <Page>
                <Row>
                    <Col lg={6} className='mt-5'>
                        <Row className='mb-3'>
                            <Col className='ml-auto' lg={9}>
                                <span className='welcome-title'>
                                    <strong>Sign Up</strong> Unite3D
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.firstName}
                                    onChange={(e) => {
                                        this.setState({firstName: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    placeholder='First Name'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.lastName}
                                    onChange={(e) => {
                                        this.setState({lastName: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    placeholder='Last Name'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.email}
                                    onChange={(e) => {
                                        this.setState({email: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    placeholder='Email'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.password}
                                    password
                                    onChange={(e) => {
                                        this.setState({password: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    placeholder='Password'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <UTextInput
                                    value={this.state.confirmPassword}
                                    password
                                    onChange={(e) => {
                                        this.setState({confirmPassword: e.target.value});
                                    }}
                                    onClick={() => {}}
                                    placeholder='Confirm Password'
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='ml-auto mb-3 pr-5' lg={9}>
                                <Row className='modeler-vendor-area mx-1'>
                                    <Row className='mx-0 my-3 width-100'>
                                        <Col className=''>
                                            <span className=''>What is your purpose in signing up? </span>
                                            <br />
                                            <span>
                                                Print my model <strong>(Modeler)</strong>{' '}
                                                <input
                                                    onChange={() => this.setState({isVendor: false})}
                                                    type='radio'
                                                    name='purpose'
                                                />
                                            </span>
                                            <br />
                                            <span>
                                                Print other people's models <strong>(Vendor)</strong>{' '}
                                                <input
                                                    onChange={() => this.setState({isVendor: true})}
                                                    type='radio'
                                                    name='purpose'
                                                />
                                            </span>
                                        </Col>
                                    </Row>
                                    {this.getPrinterRegistrationForm()}
                                    <UDimensionsModal
                                        xDim={this.state.xDim}
                                        setXDim={(value) => this.setState({xDim: value})}
                                        yDim={this.state.yDim}
                                        setYDim={(value) => this.setState({yDim: value})}
                                        zDim={this.state.zDim}
                                        setZDim={(value) => this.setState({zDim: value})}
                                        selectedUnits={this.state.selectedUnits}
                                        setSelectedUnits={(value) => this.setState({selectedUnits: value})}
                                        show={this.state.show}
                                        handleClose={() => {
                                            this.setState({show: false});
                                            this.changeDimensions();
                                        }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='ml-auto pr-5' lg={9}>
                                <input name='agree' type='checkbox' />
                                <span> Agree to&nbsp;{this.terms}</span>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='ml-auto pr-5' lg={9}>
                                <UButton onClick={() => this.signUp()}>Sign Up</UButton>
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
export default withRouter(CreateAccount);
