import React from 'react';
import '../style/Browsing.css';
import ModalManager from './ModalManager';

export default class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    openModal = () => {
        this.setState({showModal: true});
    };

    closeModal = (e) => {
        this.setState({showModal: false});
    };

    render() {
        let dimensions = `DIM: ${this.props.model.print_dimension_x} x ${this.props.model.print_dimension_y} x ${this.props.model.print_dimension_z} ${this.props.model.dimension_unit}`;
        let filament = `Filament:  ${this.props.model.filament}`;
        return (
            <section className='image-card'>
                {this.props.model.primary_image && (
                    <img
                        src={this.props.model.primary_image}
                        onClick={this.openModal}
                        className='image-preview'
                        alt='3D Model'
                    />
                )}
                <div onClick={this.openModal} className='model-title-container'>
                    <span className='model-title'>{this.props.model.name}</span>
                </div>
                <div onClick={this.openModal} className='card-details'>
                    <h4 className='current-bid'>Current Bid ${this.props.model.budget}</h4>
                    <span className='card-content-filament'>{filament}</span>
                    <span className='card-content-dim'>{dimensions}</span>
                </div>
                <ModalManager
                    selectedNavigation={this.props.selectedNavigation}
                    show={this.state.showModal}
                    model={this.props.model}
                    printJobID={this.props.model.id}
                    handleClose={this.closeModal}
                />
            </section>
        );
    }
}
