import './index.css';
import React, { lazy } from 'react';
const Image = lazy(() => import('../image/Image'));
import { goToPage } from '../../shared/router';
import { resetResults } from '../../shared/results';

class ThumbList extends React.Component {
    openPage = (page, event) => {
        event.preventDefault();
        resetResults(this.props);
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
                <h2>
                    <this.linkWrapper link={this.props.page}>
                        {truncateName(this.props.title)}
                    </this.linkWrapper>
                    <this.linkWrapper link={this.props.page}>
                        <span>View More</span>
                    </this.linkWrapper>
                </h2>
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
