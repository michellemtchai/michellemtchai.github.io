import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Sample from '../components/sample';

class Home extends React.Component {
    render() {
        console.log(this.props.state.data)
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;
