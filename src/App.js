import { useState, useEffect } from "react";
import Routes from "./Routes";
import NavBar from "./common/NavBar";
import { setApiToken, getToken, getUser, signupUser, applyToJob } from "./api";
import "./App.css";
import UserContext from "./UserContext";
import jwt_decode from "jwt-decode";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useLocalStorage("jobly-token");
	useEffect(
		function loadUserInfo() {
			async function getCurrentUser() {
				if (token) {
					try {
						const { username } = jwt_decode(token);
						setApiToken(token);
						setCurrentUser(await getUser(username));
					} catch (err) {
						console.error("App: Error loading user", err);
						setCurrentUser(null);
					}
				} else {
					setCurrentUser(null);
				}
			}
			getCurrentUser();
		},
		[token]
	);

	function logout() {
		setToken(null);
		setCurrentUser(null);
	}

	async function login(loginData) {
		const newToken = await getToken(loginData);
		setToken(newToken);
	}

	async function signUp(signupData) {
		const newToken = await signupUser(signupData);
		setToken(newToken);
	}

	async function apply(jobID) {
		await applyToJob(currentUser.username, jobID);
		setCurrentUser((currentUser) => ({
			...currentUser,
			applications: [...currentUser.applications, jobID],
		}));
	}

	return (
		<UserContext.Provider
			value={{ currentUser, setCurrentUser, login, signUp, apply }}
		>
			<div className="App">
				<NavBar logout={logout} />
				<Routes />
			</div>
		</UserContext.Provider>
	);
}

export default App;
