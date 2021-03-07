import './navcontent.css';
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

class NavContent extends React.Component {
    state = {
        width: navWidth(this.props)
    }
    navStyle = {
        width: this.state.width
    }
    contentStyle = {
        width: `calc(100% - ${this.state.width}px)`,
    }
    render() {
        return (
            <dl className='main'>
                <dd style={this.navStyle}>
                    <NavBar {...this.props}
                        width={this.state.width}/>
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

const navWidth = (props)=>{
    let screenWidth = props.width;
    if(screenWidth > 1320){
        return 250;
    }
    else if(screenWidth > 800){
        return 70;
    }
    else{
        return 0;
    }
}
