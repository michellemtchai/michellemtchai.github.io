import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import LongButton from '../components/form/longButton';
import ProjectList from '../components/projects/projectList';

class Projects extends React.Component {
    state = {
        page: this.props.match.params.page
            ? this.props.match.params.page - 1
            : 0,
    };

    projectPages = () => {
        let projects = this.props.state.data.projects;
        let keys = Object.keys(projects);
        let pages = [],
            index = -1;
        keys.forEach((key, i) => {
            if (i % 10 === 0) {
                index++;
                pages[index] = [];
            }
            pages[index].push(projects[key]);
        });
        return [keys.length, pages];
    };
    render() {
        let [total, pages] = this.projectPages();
        return (
            <div>
                <LongButton
                    text="+ Project"
                    click={() =>
                        goToPage(this.props, '/projects/new')
                    }
                />
                <ProjectList
                    {...this.props}
                    total={total}
                    pages={pages}
                    page={this.state.page}
                />
            </div>
        );
    }
}

export default Projects;
