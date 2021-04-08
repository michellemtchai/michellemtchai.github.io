import './index.css';
import React from 'react';

const ENTER = 13;
const ALT = 18;

class SearchBar extends React.Component {
    state = {
        value: '',
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
        console.log('search', this.state.value);
    };
    openFilterModal = () => {
        console.log('open filter modal');
    };
    handleKeyDown = (event) => {
        switch (event.keyCode) {
            case ENTER:
                this.search();
                break;
            case ALT:
                this.openFilterModal();
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
                <button onClick={this.openFilterModal}>
                    <i className="fas fa-sliders-h" />
                </button>
                <input
                    type="text"
                    name="searchbar"
                    value={this.state.value}
                    placeholder="Search..."
                    onChange={this.handleChange}
                    onFocus={() => this.handleFocus(true)}
                    onBlur={() => this.handleFocus(false)}
                />
                <button onClick={this.search}>
                    <i className="fas fa-search" />
                </button>
            </section>
        );
    }
}

export default SearchBar;
