import React from 'react';
import { api } from '../config/api';
import { goToPage } from '../shared/router';
import { getPages, validPage, getPage } from '../shared/pages';
import LongButton from '../components/form/longButton';
import TechnologyList from '../components/technologies/technologyList';
import NotFound from './notFound';

class Technologies extends React.Component {
    render() {
        let page = getPage(this.props);
        let [total, pages] = getPages(this.props, 'technologies');
        return validPage(pages, page) ? (
            <div>
                <LongButton
                    text="+ Technology"
                    click={() => goToPage('/technologies/new')}
                />
                <TechnologyList
                    {...this.props}
                    total={total}
                    pages={pages}
                    page={page}
                />
            </div>
        ) : (
            <NotFound {...this.props} />
        );
    }
}

export default Technologies;
