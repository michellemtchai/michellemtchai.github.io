import React from 'react';
import TextField from './textField';
import LongButton from './longButton';
import UploadButton from './uploadButton';
import ActionButtons from './actionButtons';
import Image from '../image/image';
import { formData } from '../../shared/form';
import { readFile, resizeImage } from '../../shared/file';

class ImageField extends React.Component {
    input = React.createRef();
    state = {
        value: this.props.value ? this.props.value : '',
        tempValue: this.props.value ? this.props.value : '',
        mode: null,
    };
    updateURL = () => {
        let value = this.input.current.state.value;
        this.setState({
            ...this.state,
            tempValue: value,
        });
    };
    saveChanges = () => {
        this.setState(
            {
                ...this.state,
                value: this.state.tempValue,
            },
            () => {
                this.changeMode(null);
                this.props.update(this.state.value);
            }
        );
    };
    cancelChanges = () => {
        this.setState(
            {
                ...this.state,
                tempValue: this.state.value,
            },
            () => this.changeMode(null)
        );
    };
    changeMode = (mode) => {
        this.setState({
            ...this.state,
            mode: mode,
        });
    };
    urlPlaceholder = () => {
        return this.props.placeholder
            ? this.props.placeholder
            : 'Enter an image URL';
    };
    textFieldData = () => {
        return {
            ...this.props,
            label: 'Image URL',
            value: this.state.value,
            update: this.updateURL,
            placeholder: this.urlPlaceholder(),
        };
    };
    processImageData = (file, uploader) => {
        readFile(file, uploader, () => {
            resizeImage(
                uploader.state.value,
                uploader.updateValue,
                this.props
            );
        });
    };
    columnTwo = () => {
        switch (this.state.mode) {
            case 'url':
                return (
                    <li>
                        <TextField
                            ref={this.input}
                            {...this.textFieldData()}
                        />
                        <ActionButtons
                            text="Use Image URL"
                            save={this.saveChanges}
                            cancel={this.cancelChanges}
                        />
                    </li>
                );
            case 'upload':
                return (
                    <li>
                        <UploadButton
                            ref={this.input}
                            update={this.updateURL}
                            extensions={imageExtensions}
                            processFile={this.processImageData}
                        />
                        <ActionButtons
                            text="Use Image"
                            save={this.saveChanges}
                            cancel={this.cancelChanges}
                        />
                    </li>
                );
            default:
                return (
                    <li>
                        <input
                            className="form-control"
                            id={this.props.id}
                            type="hidden"
                            name={this.props.name}
                            value={this.state.value}
                        />
                        <LongButton
                            text="Enter URL"
                            click={() => this.changeMode('url')}
                        />
                        <LongButton
                            text="Upload Image"
                            click={() => this.changeMode('upload')}
                        />
                    </li>
                );
        }
    };
    render() {
        let ColumnTwo = this.columnTwo;
        let value =
            this.state.mode === null
                ? this.state.value
                : this.state.tempValue;
        return (
            <fieldset className="form-group">
                <label>{this.props.label}:</label>
                <ul className="image-field">
                    <li>
                        <Image src={value} alt="Image Preview" />
                    </li>
                    <ColumnTwo />
                </ul>
            </fieldset>
        );
    }
}

export default ImageField;

const imageExtensions = ['.png', '.jpeg', '.jpg', '.gif'];
