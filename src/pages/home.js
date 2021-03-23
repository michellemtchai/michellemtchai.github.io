import React from 'react';
import Error from '../components/template/error/Error';

class Home extends React.Component {
    render() {
        return !this.props.error ? (
            <div className="page-body">Home</div>
        ) : (
            <Error {...this.props} />
        );
    }
}

export default Home;
