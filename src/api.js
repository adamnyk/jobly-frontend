import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Module.
 *
 * A collection of methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

// the token for interactive with the API will be stored here.

// for now, put token ("testuser" / "password" on class)
let token;
// =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
// "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
// "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

function setApiToken(newToken) {
	token = newToken;
}

async function request(endpoint, data = {}, method = "get") {
	console.debug("API Call:", endpoint, data, method);

	//there are multiple ways to pass an authorization token, this is how you pass it in the header.
	//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
	const url = `${BASE_URL}/${endpoint}`;
	const headers = { Authorization: `Bearer ${token}` };
	const params = method === "get" ? data : {};

	try {
		return (await axios({ url, method, data, params, headers })).data;
	} catch (err) {
		console.error("API Error:", err.response);
		let message = err.response.data.error.message;
		throw Array.isArray(message) ? message : [message];
	}
}

// Individual API routes
// obviously, you'll add a lot here ...

/** Get details on a company by handle. */

async function getCompany(handle) {
	const res = await request(`companies/${handle}`);
	return res.company;
}

/** Get companies
 * 		If 'name' is present, pass term as 'name' parameter for an iLike search in the database
 * 		If there is no term, fetch all companies
 */

async function getCompanies(name) {
	name = !name ? undefined : name;
	let res = await request("companies/", { name });

	return res.companies;
}

/** Get jobs
 * 		If 'title' is present, search for jobs with that title.
 * 		If there is no term, fetch all companies
 */

async function getJobs(title) {
	title = !title ? undefined : title;
	let res = await request("jobs/", { title });

	return res.jobs;
}

/** getToken
 * 		Used for user Login
 * 		Requires username and password.
 * 		Returns token
 */
async function getToken({ username, password }) {
	let res = await request("auth/token", { username, password }, "post");
	return res.token;
}

/** Get User
 * 		Return user data for current user.
 */
async function getUser(username) {
	let res = await request(`users/${username}`);
	return res.user;
}

/** Sign up user
 * 		Requires {username, password, firstName, lastName, email}
 * 		Returns token
 */
async function signupUser(data) {
	let res = await request(`auth/register`, data, "post");
	return res.token;
}

/** Update Current User
 *
 *  Data can include:
 *   { firstName, lastName, password, email }
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 */
async function updateUser(username, { firstName, lastName, email }) {
	const data = arguments[1];
	let res = await request(`users/${username}`, data, "patch");
	return res.user;
}

/** Apply to Job
 *
 *	
 */
async function applyToJob(username, jobID) {
	let res = await request(`users/${username}/jobs/${jobID}`, {}, "post");
	return res.applied
}

export {
	setApiToken,
	request,
	getCompany,
	getCompanies,
	getJobs,
	getToken,
	getUser,
	signupUser,
	updateUser,
	applyToJob,
};
