import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react"
import { signUser, createUser } from "./auth";
import UserStore from "./states-store/states/user-store";
import "../component-styles/register.css"
import loadingIndicator from "../images/loading-indicator.svg"

const Register = observer(() => {
	const userStore = useContext(UserStore)
	const signupForm: any = React.useRef(null)
	const [user, setUser] = useState({
		email: "",
		password: "",
	})

	const [showLoadingIndicator, setLoadingIndicator] = useState(false)

	useEffect(() => {
		const email = signupForm?.current['email']
		const password = signupForm?.current['psw']
		setUser({ email, password})
	}, [])

	function spinner() {
		if (userStore.userLogged === false) {
			setLoadingIndicator(true)
		}
	}

const spinnerImage = <img className="spinner-img" src={loadingIndicator} alt=""/>
	return (
		<div className="form-popup" id="myForm">
			<form action="/action_page.php" ref={signupForm} className="form-container" >
		
					<h1>Login</h1>
		
						<label htmlFor="email"><b>Email</b></label>
						<input type="text" placeholder="Enter Email" name="email" id="email" required />
		
						<label htmlFor="psw"><b>Password</b></label>
						<input type="password" placeholder="Enter Password" name="psw" id="psw" required />
		
						<button type="button" onClick={(e: any) =>
						{ signUser(e, user.email, user.password, userStore, setLoadingIndicator); spinner() }}
						className="btn">{showLoadingIndicator
						? spinnerImage
						: "Login"}
						</button>
						<button type="button" onClick={(e: any) => createUser(e, user.email, user.password, userStore)} className="btn">Register</button>
						<button type="button" className="btn cancel" >Close</button>
			</form>
		</div>
	)
})

export default Register

