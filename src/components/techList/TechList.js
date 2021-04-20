import './index.css';
import React from 'react';
import TechListItem from './TechListItem';

class TechList extends React.Component {
    render() {
        let technologies = this.props.tech;
        let className = this.props.clickable
            ? 'tech tech-clickable'
            : 'tech';
        return (
            <ul className={className}>
                {technologies.map((tech, i) => (
                    <li key={'tech-' + i}>
                        {this.props.clickable ? (
                            <a
                                href={tech.source_url}
                                target="_blank"
                                rel="noopener"
                            >
                                <TechListItem {...tech} />
                            </a>
                        ) : (
                            <TechListItem {...tech} />
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

export default TechList;
