import { useState, useEffect } from "react";
import { getJobs } from "../api";
import SearchForm from "../forms/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCard from "./JobCard";

const JobList = () => {
	const [jobs, setJobs] = useState(null);

	useEffect(function getJobsOnMount() {
		search();
	}, []);

	async function search(title) {
		const jobs = await getJobs(title);
		setJobs(jobs);
	}

	if (!jobs) return <LoadingSpinner />;
	return (
		<div>
			<SearchForm searchFor={search} />
			<div className="mt-4">
				{jobs.length ? (
					jobs.map((j) => (
						<JobCard
							key={j.id}
							title={j.title}
							salary={j.salary}
							equity={j.equity}
							companyName={j.companyName}
							id={j.id}
						/>
					))
				) : (
					<div>No jobs found</div>
				)}
			</div>
		</div>
	);
};

export default JobList;
