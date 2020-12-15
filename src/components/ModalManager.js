import React from 'react';
import ModalJobDetails from './Modals/ModalJobDetails';
import ModalBids from './Modals/ModalBids';
import ModalMakeBid from './Modals/ModalMakeBid';

export default (props) => {
    let modal = null;
    if (
        props.selectedNavigation.title === 'Models' ||
        props.selectedNavigation.title === 'Current Jobs' ||
        props.selectedNavigation.title === 'Jobs In Progress' ||
        props.selectedNavigation.title === 'Completed Prints'
    ) {
        modal = (
            <ModalJobDetails
                show={props.show}
                model={props.model}
                printJobID={props.printJobID}
                handleClose={props.handleClose}
                downloadButton={props.selectedNavigation.title === 'Current Jobs'}
            />
        );
    } else if (props.selectedNavigation.title === 'My Offers') {
        modal = (
            <ModalBids
                show={props.show}
                model={props.model}
                printJobID={props.printJobID}
                handleClose={props.handleClose}
            />
        );
    } else if (props.selectedNavigation.title === 'New Jobs') {
        modal = (
            <ModalMakeBid
                show={props.show}
                model={props.model}
                printJobID={props.printJobID}
                handleClose={props.handleClose}
            />
        );
    }
    return modal;
};
