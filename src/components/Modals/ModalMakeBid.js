import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {AiOutlineRightCircle, AiOutlineLeftCircle} from 'react-icons/ai';
import '../../style/Modal.css';
import classNames from 'classnames';
import {makeBid} from '../../Backend';
import UTextArea from '../../components/utilities/UTextArea';

export default class ModalMakeBid extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            show: props.show,
            printJobID: props.printJobID,
            jsxIndex: 0,
            jsx: [],
            offer: 0,
            details: '',
        };
    }

    handleChange = (event) => {
        this.setState({offer: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        makeBid(this.state.offer, this.state.printJobID, this.state.details);
        this.props.handleClose();
    };

    // This function will call our api that returns the details, the primary image, and then an array of images.
    gatherJsx = () => {
        let myJsx = [];
        let dimensions = `DIM: ${this.props.model.print_dimension_x} x ${this.props.model.print_dimension_y} x ${this.props.model.print_dimension_z} ${this.props.model.dimension_unit}`;
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
                    <form className='bid-form' onSubmit={this.handleSubmit}>
                        <UTextArea
                            value={this.state.details}
                            onChange={(e) => {
                                this.setState({details: e.target.value});
                            }}
                            placeholder='Details'></UTextArea>
                        <label className='make-offer-text'>
                            Make an offer: $
                            <input type='number' value={this.state.offer} onChange={this.handleChange} />
                        </label>

                        <button className='form-submit-bid' type='submit'>
                            Make Offer
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}
