import './index.css';
import React from 'react';
import TechnologyListItem from './technologyListItem';
import PageButtons from '../projects/pageButtons';

class TechnologyList extends React.Component {
    render() {
        let page = this.props.page;
        let pages = this.props.pages;
        let technologies = pages[page];
        let pagination = (
            <PageButtons
                index={page + 1}
                pages={pages.length}
                baseUrl="/technologies/page/"
                {...this.props}
            />
        );
        return (
            <ul className="technologies">
                <li>
                    <p>
                        Showing {technologies.length} of{' '}
                        {this.props.total} items
                    </p>
                    {pagination}
                </li>
                {technologies.map((technology, i) => (
                    <TechnologyListItem
                        key={'technology-' + i}
                        {...this.props}
                        technology={technology}
                    />
                ))}
                <li>{pagination}</li>
            </ul>
        );
    }
}

export default TechnologyList;
