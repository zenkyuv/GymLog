import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { signUser, createUser } from './auth';
import UserStore from './states-store/states/user-store';
import styles from '../component-styles/register.module.css';
import loadingIndicator from '../images/loading-indicator.svg';

const Register = observer(() => {
  const userStore = useContext(UserStore);
  const signupForm: any = React.useRef(null);
  const [user, setUser]:any = useState({
    email: '',
    password: '',
  });

  const [showLoadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {
    const email:HTMLInputElement = signupForm?.current['email'];
		const password:HTMLInputElement = signupForm?.current['psw'];
		 console.log(email.value,password)
    setUser({ email, password });
  }, []);

  function spinner() {
    if (userStore.userLogged === false) {
      setLoadingIndicator(true);
    }
  }

  const spinnerImage = (
    <img className={styles["spinner-img"]} src={loadingIndicator} alt="" />
  );
  return (
    <div className={styles["form-popup"]} id="myForm">
      <form
        action="/action_page.php"
        ref={signupForm}
        className={styles["form-container"]}
      >
        <h1>Login</h1>

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id={styles.email}
          required
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id={styles.psw}
          required
        />

        <button
          type="button"
          onClick={(e: any) => {
            signUser(
              {e,
              user,
              userStore,
              setLoadingIndicator}
            );
						spinner();
						console.log(user.email)
          }}
          className={styles.btn}
        >
          {showLoadingIndicator ? spinnerImage : 'Login'}
        </button>
        <button
          type="button"
          onClick={(e: any) =>
            createUser(e, user.email, user.password, userStore)
          }
          className={styles.btn}
        >
          Register
        </button>
        <button type="button" className={styles["btn cancel"]}>
          Close
        </button>
      </form>
    </div>
  );
});

export default Register;
