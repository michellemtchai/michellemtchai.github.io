import React from 'react';
import Layout from './Layout';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Projects from './Projects';
import NotFound from '../pages/404';
import { ITEMS_PER_PAGE } from '../constants';

const CategoryResults = ({ category, slug, page }) => {
	const filteredProjects = () => {
		//TODO
		return category.projects;
	};
	const results = filteredProjects();
	const availablePages = Math.ceil(results.length / ITEMS_PER_PAGE);
	const currPageItems = () => {
		const startIndex = (page - 1) * ITEMS_PER_PAGE;
		return results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
	};
	const items = currPageItems();
	const Paginate = () => (
		<Pagination
			page={page}
			totalPages={availablePages}
			baseUrl={`/${slug}`}
		/>
	);
	return page > 0 && page <= availablePages ? (
		<Layout
			title={category.name}
			description={category.summary}
			category={slug}
		>
			<SearchBar range={slug} />
			<h2>{category.name}</h2>
			<p>
				{items.length} of {results.length} Items
			</p>
			<Paginate />
			<Projects list={items} />
			<Paginate />
		</Layout>
	) : (
		<NotFound />
	);
};

export default CategoryResults;
