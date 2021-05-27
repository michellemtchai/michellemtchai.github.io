import React from 'react';
import { Helmet } from 'react-helmet-async';

class Head extends React.Component {
    render() {
        let title = `${this.props.title} | ${process.env.REACT_APP_TITLE}`;
        let description = this.props.description;
        return (
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
        );
    }
}

export default Head;
