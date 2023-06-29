import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { useHistory } from "react-router-dom";
import {
	Form,
	Input,
	Card,
	Label,
	Container,
	Button,
	FormGroup,
} from "reactstrap";
import AlertMessage from "../common/AlertMessage";

const SignupForm = () => {
	const { signUp } = useContext(UserContext);
	const history = useHistory();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	});
	const [errors, setErrors] = useState([]);

	const onChange = (evt) => {
		const { name, value } = evt.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (evt) => {
		try {
			evt.preventDefault();
			await signUp(formData);
			history.push("/");
		} catch (err) {
			setErrors(err);
		}
	};

	return (
		<Container className="LoginForm  col-sm-10 col-lg-7 ">
			<h3 className="display-6  ">Sign Up</h3>
			<Card className="mb-3">
				<Form className="m-3" onSubmit={onSubmit}>
					<div className="mb-3">
						<Label for="username" className="fw-bold small m-0">
							Username
						</Label>
						<Input
							id="username"
							name="username"
							value={formData.username}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					<div className="mb-3">
						<Label for="password" className="fw-bold small m-0">
							Password
						</Label>
						<Input
							id="password"
							type="password"
							name="password"
							value={formData.password}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>

					<div className="mb-3">
						<Label for="firstName" className="fw-bold small m-0">
							First Name
						</Label>
						<Input
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					<div className="mb-3">
						<Label for="lastName" className="fw-bold small m-0">
							Last Name
						</Label>
						<Input
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					<div className="mb-3">
						<Label for="email" className="fw-bold small m-0">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							value={formData.email}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					{errors.length ? <AlertMessage messages={errors} color="danger" /> : null}
					<Button block={true}>Submit</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default SignupForm;
