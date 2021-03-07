import React from 'react';
import IconLink from './IconLink';
import { title, socialLinks } from '../../config/routes';

class Header extends React.Component {
    render() {
        return (
            <dl className='header'>
                <dd>
                    <h1>{title}</h1>
                </dd>
                <dd>
                    Find me
                    {socialLinks.map((item, i)=>
                        <IconLink key={'social-link-'+i}
                            {...item}/>
                    )}
                </dd>
            </dl>
        );
    }
}

export default Header;
