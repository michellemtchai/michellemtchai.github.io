import React, { useEffect, useContext } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Projects from './Projects';
import FilterButton from './FilterButton';
import NotFound from '../pages/404';
import { GlobalContext } from '../../GlobalContext.js';
import * as styles from './PaginateProjects.module.scss';

const ITEMS_PER_PAGE = 10;

const PaginateProjects = ({
	results,
	filters,
	baseUrl,
	query,
	page,
	heading,
	title,
	description,
	category,
}) => {
	let availablePages = Math.ceil(results.length / ITEMS_PER_PAGE);
	availablePages = availablePages === 0 ? 1 : availablePages;
	const currPageItems = () => {
		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		return results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};
	const items = currPageItems();
	const Paginate = ({ className }) =>
		availablePages > 1 && (
			<Pagination
				page={page}
				totalPages={availablePages}
				baseUrl={baseUrl}
				className={className}
			/>
		);
	const { setTitle, setDescription, setSelectedCategory } =
		useContext(GlobalContext);
	useEffect(() => {
		setTitle(title);
		setDescription(description);
		setSelectedCategory(category);
	}, []);
	return page > 0 && page <= availablePages ? (
		<>
			<SearchBar range={category === '' ? 'all' : category} />
			<h2 className={styles.heading}>{heading}</h2>
			<section className={styles.topInfo}>
				<FilterButton
					query={query}
					category={category === '' ? 'all' : category}
					filters={filters}
					search={heading === 'Search'}
				/>
				<p className={styles.summary}>
					{availablePages > 1 && `${items.length} of `}
					{results.length} Project{items.length > 1 && 's'}
					{query && ` for "${query}"`}
				</p>
				<Paginate />
			</section>
			<Projects list={items} />
			<Paginate className={styles.bottomPagination} />
		</>
	) : (
		<NotFound />
	);
};

export default PaginateProjects;
