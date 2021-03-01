import React from 'react';

class ActionButtons extends React.Component {
    render() {
        return (
            <div className='action-btn'>
                <hr/>
                <button className="btn btn-secondary btn-lg"
                    onClick={this.props.cancel}>
                    Cancel
                </button>
                <button className="btn btn-primary btn-lg"
                    onClick={this.props.save}>
                    Save Changes
                </button>
            </div>
        );
    }
}

export default ActionButtons;
