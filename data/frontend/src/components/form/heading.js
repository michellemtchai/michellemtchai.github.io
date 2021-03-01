import React from 'react';

class Heading extends React.Component {
    render() {
        return (
            <fieldset>
                <label className='heading'>{this.props.text}:</label>
            </fieldset>
        );
    }
}

export default Heading;
