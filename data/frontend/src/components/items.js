import React from 'react';
import { goToPage } from '../shared/router';
import { getPages, validPage, getPage } from '../shared/pages';
import LongButton from './form/buttons/LongButton';
import NotFound from '../pages/NotFound';

class Items extends React.Component {
    render() {
        let page = getPage(this.props);
        let [total, pages] = getPages(
            this.props,
            this.props.keyName
        );
        return validPage(pages, page) ? (
            <div>
                {this.props.name ? (
                    <LongButton
                        text={`+ ${this.props.name}`}
                        click={() =>
                            goToPage(
                                `/${this.props.keyName}/new`,
                                this.props
                            )
                        }
                    />
                ) : (
                    ''
                )}
                <this.props.list
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

export default Items;
