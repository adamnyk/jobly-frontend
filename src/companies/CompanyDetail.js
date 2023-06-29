import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompany } from "../api.js";
import LoadingSpinner from "../common/LoadingSpinner.js";
import AlertMessage from "../common/AlertMessage.js";
import JobCard from "../jobs/JobCard.js";

const CompanyDetail = () => {
	const { handle } = useParams();

	const [company, setCompany] = useState(null);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		async function fetchCompany() {
			try {
				setCompany(await getCompany(handle));
			} catch (e) {
				setErrors(e);
			}
		}
		fetchCompany();
	}, [handle]);

	if (!company) {
		return (
			<>{errors ? <AlertMessage messages={errors} /> : <LoadingSpinner />}</>
		);
	}

	return (
		<div>
			<h2>{company.name}</h2>
			<p>{company.description}</p>
			{company.jobs.map((j) => (
				<JobCard
					key={j.id}
					title={j.title}
					salary={j.salary}
					equity={j.equity}
					id={j.id}
				/>
			))}
		</div>
	);
};

export default CompanyDetail;
