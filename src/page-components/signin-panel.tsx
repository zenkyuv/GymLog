// import { observer } from 'mobx-react-lite';
// import React, { useContext, useEffect, useState } from 'react';
// import { signUser, createUser } from './auth';
// import UserStore from './states-store/states/user-store';
// import styles from '../component-styles/register.module.css';
// import loadingIndicator from '../images/loading-indicator.svg';

// const Register = observer(() => {
//   const userStore = useContext(UserStore);
//   const signupForm: any = React.useRef(null);
//   const [user, setUser]:any = useState({
//     email: '',
//     password: '',
//   });

//   const [showLoadingIndicator, setLoadingIndicator] = useState(false);

//   useEffect(() => {
//     const email:HTMLInputElement = signupForm?.current['email'];
// 		const password:HTMLInputElement = signupForm?.current['psw'];
// 		 console.log(email.value,password)
//     setUser({ email, password });
//   }, []);

//   function spinner() {
//     if (userStore.userLogged === false) {
//       setLoadingIndicator(true);
//     }
//   }

//   const spinnerImage = (
//     <img className={styles["spinner-img"]} src={loadingIndicator} alt="" />
//   );
//   return (
//     <div className={styles["form-popup"]} id="myForm">
//       <form
//         action="/action_page.php"
//         ref={signupForm}
//         className={styles["form-container"]}
//       >
//         <h1>Login</h1>

//         <label htmlFor="email">
//           <b>Email</b>
//         </label>
//         <input
//           type="text"
//           placeholder="Enter Email"
//           name="email"
//           id={styles.email}
//           required
//         />

//         <label htmlFor="psw">
//           <b>Password</b>
//         </label>
//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="psw"
//           id={styles.psw}
//           required
//         />

//         <button
//           type="button"
//           onClick={(e: any) => {
//             signUser(
//               {e,
//               user,
//               userStore,
//               setLoadingIndicator}
//             );
// 						spinner();
// 						console.log(user.email)
//           }}
//           className={styles.btn}
//         >
//           {showLoadingIndicator ? spinnerImage : 'Login'}
//         </button>
//         <button
//           type="button"
//           onClick={(e: any) =>
//             createUser(e, user.email, user.password, userStore)
//           }
//           className={styles.btn}
//         >
//           Register
//         </button>
//         <button type="button" className={styles["btn cancel"]}>
//           Close
//         </button>
//       </form>
//     </div>
//   );
// });

// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signUser } from './auth';
import { useContext, useState } from 'react';
import UserStore from './states-store/states/user-store';
import SignUp from './signup-panel';
import styles from "../component-styles/header.module.css"

const setLoadingIndicator = false;
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export function SignIn(props: any) {
	console.log(props)
	const userStore = useContext(UserStore);
	const [showSignUp, setSignUp] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = new FormData(event.currentTarget);
    console.log({
      email: userData.get('email'),
      password: userData.get('password'),
		});
		signUser(
              {
              userData,
              userStore,
              setLoadingIndicator}
            );
  };

	return showSignUp === false ? 
		   <ThemeProvider theme={theme}>
			<Container sx={{
				display: 'flex',
				alignItems: "center",
				flexDirection: "column",
				zIndex: 2,
				position: 'absolute',
				top: 0,
				height: '100vh',
				maxWidth: '100vw !important',
				backgroundColor: 'white'
			}} component="main" maxWidth="xs">
				<CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
						alignItems: 'center',
						maxWidth: '400px'
          }}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
						</Button>
						<Button
              type="submit"
              fullWidth
							variant="contained"
							color='secondary'
							onClick={() => props.setClick(false)}
              sx={{ mt: 1, mb: 2 }}
            >
              Cancel
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => setSignUp(true)} href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
		</ThemeProvider> : <SignUp setClick={props.setClick} />
}

export default SignIn;
