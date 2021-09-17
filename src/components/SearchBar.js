import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './SearchBar.module.scss';
library.add(fas);

const SearchBar = ({ range = 'all' }) => {
	const [input, updateInput] = useState('');
	const updateSearchTerm = (event) => {
		updateInput(event.target.value);
	};
	const search = () => {
		console.log('range', range, 'term', input);
	};
	return (
		<fieldset className={styles.searchbar}>
			<input
				type="text"
				placeholder="Search..."
				onChange={updateSearchTerm}
				value={input}
			/>
			<button onClick={search}>
				<FontAwesomeIcon icon={['fas', 'search']} />
			</button>
		</fieldset>
	);
};

export default SearchBar;
