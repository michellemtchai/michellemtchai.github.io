import './techlist.css';
import React from 'react';
import Image from '../image/image';

class TechList extends React.Component {
    render() {
        let technologies = this.props.state.data.technologies;
        let tech = this.props.tech;
        return (
            <ul className="tech">
                {tech.map((key, i) => (
                    <li key={'tech-' + i}>
                        <a
                            href={technologies[key].source_url}
                            target="_blank"
                        >
                            <Image
                                src={technologies[key].icon_url}
                                alt={technologies[key].name}
                                width="20px"
                                height="20px"
                            />
                            {technologies[key].name}
                        </a>
                    </li>
                ))}
            </ul>
        );
    }
}

export default TechList;
