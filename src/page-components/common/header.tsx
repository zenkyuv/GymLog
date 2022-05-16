import { useContext, useEffect, useState } from 'react';
import styles from '../../component-styles/header.module.css';
import { logout } from '../auth';
import SignIn from '../signin-panel';
import { observer } from 'mobx-react-lite';
import UserStore from '../states-store/states/user-store';
import PageStore from '../states-store/states/page-store';
import classNames from 'classnames';
const Header = observer((css: any) => {
	
  const userStore = useContext(UserStore);
  const pageStore = useContext(PageStore);
	const [clicked, setClick] = useState(false);
  useEffect(() => {
    if (userStore.userLogged) {
      setClick(false);
    } else if (userStore.userLogged && pageStore.dashboardVisible === false) {
      setClick(true);
    }
  }, [pageStore.dashboardVisible, userStore.userLogged]);

  const setCss = Object.keys(css).length !== 0;
  return (
    <header
      className={classNames(
        styles['header-area header-sticky'],
        setCss ? styles['dashboard-page-colors'] : styles['main-page-colors']
      )}
    >
      <nav className={styles["main-nav"]}>
        <a
          href="index.html"
          className={classNames(
            styles.logo,
            setCss ? styles['dashboard-page-colors'] : styles['main-page-colors']
          )}
        >
          Gym<span className={styles.text}>Log</span>
          <span className={styles.line}>-</span>
          <span className={styles.info}>simple workout tracker</span>
        </a>
        <div className={styles["sign-buttons"]}>
          <ul className={styles.nav}>
            {userStore.userLogged && !pageStore.dashboardVisible ? (
              <li className={styles["scroll-to-section"]}>
                <a
                  href="#top"
                  className={styles.active}
                  onClick={() => pageStore.makeDashboardVisible()}
                >
                  Dashboard
                </a>
              </li>
            ) : null}
            {userStore.userLogged === false ? (
              <li className={styles["main-button"]}>
                <a href="#/" onClick={() => setClick(true)}>
                  Sign in
                </a>
              </li>
            ) : (
              <li className={styles["main-button"]}>
                <a href="#/" onClick={() => logout(userStore, pageStore)}>
                  Sign out
                </a>
              </li>
            )}
          </ul>
          {/* <a className="menu-trigger" href="#/"> */}
          <span className={styles.bars}>---</span>
          {/* </a> */}
        </div>
      </nav>
			{clicked && userStore.userLogged === false ? <SignIn setClick={setClick} /> : null}
    </header>
  );
});

export default Header;
