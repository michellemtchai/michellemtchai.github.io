import React from 'react';
import LongButton from './longButton';
import {readFile} from '../../shared/file';

class UploadButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            reading: false,
            percent: 100,
        };
        this.fileSelector = React.createRef();
    }
    processFile = (event) =>{
        let fileList = event.target.files;
        if(fileList.length > 0){
            readFile(fileList[0], this);
        }
    }
    upload = () => {
        this.fileSelector.current.click();
    }
    render() {
        let file = this.state.file;
        return (
            <div className='uploader'>
                <input ref={this.fileSelector}
                    type="file" accept=".json"
                    className='hidden'
                    onChange={e=>this.processFile(e)}/>
                {this.state.reading ?
                    <p><b>Progress:</b> {this.state.percent}%</p>:
                    <p><b>File:</b> {file ? file : 'No file'}</p>
                }
                <LongButton text='Upload' click={this.upload}/>
            </div>
        );
    }
}

export default UploadButton;
