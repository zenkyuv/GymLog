import { logout } from '../auth'
import classNames from 'classnames'
import SignIn from '../signin-panel'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import UserStore from '../states-store/states/user-store'
import PageStore from '../states-store/states/page-store'
import styles from '../../component-styles/header.module.css'

const Header = observer(() => {
	
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	const [clicked, setClick] = useState(false)

	useEffect(() => {
		if (userStore.userLogged) {
			setClick(false)
		} else if (userStore.userLogged && pageStore.dashboardVisible === false) {
			setClick(true)
		}
	}, [pageStore.dashboardVisible, userStore.userLogged])

	return (
		<header className={classNames(styles['header-area header-sticky'])}>
			<nav className={styles["main-nav"]}>
				<a href="index.html" className={styles.logo}>
					Gym<span className={styles.text}>Log</span>
					<span className={styles.line}>-</span>
					<span className={styles.info}>simple workout tracker</span>
				</a>
				<div className={styles["sign-buttons"]}>
					<ul className={styles.nav}>

						{userStore.userLogged && !pageStore.dashboardVisible
							? (<li className={styles["scroll-to-section"]}>
									<a data-testid="dashboard-button" href="#top" className={styles.active}
										onClick={() => pageStore.makeDashboardVisible()}>
											Dashboard
									</a>
								</li>)
							: null}
						
						{userStore.userLogged === false
							? (<li className={styles["main-button"]}>
									<a href="#/" data-testid="signin-main" onClick={() => setClick(true)}>
										Sign in
									</a>
							</li>)
							: (<li className={styles["main-button"]}>
									<a href="#/" onClick={() => logout(userStore, pageStore)}>
										Sign out
									</a>
							</li>)}

					</ul>
					<span className={styles.bars}>---</span>
				</div>
			</nav>
			{clicked && userStore.userLogged === false ? <SignIn setClick={setClick} /> : null}
		</header>
	)
})

export default Header
