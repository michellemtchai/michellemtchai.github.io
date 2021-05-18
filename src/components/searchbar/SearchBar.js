import './index.css';
import React from 'react';
import { goToPage } from '../../shared/router';
import { resetResults } from '../../shared/results';

const ENTER = 13;

class SearchBar extends React.Component {
    state = {
        value: this.props.value ? this.props.value : '',
        focus: false,
    };
    handleChange = (event) => {
        this.setState({
            ...this.state,
            value: event.target.value,
        });
    };
    handleFocus = (inFocus) => {
        this.setState({
            ...this.state,
            focus: inFocus,
        });
    };
    search = () => {
        let value = this.state.value.trim();
        if (value.length > 0) {
            let term = encodeURIComponent(value);
            goToPage(`${this.props.range}/search/${term}`);
            resetResults(this.props);
        }
    };
    handleKeyDown = (event) => {
        switch (event.keyCode) {
            case ENTER:
                if (document.activeElement === this.input) {
                    this.search();
                }
                break;
        }
    };
    componentDidMount() {
        document.addEventListener(
            'keydown',
            this.handleKeyDown,
            false
        );
    }
    componentWillUnmount() {
        document.removeEventListener(
            'keydown',
            this.handleKeyDown,
            false
        );
    }
    render() {
        let className = this.state.focus
            ? 'searchbar focused'
            : 'searchbar';
        return (
            <section className={className}>
                <input
                    ref={(i) => (this.input = i)}
                    type="text"
                    name="searchbar"
                    value={this.state.value}
                    placeholder="Search..."
                    onChange={this.handleChange}
                    onFocus={() => this.handleFocus(true)}
                    onBlur={() => this.handleFocus(false)}
                />
                <button
                    onClick={this.search}
                    aria-label="search-button"
                >
                    <i className="fas fa-search" />
                </button>
            </section>
        );
    }
}

export default SearchBar;
