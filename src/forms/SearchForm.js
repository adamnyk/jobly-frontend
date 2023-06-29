import { useState } from "react";
import { Input } from "reactstrap";

const SearchForm = ({ searchFor }) => {
	const [term, setTerm] = useState("");

	function handleChange(e) {
		setTerm(e.target.value);
		searchFor(e.target.value);
	}

	return (
		<Input
			name="search"
			placeholder="Search..."
			id="search"
			onChange={handleChange}
			value={term}
		/>
	);
};

export default SearchForm;
