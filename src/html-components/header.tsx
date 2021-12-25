import React from "react";

function Header() {

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
				<li className="main-button"><a href="#/">Sign Up</a></li>
			</ul>
			<a className="menu-trigger" href="#/">
				<span>Menu</span>
			</a>
		</nav>
	</header>
	)
}

export default Header