import React from 'react';
import Modal from 'react-bootstrap/Modal';
import UButton from '../utilities/UButton';
import {AiOutlineRightCircle, AiOutlineLeftCircle} from 'react-icons/ai';
import '../../style/Modal.css';
import classNames from 'classnames';
import axios from 'axios';

import {getMyOffers} from '../../Backend';

export default class ModalBids extends React.Component {
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

    hire = (vendorOfferID) => {
        this.props.handleClose();
        console.log('hiring person with vendorOffer: ', vendorOfferID);
        //MAKE API CALL TO HIRE THIS PERSON
        axios({
            method: 'post',
            url: 'http://localhost:8000/jobs/accept-offer',
            headers: {
                Authorization: 'Bearer ' + localStorage.authToken,
            },
            data: {
                vendor_offer: vendorOfferID,
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

    async gatherJsx() {
        let myJsx = [];
        let vendorOfferApiResult = await getMyOffers();
        vendorOfferApiResult.forEach((result) => {
            if (result.id === this.props.model.id) {
                result.vendor_offers.forEach((vendorOffer) => {
                    myJsx.push(
                        <section className='custom-modal-jsx-section' key={vendorOffer.id}>
                            <div className='modal-general-header'>
                                <span className='title'>
                                    {vendorOffer.vendor.first_name} {vendorOffer.vendor.last_name}
                                </span>
                                <span className='budget'>Offer: ${vendorOffer.bid}</span>
                            </div>
                            <div>
                                <div className='jobDetails'>Details</div>
                                <p className='detailsSection'>{vendorOffer.details}</p>
                            </div>
                            <div className='hire-button'>
                                <UButton onClick={() => this.hire(vendorOffer.id)}>Hire</UButton>
                            </div>
                        </section>,
                    );
                });
            }
        });

        this.setState({jsx: myJsx});
    }

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
                    <div className='close-button-wrapper'>
                        <UButton onClick={this.props.handleClose}>Close</UButton>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}
