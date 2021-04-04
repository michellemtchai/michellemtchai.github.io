import './index.css';
import React from 'react';

class Tabs extends React.Component {
    state = {
        index: this.props.index ? this.props.index : 0,
    };
    changeTab = (index) => {
        this.setState({
            index: index,
        });
    };
    render() {
        return (
            <section>
                <ul className="tabs">
                    {this.props.tabs.map((tab, i) => (
                        <li
                            key={'tab-' + i}
                            onClick={() => this.changeTab(i)}
                            className={
                                this.state.index === i
                                    ? 'selected'
                                    : ''
                            }
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
                {this.props.tabs[this.state.index].component}
            </section>
        );
    }
}

export default Tabs;
