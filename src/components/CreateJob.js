import React from 'react';
import {useState} from 'react';
import axios from 'axios';

import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Page from './utilities/Page';
import UTextInput from './utilities/UTextInput';
import USelectDropdown from './utilities/USelectDropdown';
import UButton from './utilities/UButton';
import UTextArea from './utilities/UTextArea';

import ImageUpload from './ImageUpload';
import uploadFile from './utilities/S3Uploader';

import './../style/CreateJobStyle.css';
import config from './../static/config';
import UDimensionsModal from './utilities/UDimensionsModal';

export default () => {
    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [modelFile, setModelFile] = useState({});
    const [fill, setFill] = useState('');
    const [filament, setFilament] = useState('');
    const [modelName, setModelName] = useState('');
    const [budget, setBudget] = useState('');
    const [details, setDetails] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [percentage, setPercentage] = useState(0);
    const [showToast, setShowToast] = useState(false);

    const materials = config.materials;

    let getImages = (e) => {
        if (e) {
            let list = [];
            let files = e.target.files;
            setImageFiles(e.target.files);
            for (let i = 0; i < files.length; i++) {
                let url = URL.createObjectURL(files[i]);
                list.push(url);
            }
            setImages(list);
            if (list.length > 5) {
                setShowToast(true);
            }
        }
    };

    const progress = (loaded, total) => {
        setPercentage((loaded / total) * 100);
    };

    const createJob = () => {
        let s3ImageURLs = [];
        for (let i = 0; i < imageFiles.length - 1; i++) {
            s3ImageURLs.push(uploadFile(imageFiles[i], true, progress));
        }
        let s3ModelURL = uploadFile(modelFile, false, progress);

        let job = {
            additional_images: s3ImageURLs,
            budget: parseInt(budget),
            completed: false,
            details: details,
            filament: filament,
            fill: parseInt(fill),
            name: modelName,
            model: s3ModelURL,
            primary_image: s3ImageURLs[0],
            print_dimension_x: parseInt(xDim),
            print_dimension_y: parseInt(yDim),
            print_dimension_z: parseInt(zDim),
            dimension_unit: selectedUnits,
            street_address: streetAddress,
            city: city,
            state: state,
            zip_code: zip,
        };
        axios({
            method: 'post',
            url: 'http://localhost:8000/jobs/list',
            data: job,
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

    // Modal stuff
    const [show, setShow] = useState(false);
    const [dimensions, setDimensions] = useState('');
    const [xDim, setXDim] = useState('');
    const [yDim, setYDim] = useState('');
    const [zDim, setZDim] = useState('');
    const [selectedUnits, setSelectedUnits] = useState('');

    const handleShow = () => {
        setShow(true);
        document.activeElement.blur();
    };
    let changeDimensions = () => {
        if (xDim && yDim && zDim && selectedUnits) {
            setDimensions(xDim + selectedUnits + ' x ' + yDim + selectedUnits + ' x ' + zDim + selectedUnits);
        }
    };

    return (
        <Page>
            <div className='toast-container'>
                <Toast show={showToast} onClose={() => setShowToast(false)} className='toast'>
                    <Toast.Header>
                        <strong className='mr-auto'>Alert!</strong>
                    </Toast.Header>
                    <Toast.Body>Only five (5) images may be uploaded</Toast.Body>
                </Toast>
            </div>
            <Row>
                <Col className='mx-auto' lg={5}>
                    <Row className='mb-3'>
                        <UTextInput
                            value={modelName}
                            onChange={(e) => {
                                setModelName(e.target.value);
                            }}
                            onClick={() => {}}
                            placeholder='Model Name'></UTextInput>
                    </Row>
                    <Row>
                        <div className='mb-3'>
                            <div>
                                <span>3D Model File</span>
                            </div>
                            <input
                                type='file'
                                accept='.DAE, .OBJ, .STL, .X3D, .X3DB, .X3DV, .WRL, .3MF'
                                onChange={(e) => setModelFile(e.target.files[0])}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div className='mb-3 width-100'>
                            <UTextInput
                                prepend='$'
                                number
                                value={budget}
                                onChange={(e) => {
                                    setBudget(e.target.value);
                                }}
                                onClick={() => {}}
                                placeholder='Budget'></UTextInput>
                        </div>
                    </Row>
                    <Row>
                        <USelectDropdown
                            value={filament}
                            onChange={(e) => {
                                setFilament(materials[e.target.value - 1]);
                            }}
                            placeholder='Filament'
                            options={materials}></USelectDropdown>
                    </Row>
                    <Row>
                        <div className='mb-3 width-100'>
                            <UTextInput
                                append='%'
                                number
                                value={fill}
                                onChange={(e) => {
                                    setFill(e.target.value);
                                }}
                                onClick={() => {}}
                                placeholder='Fill'></UTextInput>
                        </div>
                    </Row>
                    <Row>
                        <div className='mb-3 width-100'>
                            <UTextInput
                                value={dimensions}
                                onChange={() => {}}
                                onClick={() => handleShow()}
                                onFocus={() => handleShow()}
                                placeholder='Dimensions'></UTextInput>
                        </div>
                        <UDimensionsModal
                            xDim={xDim}
                            setXDim={setXDim}
                            yDim={yDim}
                            setYDim={setYDim}
                            zDim={zDim}
                            setZDim={setZDim}
                            selectedUnits={selectedUnits}
                            setSelectedUnits={setSelectedUnits}
                            show={show}
                            handleClose={() => {
                                setShow(false);
                                changeDimensions();
                            }}
                        />
                    </Row>
                    <Row className='shipping-details-area pt-3 px-3'>
                        <Row className='mx-1 mb-3 width-100'>
                            <span className='mb-1 ml-1'>Shipping Details</span>
                            <UTextInput
                                value={streetAddress}
                                onChange={(e) => {
                                    setStreetAddress(e.target.value);
                                }}
                                onClick={() => {}}
                                placeholder='Street Address'></UTextInput>
                        </Row>
                        <Row>
                            <Col className='ml-1 mb-3'>
                                <UTextInput
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                    onClick={() => {}}
                                    placeholder='City'></UTextInput>
                            </Col>
                            <Col className='mb-3'>
                                <UTextInput
                                    value={state}
                                    onChange={(e) => {
                                        setState(e.target.value);
                                    }}
                                    onClick={() => {}}
                                    placeholder='State'></UTextInput>
                            </Col>
                            <Col className='mr-1 mb-3'>
                                <UTextInput
                                    value={zip}
                                    onChange={(e) => {
                                        setZip(e.target.value);
                                    }}
                                    onClick={() => {}}
                                    placeholder='Zip'></UTextInput>
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <div className='mt-3'>
                            <div>
                                <span>Images</span>
                            </div>
                            <input
                                accept='image/*'
                                htmlFor='image'
                                type='file'
                                multiple
                                onChange={(e) => getImages(e)}
                            />
                        </div>
                    </Row>
                    <Row className='mt-3'>
                        <UTextArea
                            value={details}
                            onChange={(e) => {
                                setDetails(e.target.value);
                            }}
                            placeholder='Details'></UTextArea>
                    </Row>
                    <Row>
                        <div className='width-100 mb-3'>
                            <ProgressBar
                                now={percentage}
                                label={`${percentage < 100 ? Math.trunc(percentage) + '%' : 'Uploaded'}`}
                            />
                        </div>
                        <UButton onClick={() => createJob()} size='lg'>
                            Create Model
                        </UButton>
                    </Row>
                </Col>

                <Col className='mx-auto' lg={5}>
                    <ImageUpload images={images} />
                </Col>
            </Row>
        </Page>
    );
};
