import './index.css';
import React from 'react';
import { footer } from '../../../config';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <p>{footer}</p>
            </footer>
        );
    }
}

export default Footer;
