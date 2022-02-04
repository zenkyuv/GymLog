import React, { useContext, useEffect, useState } from "react";
import "../../component-styles/header.css"
import { logout } from "../auth";
import Register from "../register-login-panel";
import { observer } from "mobx-react-lite";
import  UserStore  from "../states-store/states/user-store";
import  PageStore  from "../states-store/states/page-store";
const Header = observer(() => {
	
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	const [clicked, setClick] = useState(false)

	useEffect(() => {
		if (userStore.userLogged) {
			setClick(false)
		} 
		else if (userStore.userLogged && pageStore.dashboardVisible === false) {
			setClick(true)
		}
	}, [pageStore.dashboardVisible, userStore.userLogged])

	return (
		<header className="header-area header-sticky header-color">
			<nav className="main-nav">
				<a href="index.html" className="logo">Gym<em> Log</em><span className="line">-</span><span>simple workout tracker</span></a>
				<ul className="nav">
					{userStore.userLogged ? <li className="scroll-to-section"><a href="#top" className="active" onClick={() => pageStore.makeDashboardVisible()}>Dashboard</a></li> :
					null}
					{userStore.userLogged === false
						? <li className="main-button"><a href="#/" onClick={() => setClick(true)}>Sign up</a></li>
						: <li className="main-button"><a href="#/" onClick={() => logout(userStore, pageStore)}>Sign out</a></li>}
				</ul>
				<a className="menu-trigger" href="#/">
					<span>Menu</span>
				</a>
			</nav>
			{clicked === true && userStore.userLogged === false
				? <Register />
				: null}
		</header>
	)
})

export default Header