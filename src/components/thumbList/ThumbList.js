import './index.css';
import React from 'react';
import Image from '../image/Image';
import { goToPage } from '../../shared/router';

class ThumbList extends React.Component {
    seeProject = (projectId, event = null) => {
        if (event) {
            event.preventDefault();
        }
        goToPage(`/projects/${projectId}`);
    };
    render() {
        let list = this.props.list;
        let demo = (i) => (i.demo_url ? <span>DEMO</span> : '');
        return (
            <section className="thumblist">
                <h3>{truncateName(this.props.title)}</h3>
                <ul>
                    {this.props.list.map((item, i) => (
                        <li key={'thumbnail-' + i}>
                            <a
                                href={`/projects/${item._id}`}
                                onClick={(event) =>
                                    this.seeProject(
                                        item._id,
                                        event
                                    )
                                }
                            >
                                <Image
                                    src={item.image_url}
                                    alt={item.name}
                                    onClick={() =>
                                        this.seeProject(item._id)
                                    }
                                />
                                {demo(item)}
                                <p>{item.name}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default ThumbList;

const truncateName = (name) => {
    if (name.length > 55) {
        return name.slice(0, 55) + '...';
    } else {
        return name;
    }
};
