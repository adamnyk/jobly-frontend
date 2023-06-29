import { useContext } from "react";
import UserContext from "../UserContext";
import { Navbar, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);
	return (
		<div>
			<Navbar expand="md">
				<NavLink exact to="/" className="navbar-brand">
					Jobly
				</NavLink>

				<Nav className="ml-auto" navbar>
					{currentUser ? (
						<>
							<NavItem className="me-4">
								<NavLink to="/companies">Companies</NavLink>
							</NavItem>
							<NavItem className="me-4">
								<NavLink to="/jobs">Jobs</NavLink>
							</NavItem>
							<NavItem className="me-4">
								<NavLink to="/profile">Profile</NavLink>
							</NavItem>
							<NavItem>
								<a href="/" onClick={logout}>
									Logout {currentUser.username}
								</a>
							</NavItem>
						</>
					) : (
						<>
							<NavItem className="me-4">
								<NavLink to="/login">Login</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to="/signup">Sign Up</NavLink>
							</NavItem>
						</>
					)}
				</Nav>
			</Navbar>
		</div>
	);
};

export default NavBar;
