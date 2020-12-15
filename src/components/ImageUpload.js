import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PhotoIcon from '@material-ui/icons/Photo';

import './../style/ImageUpload.css';

export default (props) => {
    const images = props.images;

    function bigImage(i) {
        if (i <= images.length - 1) {
            return <div className='fill big'>{<img src={images[i]} alt='upload' className='image' />}</div>;
        } else {
            return <div className='fill big'>{<PhotoIcon />}</div>;
        }
    }

    function smallImage(i) {
        if (i <= images.length - 1) {
            return <div className='fill small'>{<img src={images[i]} alt='upload' className='image' />}</div>;
        } else {
            return <div className='fill small'>{<PhotoIcon></PhotoIcon>}</div>;
        }
    }

    return (
        <Container>
            <Row className='pb-2'>
                <Col>{bigImage(0)}</Col>
            </Row>
            <Row className='pb-2'>
                <Col className='pr-1'>{smallImage(1)}</Col>
                <Col className='pl-2'>{smallImage(2)}</Col>
            </Row>
            <Row className='pb-2'>
                <Col className='pr-1'>{smallImage(3)}</Col>
                <Col className='pl-1'>{smallImage(4)}</Col>
            </Row>
        </Container>
    );
};
