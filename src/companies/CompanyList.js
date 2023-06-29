import { useState, useEffect } from "react";
import { getCompanies } from "../api";
import { Container } from "reactstrap";
import CompanyCardList from "./CompanyCardList";
import LoadingSpinner from "../common/LoadingSpinner";

import SearchForm from "../forms/SearchForm";

const CompanyList = () => {
	const [companies, setCompanies] = useState(null);

	useEffect(function getCompaniesOnMount() {
		search();
	}, []);

	async function search(name) {
		const companies = await getCompanies(name);
		setCompanies(companies);
	}

	if (!companies) return <LoadingSpinner />;
	return (
		<div>
			<SearchForm searchFor={search} />
			{companies ? <CompanyCardList companies={companies} /> : null}
		</div>
	);
};

export default CompanyList;
