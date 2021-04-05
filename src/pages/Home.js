import React from 'react';
import Error from '../components/template/error/Error';
import ThumbList from '../components/thumbList/ThumbList';

class Home extends React.Component {
    render() {
        let categories = this.props.state.categories;
        let projects = this.props.state.projects;
        return !this.props.error ? (
            <div className="page-body">
                {Object.keys(categories).map((key, i) => (
                    <ThumbList
                        key={'thumblist-' + i}
                        {...this.props}
                        title={categories[key].name}
                        page={categories[key].base_url}
                        list={truncateList(
                            categories[key].projects,
                            projects
                        )}
                    />
                ))}
            </div>
        ) : (
            <Error {...this.props} />
        );
    }
}

export default Home;

const truncateList = (list, projects) => {
    let dataList = list.map((key) => projects[key]);
    return dataList.slice(0, 4);
};
