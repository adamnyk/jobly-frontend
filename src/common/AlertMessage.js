import { Alert } from "reactstrap";

const AlertMessage = ({ messages = [], color=null }) => {
	return (
		<div className="d-flex justify-content-around">
			<Alert color={color} className="p-1 px-3 d-inline-block small fw-light">
				{messages.map(m => <div key={m}>{m}</div>)}
			</Alert>
		</div>
	);
};

export default AlertMessage;
