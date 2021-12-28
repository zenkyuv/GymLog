import React, { useEffect, useState } from "react";
import "../component-styles/header.css"
import { logout } from "../auth";
import Register from "../register-login-panel";
function Header(user: any, isLogged: any) {
	
	const [clicked, setClick] = useState(false)

	useEffect(() => {
		if (user.logged) {
			setClick(false)
		}
	}, [user.logged])

	return (
		<header className="header-area header-sticky">
			<nav className="main-nav">
				<a href="index.html" className="logo">Gym<em> Log</em></a>
				<ul className="nav">
					<li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
					<li className="scroll-to-section"><a href="#features">About</a></li>
					<li className="scroll-to-section"><a href="#our-classes">Classes</a></li>
					<li className="scroll-to-section"><a href="#schedule">Schedules</a></li>
					<li className="scroll-to-section"><a href="#contact-us">Contact</a></li>
					{user.logged === false
						? <li className="main-button"><a href="#/" onClick={() => setClick(true)}>Sign up</a></li>
						: <li className="main-button"><a href="#/" onClick={() => logout(user)}>Sign out</a></li>}
				</ul>
				<a className="menu-trigger" href="#/">
					<span>Menu</span>
				</a>
			</nav>
			{clicked === true && user.logged === false
				? <Register isLogged={user.isLogged} />
				: null}
		</header>
	)
}

export default Header