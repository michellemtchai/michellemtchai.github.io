import './navcontent.css';
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class NavContent extends React.Component {
    state = {
        width: '250px'
    }
    navStyle = {
        width: this.state.width
    }
    contentStyle = {
        width: `calc(100% - ${this.state.width})`,
    }
    render() {
        return (
            <dl className='main'>
                <dd style={this.navStyle}>
                    <NavBar {...this.props}/>
                </dd>
                <dd style={this.contentStyle}>
                    <div className='content'>
                        <h2>{this.props.title}</h2>
                        {this.props.children}
                    </div>
                    <Footer/>
                </dd>
            </dl>
        );
    }
}

export default NavContent;
