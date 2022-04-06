import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../component-styles/header.css';
import { logout } from '../auth';
import Register from '../register-login-panel';
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
        'header-area header-sticky',
        setCss ? 'dashboard-page-colors' : 'main-page-colors'
      )}
    >
      <nav className="main-nav">
        <a
          href="index.html"
          className={classNames(
            'logo',
            setCss ? 'dashboard-page-colors' : 'main-page-colors'
          )}
        >
          Gym<span className="text">Log</span>
          <span className="line">-</span>
          <span className="info">simple workout tracker</span>
        </a>
        <div className="sign-buttons">
          <ul className="nav">
            {userStore.userLogged && !pageStore.dashboardVisible ? (
              <li className="scroll-to-section">
                <a
                  href="#top"
                  className="active"
                  onClick={() => pageStore.makeDashboardVisible()}
                >
                  Dashboard
                </a>
              </li>
            ) : null}
            {userStore.userLogged === false ? (
              <li className="main-button">
                <a href="#/" onClick={() => setClick(true)}>
                  Sign up
                </a>
              </li>
            ) : (
              <li className="main-button">
                <a href="#/" onClick={() => logout(userStore, pageStore)}>
                  Sign out
                </a>
              </li>
            )}
          </ul>
          {/* <a className="menu-trigger" href="#/"> */}
          <span className="bars">---</span>
          {/* </a> */}
        </div>
      </nav>
      {clicked === true && userStore.userLogged === false ? <Register /> : null}
    </header>
  );
});

export default Header;
