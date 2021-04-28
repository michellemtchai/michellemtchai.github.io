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
        let tags = this.props.tags;
        if (this.state.show) {
            if (tags.length > 0) {
                return (
                    <ul>
                        {tags.map((tag, i) => (
                            <li key={'tag-' + i}>{tag.name}</li>
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
