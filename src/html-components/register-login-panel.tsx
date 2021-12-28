import React, { useEffect, useState } from "react"
import { signUser, createUser } from "./auth";

function Register(isLogged: any) {
	const signupForm: any = React.useRef(null)
	const [user, setUser] = useState({
		email: "",
		password: "",
	})
	console.log(isLogged)
	useEffect(() => {
		const email = signupForm?.current['email']
		const password = signupForm?.current['psw']
		setUser({ email, password})
	}, [])

	return (
		<div className="form-popup" id="myForm">
			<form action="/action_page.php" ref={signupForm} className="form-container" >
				<h1>Login</h1>

				<label htmlFor="email"><b>Email</b></label>
				<input type="text" placeholder="Enter Email" name="email" id="email" required />

				<label htmlFor="psw"><b>Password</b></label>
				<input type="password" placeholder="Enter Password" name="psw" id="psw" required />

				<button type="submit" onClick={(e: any) => signUser(e, user.email, user.password, isLogged)} className="btn">Login</button>
				<button type="submit" onClick={(e: any) => createUser(e, user.email, user.password, isLogged)} className="btn">Register</button>
				<button type="button" className="btn cancel" >Close</button>
			</form>
		</div>
	)
}

export default Register

