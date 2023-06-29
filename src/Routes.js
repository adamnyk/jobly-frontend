import { useContext } from "react";
import UserContext from "./UserContext";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Container } from "reactstrap";
import Home from "./Home";
import CompanyList from "./companies/CompanyList";
import CompanyDetails from "./companies/CompanyDetail";
import JobList from "./jobs/JobList";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";
import ProfileForm from "./forms/ProfileForm";

function Routes() {
	const { currentUser } = useContext(UserContext);
	return (
		<Container className="col-md-8 py-3">
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				{currentUser && [
					<Route exact path="/companies" key="/companies">
						<CompanyList />
					</Route>,
					<Route exact path="/companies/:handle" key="/companies/:handle">
						<CompanyDetails />
					</Route>,
					<Route exact path="/jobs" key="/jobs">
						<JobList />
					</Route>,
					<Route exact path="/profile" key="/profile">
						<ProfileForm />
					</Route>,
				]}

				{!currentUser && [
					<Route exact path="/login" key="/login">
						<LoginForm />
					</Route>,
					<Route exact path="/signup" key="/signup">
						<SignupForm />
					</Route>,
				]}
				<Redirect to="/" />
			</Switch>
		</Container>
	);
}

export default Routes;
