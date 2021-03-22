import React from 'react';
import LongButton from './LongButton';

class UploadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            value: null,
            reading: false,
            percent: 100,
        };
        this.fileSelector = React.createRef();
    }
    processFile = (event) => {
        let fileList = event.target.files;
        if (fileList.length > 0) {
            this.props.processFile(fileList[0], this);
        }
    };
    updateValue = (data) => {
        this.setState(
            {
                ...this.state,
                value: data,
            },
            this.props.update
        );
    };
    upload = () => {
        this.fileSelector.current.click();
    };
    render() {
        let file = this.state.file;
        let extensions = this.props.extensions
            ? this.props.extensions
            : [];
        let text = this.props.text ? this.props.text : 'Upload';
        return (
            <div className="uploader">
                <input
                    ref={this.fileSelector}
                    type="file"
                    accept={extensions.join(',')}
                    className="hidden"
                    onChange={(e) => this.processFile(e)}
                />
                {this.state.reading ? (
                    <p>
                        <b>Progress:</b> {this.state.percent}%
                    </p>
                ) : (
                    <p>
                        <b>File:</b> {file ? file : 'No file'}
                    </p>
                )}
                <LongButton text={text} click={this.upload} />
            </div>
        );
    }
}

export default UploadButton;
