import CompanyCard from "./CompanyCard";

const CompanyCardList = ({ companies }) => {
	return (
		<div className="mt-4">
			{companies.length ? (
				companies.map((c) => (
					<CompanyCard
						company={c}
						key={c.handle}
						name={c.name}
						description={c.description}
						handle={c.handle}
					/>
				))
			) : (
				<div>No companies found</div>
			)}
		</div>
	);
};

export default CompanyCardList;
