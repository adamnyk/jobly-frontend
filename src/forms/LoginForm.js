import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { Form, Input, Card, Label, Container, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";

const LoginForm = () => {
	const { login } = useContext(UserContext);
	const [formData, setFormData] = useState({ username: "", password: "" });
	const [errors, setErrors] = useState([]);

	const history = useHistory();

	const onChange = (evt) => {
		const { name, value } = evt.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (evt) => {
		try {
			evt.preventDefault();
			await login(formData);
			history.push("/");
		} catch (err) {
			setErrors(err);
		}
	};

	return (
		<Container className="LoginForm col-sm-8 col-md-6 col-xl-4">
			<h3 className="display-6 ">Log In</h3>
			<Card className="mb-3">
				<Form className="m-3" onSubmit={onSubmit}>
					<div className="mb-3">
						<Label for="username" className="fw-bold small">
							Username
						</Label>
						<Input
							id="username"
							name="username"
							value={formData.username}
							onChange={onChange}
						/>
					</div>
					<div className="mb-3">
						<Label for="password" className="fw-bold small">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							name="password"
							value={formData.password}
							onChange={onChange}
						/>
					</div>
					{errors.length ? <AlertMessage messages={errors} color="danger" /> : null}
					<Button block={true}>Submit</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default LoginForm;
