import './index.css';
import React from 'react';

class Tags extends React.Component {
    state = {
        show: false,
    };
    updateShow = () => {
        this.setState({
            show: !this.state.show,
        });
    };
    tagslist = () => {
        let tags = this.props.state.data.tags;
        let tagIds = this.props.tags;
        if (this.state.show) {
            if (tagIds.length > 0) {
                return (
                    <ul>
                        {this.props.tags.map((key, i) => (
                            <li key={'tag-' + i}>
                                {tags[key].name}
                            </li>
                        ))}
                    </ul>
                );
            } else {
                return (
                    <p class="no-tags">
                        This project has no tags.
                    </p>
                );
            }
        } else {
            return '';
        }
    };
    render() {
        let sign = this.state.show ? '−' : '+';
        return (
            <li className="tags-list">
                <section onClick={this.updateShow}>
                    <b>
                        Tags<span>{sign}</span>
                    </b>
                </section>
                <this.tagslist />
            </li>
        );
    }
}

export default Tags;
