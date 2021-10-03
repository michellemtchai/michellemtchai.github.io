import React from 'react';
import Layout from './Layout';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Projects from './Projects';
import NotFound from '../pages/404';
import * as styles from './PaginateProjects.module.scss';

const ITEMS_PER_PAGE = 10;

const PaginateProjects = ({
	results,
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
	const Paginate = () =>
		availablePages > 1 && (
			<Pagination
				page={page}
				totalPages={availablePages}
				baseUrl={baseUrl}
			/>
		);
	return page > 0 && page <= availablePages ? (
		<Layout title={title} description={description} category={category}>
			<SearchBar range={category} />
			<h2 className={styles.heading}>{heading}</h2>
			<section className={styles.topInfo}>
				<p className={styles.summary}>
					{availablePages > 1 && `${items.length} of `}
					{results.length} Projects
					{query && ` for "${query}"`}
				</p>
				<Paginate />
			</section>
			<Projects list={items} />
			<Paginate />
		</Layout>
	) : (
		<NotFound />
	);
};

export default PaginateProjects;
