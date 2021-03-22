import './index.css';
import React from 'react';
import GalleryImageField from './GalleryImageField';
import LongButton from '../buttons/LongButton';
import Modal from '../../modal/Modal';
import GalleryImageList from './GalleryImageList';

class GalleryField extends React.Component {
    state = {
        value: this.props.value,
        open: false,
    };
    handleChange = (value) => {
        this.setState(
            {
                ...this.state,
                value: value,
            },
            () => this.props.update(this.state.value)
        );
    };
    addItem = (value) => {
        this.setState(
            {
                ...this.state,
                value: [...this.state.value, value],
                open: false,
            },
            () => {
                this.props.update(this.state.value);
            }
        );
    };
    updateShow = (value) => {
        this.setState({
            ...this.state,
            open: value,
        });
    };
    openModal = () => {
        this.updateShow(true);
    };
    closeModal = () => {
        this.updateShow(false);
    };
    render() {
        return (
            <fieldset className="form-group gallery-field">
                <label htmlFor={this.props.id}>
                    {this.props.label}:
                </label>
                <LongButton
                    text="+ Image"
                    click={this.openModal}
                />
                <GalleryImageList
                    images={this.state.value}
                    update={this.handleChange}
                />
                <Modal
                    show={this.state.open}
                    updateShow={this.updateShow}
                >
                    <GalleryImageField
                        {...this.props}
                        close={this.closeModal}
                        update={this.addItem}
                    />
                </Modal>
            </fieldset>
        );
    }
}

export default GalleryField;
