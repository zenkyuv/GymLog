import { logout } from '../auth'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import UserStore from '../states-store/states/user-store'
import PageStore from '../states-store/states/page-store'
import styles from '../../component-styles/header.module.css'
import { useInView } from 'react-intersection-observer';

const Header = observer(() => {
	
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 0,
	})

	return (
		<header ref={ref} className={styles['header-area']}>
			<div className={inView ? styles["container"] : `${styles['container']} ${styles.fixed}`}>
				<nav className={styles["main-nav"]}>
				<h3 className={styles.logo}>
					GYM<span>LOG</span>
				</h3>
				<div className={styles["sign-buttons"]}>
					<ul className={styles.nav}>

						{userStore.userIsLogged && !pageStore.dashboardVisible
							? (<li className={styles["scroll-to-section"]}>
									<a data-testid="dashboard-button" href="#top" className={styles.active}
										onClick={() => pageStore.makeDashboardVisible()}>
											Dashboard
									</a>
								</li>)
							: null}
						
						{userStore.userIsLogged === false
							? (<li className={styles["main-button"]}>
									<a href="#/" data-testid="signin-main" onClick={() => pageStore.openLoginForms()}>
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
				</div>
		</header>
	)
})

export default Header
