import React from 'react';
// import {useState} from 'react';

// NOTE: Modal is throwing a warining ->
//      "Warning: findDOMNode is deprecated in StrictMode.
//      findDOMNode was passed an instance of Transition which is inside StrictMode.
//      Instead, add a ref directly to the element you want to reference.
//      Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node"
// I've looked into it and it seems that it is an actual issue with the way that Modal is implemented
// under the hood. They are currently working on fixing it.
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UTextInput from './UTextInput';
import UButton from './UButton';
import USelectDropdown from './USelectDropdown';
/**
 * Select Dropdowns will fill the width of their container
 *
 * @required props:
 *  xDim                // state variable passed in for the x dimension
 *  yDim                // state variable passed in for the y dimension
 *  zDim                // state variable passed in for the z dimension
 *  selectedUnits       // state variable passed in for the units selected
 *  setXDim             // function that sets the state variable xDim
 *  setYDim             // function that sets the state variable yDim
 *  setZDim             // function that sets the state variable zDim
 *  setSelectedUnits    // function that sets the state variable selectedUnits
 *  show                // state variable passed in to indicate whether to show of hide modal
 *  handleClose         // function that sets the state variable show
 *
 * @optional props:
 *
 */

export default (props) => {
    const units = ['in', 'mm', 'cm'];

    let changeSelectedUnits = (e) => {
        props.setSelectedUnits(units[e.target.value - 1]);
    };

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Dimensions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='mx-1'>
                    <Col>
                        <Row>
                            <UTextInput
                                number
                                placeholder='1.5'
                                className='my-0'
                                value={props.xDim}
                                onChange={(e) => {
                                    props.setXDim(e.target.value);
                                }}
                                onClick={() => {}}
                            />
                        </Row>
                        <Row>
                            <Col>
                                <span className='sub-label'>x-axis</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='px-0 vertical-center'>
                        <span className='horizontal-center'>X</span>
                    </Col>
                    <Col>
                        <Row>
                            <UTextInput
                                number
                                placeholder='2.0'
                                value={props.yDim}
                                onChange={(e) => {
                                    props.setYDim(e.target.value);
                                }}
                                onClick={() => {}}
                            />
                        </Row>
                        <Row className='sub-label'>
                            <Col>
                                <span className='sub-label'>y-axis</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='px-0 vertical-center'>
                        <span className='horizontal-center'>X</span>
                    </Col>
                    <Col>
                        <Row>
                            <UTextInput
                                number
                                placeholder='2.5'
                                value={props.zDim}
                                onChange={(e) => {
                                    props.setZDim(e.target.value);
                                }}
                                onClick={() => {}}
                            />
                        </Row>
                        <Row className='sub-label'>
                            <Col>
                                <span className='sub-label'>z-axis</span>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={'3'}>
                        <USelectDropdown
                            onChange={(e) => changeSelectedUnits(e)}
                            value={props.selectedUnits}
                            placeholder='Units'
                            options={units}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <UButton onClick={props.handleClose}>Set Dimensions</UButton>
            </Modal.Footer>
        </Modal>
    );
};
