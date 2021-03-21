import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div className="page-body" style={divStyle}>
                <i
                    className="far fa-dizzy"
                    style={iconStyle}
                ></i>
                <br />
                <p style={textStyle}>Sorry, page not found.</p>
            </div>
        );
    }
}

export default NotFound;

const divStyle = {
    textAlign: 'center',
    fontSize: '50px',
    paddingTop: '50px',
    lineHeight: '50px',
};
const iconStyle = {
    fontSize: '150px',
};
const textStyle = {
    margin: '10px',
};
