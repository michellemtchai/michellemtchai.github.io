import React from 'react';
import Items from '../components/items/Items';
import ProjectList from '../components/projects/ProjectList';
import { formatPages } from '../shared/pages';

class Search extends React.Component {
    searchResults = () => {
        let term = this.props.search.term;
        let projects = this.props.projects[this.props.keyName]
            .data;
        let data = [];
        projects.forEach((project) => {
            let regex = new RegExp(term, 'gi');
            let match = project.name.match(regex);
            if (match) {
                data.push(project);
            }
        });
        return [data.length, formatPages(data)];
    };
    componentDidMount() {
        if (!this.props.search.term) {
            this.props.setSearch({
                term: decodeURIComponent(
                    this.props.match.params.term
                ),
            });
        }
    }
    render() {
        let [total, pages] = this.searchResults();
        let baseUrl = `${this.props.range}/search/${this.props.search.term}/page`;
        return (
            <Items
                {...this.props}
                name="Project"
                list={ProjectList}
                pages={pages}
                total={total}
                baseUrl={baseUrl}
            />
        );
    }
}

export default Search;
