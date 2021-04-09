import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { routes } from '../config';

class Search extends React.Component {
    render() {
        let term = this.props.search.term
            ? this.props.search.term
            : decodeURIComponent(this.props.match.params.term);
        return <div>search "{term}"</div>;
    }
}

export default Search;
