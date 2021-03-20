import './techlist.css';
import React from 'react';
import Image from '../image/image';

class TechList extends React.Component {
    render() {
        let technologies = this.props.state.data.technologies;
        let tech = this.props.tech;
        let className = this.props.clickable
            ? 'tech tech-clickable'
            : 'tech';
        return (
            <ul className={className}>
                {tech.map((key, i) => (
                    <li key={'tech-' + i}>
                        {this.props.clickable ? (
                            <a
                                href={technologies[key].source_url}
                                target="_blank"
                            >
                                <TechListItem
                                    {...technologies[key]}
                                />
                            </a>
                        ) : (
                            <TechListItem {...technologies[key]} />
                        )}
                    </li>
                ))}
            </ul>
        );
    }
}

export default TechList;

const TechListItem = (technology) => {
    return (
        <>
            <Image
                src={technology.icon_url}
                alt={technology.name}
                width="20px"
                height="20px"
            />
            {technology.name}
        </>
    );
};
