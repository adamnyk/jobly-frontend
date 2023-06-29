import {
	Card,
	CardBody,
	CardTitle,
	CardText,
	CardSubtitle,
	Button,
} from "reactstrap";
import { useContext } from "react";
import UserContext from "../UserContext";

const JobCard = ({ equity, salary, title, companyName, id }) => {
	const {
		currentUser: { applications },
		apply,
	} = useContext(UserContext);
	const hasAppliedToJob = applications.includes(id);

	return (
		<Card className="mt-2 card JobCard">
			<CardBody>
				<CardTitle tag="h6">{title}</CardTitle>
				{companyName ? (
					<CardSubtitle className="mb-2 text-muted small fst-italic">
						{companyName}
					</CardSubtitle>
				) : null}
				<CardText className="ms-2 mb-0 small">
					Salary: {salary ? `$${salary}` : "Not listed"}
				</CardText>
				<CardText className="ms-2 small">Equity: {equity}</CardText>
				{hasAppliedToJob ? (
					<Button color="success">Application submitted</Button>
				) : (
					<Button color="danger" onClick={() => apply(id)}>
						Apply
					</Button>
				)}
			</CardBody>
		</Card>
	);
};

export default JobCard;
