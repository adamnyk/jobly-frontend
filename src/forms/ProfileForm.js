import { useState, useContext } from "react";
import UserContext from "../UserContext";
import { Form, Input, Card, Label, Container, Button } from "reactstrap";
import AlertMessage from "../common/AlertMessage";
import { updateUser } from "../api";

const ProfileForm = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);

	const [formData, setFormData] = useState({
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
	});
	const [errors, setErrors] = useState([]);
	const [updateSaved, setUpdateSaved] = useState(false);

	const onChange = (evt) => {
		const { name, value } = evt.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = async (evt) => {
		try {
			evt.preventDefault();
			const { username, ...data } = formData;
			const updatedUser = await updateUser(username, data);
			setCurrentUser((currentUser) => ({ ...currentUser, ...updatedUser }));
			setErrors([]);
			setUpdateSaved(true);
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
						<Label for="username" className="fw-bold small">
							Username
						</Label>
						<Input
							id="username"
							name="username"
							placeholder="Username"
							value={formData.username}
							disabled
							bsSize="sm"
						/>
					</div>

					<div className="mb-3">
						<Label for="firstName" className="fw-bold small">
							First Name
						</Label>
						<Input
							id="firstName"
							name="firstName"
							placeholder="First Name"
							value={formData.firstName}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					<div className="mb-3">
						<Label for="lastName" className="fw-bold small">
							Last Name
						</Label>
						<Input
							id="lastName"
							name="lastName"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					<div className="mb-3">
						<Label for="email" className="fw-bold small">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={onChange}
							bsSize="sm"
						/>
					</div>
					{errors.length ? (
						<AlertMessage messages={errors} color="danger" />
					) : null}
					{updateSaved ? (
						<AlertMessage messages={["User updated"]} color="success" />
					) : null}
					<Button block={true}>Submit</Button>
				</Form>
			</Card>
		</Container>
	);
};

export default ProfileForm;
