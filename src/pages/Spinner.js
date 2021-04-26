import React from 'react';

class Spinner extends React.Component {
    render() {
        return (
            <img
                id="spinner"
                src={process.env.PUBLIC_URL + '/spinner.gif'}
            />
        );
    }
}

export default Spinner;
