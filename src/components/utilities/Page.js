import React from 'react';
import Container from 'react-bootstrap/Container';

export default (props) => {
    return (
        <Container as={'main'} className={'py-5'} style={{minHeight: '100vh'}}>
            {props.children}
        </Container>
    );
};
