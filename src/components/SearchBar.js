import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import * as styles from './SearchBar.module.scss';
library.add(fas);

const SearchBar = ({ value, update, search }) => {
	const [input, updateInput] = useState(value);
	useEffect(() => {
		updateInput(value);
	}, [value]);
	const updateSearchTerm = (event) => {
		const term = event.target.value;
		updateInput(term);
		update(term);
	};
	return (
		<fieldset className={styles.searchbar}>
			<input
				type="text"
				placholder="Search..."
				onChange={updateSearchTerm}
			/>
			<button onClick={search}>
				<FontAwesomeIcon icon={['fas', 'search']} />
			</button>
		</fieldset>
	);
};

export default SearchBar;
