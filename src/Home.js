import { useContext } from "react";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<div className="Home">
			<div>
				<h1 className="mb-3 bold">Jobly</h1>
				<p className="lead mb-1">Your job search, simplified.</p>
				{currentUser ? (
					<h2 className="my-3 display-6">Welcome back {currentUser.firstName}!</h2>
				) : (
					<>
						<Link to="login" className="btn btn-primary btn-sm m-1">
							Login
						</Link>
						<Link to="signup" className="btn btn-primary btn-sm m-1">
							Sign up
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
