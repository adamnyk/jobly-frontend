import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import "./CompanyCard.css"

const CompanyCard = ({ name, handle, description, numEmployees }) => {

	return (
		<Card className="mt-2 CompanyCard">
			<Link to={`/companies/${handle}`}>
				<CardBody>
					<CardTitle tag="h6">{name} </CardTitle>
					<CardText>{description}</CardText>
				</CardBody>
			</Link>
		</Card>
	);
};

export default CompanyCard;
