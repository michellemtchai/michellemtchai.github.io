import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useKeyPress } from '../hooks/keys';
import { navigate } from 'gatsby';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './SearchBar.module.scss';
library.add(fas);

const SearchBar = ({ range = 'all' }) => {
	const [input, updateInput] = useState('');
	const [focus, updateFocus] = useState(false);
	const updateSearchTerm = (event) => {
		updateInput(event.target.value);
	};
	const search = () => {
		const query = input.trim();
		if (query !== '') {
			navigate(`/search/${range}/${query}`);
		} else {
			updateInput(query);
		}
	};
	useKeyPress('Enter', search);
	const styling = focus
		? `${styles.searchbar} ${styles.focus}`
		: styles.searchbar;
	return (
		<fieldset className={styling}>
			<input
				type="text"
				placeholder={`Search in ${range}...`}
				onChange={updateSearchTerm}
				onFocus={() => updateFocus(true)}
				onBlur={() => updateFocus(false)}
				value={input}
			/>
			<button onClick={search}>
				<FontAwesomeIcon icon={['fas', 'search']} />
			</button>
		</fieldset>
	);
};

export default SearchBar;
