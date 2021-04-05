import './index.css';
import React from 'react';
import Image from '../image/Image';
import { goToPage } from '../../shared/router';

class ThumbList extends React.Component {
    openPage = (page, event) => {
        event.preventDefault();
        goToPage(page);
    };
    linkWrapper = (props) => {
        return (
            <a
                href={props.link}
                onClick={(event) =>
                    this.openPage(props.link, event)
                }
            >
                {props.children}
            </a>
        );
    };
    render() {
        let list = this.props.list;
        let demo = (i) => (i.demo_url ? <span>DEMO</span> : '');
        return (
            <section className="thumblist">
                <h3>
                    <this.linkWrapper link={this.props.page}>
                        <i className={this.props.icon} />
                        {truncateName(this.props.title)}
                    </this.linkWrapper>
                    <this.linkWrapper link={this.props.page}>
                        <span>View More</span>
                    </this.linkWrapper>
                </h3>
                <ul>
                    {this.props.list.map((item, i) => (
                        <li key={'thumbnail-' + i}>
                            <this.linkWrapper
                                link={`/projects/${item._id}`}
                            >
                                <Image
                                    src={item.image_url}
                                    alt={item.name}
                                />
                                {demo(item)}
                                <p>{item.name}</p>
                            </this.linkWrapper>
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
