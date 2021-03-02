import React from 'react';

class ActionButtons extends React.Component {
    cancel = (event) => {
        event.preventDefault();
        this.props.cancel();
    }
    save = (event) => {
        event.preventDefault();
        this.props.save();
    }
    render() {
        return (
            <div className='action-btn'>
                <hr/>
                <button className="btn btn-secondary btn-lg"
                    onClick={this.cancel}>
                    Cancel
                </button>
                <button className="btn btn-primary btn-lg"
                    style={{ float: 'right' }}
                    onClick={this.save}>
                    Save Changes
                </button>
            </div>
        );
    }
}

export default ActionButtons;
