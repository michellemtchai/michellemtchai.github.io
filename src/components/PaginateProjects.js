import React from 'react';
import Layout from './Layout';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Projects from './Projects';
import NotFound from '../pages/404';

const ITEMS_PER_PAGE = 10;

const PaginateProjects = ({
	results,
	baseUrl,
	query,
	page,
	title,
	description,
	category,
}) => {
	const availablePages = Math.ceil(results.length / ITEMS_PER_PAGE);
	const currPageItems = () => {
		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		return results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};
	const items = currPageItems();
	const Paginate = () => (
		<Pagination page={page} totalPages={availablePages} baseUrl={baseUrl} />
	);
	return page > 0 && page <= availablePages ? (
		<Layout
			title={category.name}
			description={category.summary}
			category={category}
		>
			<SearchBar range={category} />
			<p>
				{items.length} of {results.length} Items
				{query && ` for "${query}"`}
			</p>
			<Paginate />
			<Projects list={items} />
			<Paginate />
		</Layout>
	) : (
		<NotFound />
	);
};

export default PaginateProjects;
