import React from 'react';
import Modal from 'react-bootstrap/Modal';
import UButton from '../utilities/UButton';
import {AiOutlineRightCircle, AiOutlineLeftCircle} from 'react-icons/ai';
import '../../style/Modal.css';
import classNames from 'classnames';

import axios from 'axios';

export default class ModalJobDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            show: props.show,
            printJobID: props.printJobID,
            jsxIndex: 0,
            jsx: [],
        };
    }

    gatherJsx = () => {
        let myJsx = [];
        let dimensions = `${this.props.model.print_dimension_x} x ${this.props.model.print_dimension_y} x ${this.props.model.print_dimension_z} ${this.props.model.dimension_unit}`;
        myJsx.push(
            <section className='custom-modal-jsx-section'>
                <div className='modal-general-header'>
                    <span className='title'>{this.props.model.name}</span>
                    <span className='budget'>Budget: ${this.props.model.budget}</span>
                </div>
                <div className='modal-general-details'>
                    <h4 className='jobDetails'>Job Details</h4>
                    <div className='detailGrid'>
                        <div className='subtitle filament'>Filament</div>
                        <div className='filament-details'>{this.props.model.filament}</div>
                        <div className='subtitle fill-model'>Fill</div>
                        <div className='fill-details'>{this.props.model.fill}%</div>
                        <div className='subtitle dimension'>Dimensions</div>
                        <div className='dim-details'>{dimensions}</div>
                    </div>
                    {this.downloadButton()}
                </div>
                <div>
                    <div className='jobDetails'>Details</div>
                    <p className='detailsSection'>{this.props.model.details}</p>
                </div>
            </section>,
        );
        this.props.model.additional_images.forEach((image) => {
            myJsx.push(
                <section className='custom-modal-jsx-section'>
                    <img className='image' alt='' src={image.image} />
                </section>,
            );
        });
        this.setState({jsx: myJsx});
    };

    componentDidUpdate = (prevProps) => {
        //prevProps is the previous props of the component before being updated
        //so, if this.props != prevProps it means that component props have been updated
        if (this.props.show && !prevProps.show) {
            this.setState({show: this.props.show});
        }
    };

    componentDidMount = () => {
        this.gatherJsx();
        //make an API call here with the printJobID to get the appropriate job detail data
    };

    decrementJsxIndex = () => {
        this.setState((prevState) => ({
            jsxIndex: prevState.jsxIndex - 1,
        }));
    };

    incrementJsxIndex = () => {
        this.setState((prevState) => ({
            jsxIndex: prevState.jsxIndex + 1,
        }));
    };

    downloadButton = () => {
        if (this.props.downloadButton) {
            return (
                <div className='download-button-wrapper'>
                    <UButton size='sm' onClick={this.downloadFile}>
                        Download File
                    </UButton>
                </div>
            );
        } else {
            return <></>;
        }
    };

    markComplete = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/jobs/completed',
            data: {
                print_job: this.props.model.id,
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.authToken,
            },
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
    };

    completeButton = () => {
        if (!this.props.model.completed && this.props.downloadButton) {
            return (
                <div className='complete-button-wrapper'>
                    <UButton variant='primary-outline' onClick={this.markComplete}>
                        Mark Complete
                    </UButton>
                </div>
            );
        } else {
            return <></>;
        }
    };

    downloadFile = () => {
        window.open(this.props.model.model, '_blank');
    };

    render() {
        return (
            <Modal show={this.props.show} className='modal'>
                <Modal.Header onClick={this.props.handleClose} closeButton>
                    <Modal.Title>Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section className='modal-general-section'>
                        <span
                            className={classNames('modal-general-left-right', {
                                invisible: this.state.jsxIndex === 0,
                            })}
                            onClick={this.decrementJsxIndex}>
                            <AiOutlineLeftCircle className='modal-general-next-buttons' />
                        </span>
                        {this.state.jsx[this.state.jsxIndex]}
                        <span
                            className={classNames('modal-general-left-right', {
                                invisible: this.state.jsxIndex === this.state.jsx.length - 1,
                            })}
                            onClick={this.incrementJsxIndex}>
                            <AiOutlineRightCircle className='modal-general-next-buttons' />
                        </span>
                    </section>
                </Modal.Body>
                <Modal.Footer>
                    {this.completeButton()}
                    <div className='close-button-wrapper'>
                        <UButton onClick={this.props.handleClose}>Close</UButton>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}
