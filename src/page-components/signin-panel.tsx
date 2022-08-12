import {signUser} from './auth'
import Box from '@mui/material/Box'
import SignUp from './signup-panel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import {useContext, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import {SignProps} from '../types/interfaces'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import UserStore from './states-store/states/user-store'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import PageStore from './states-store/states/page-store'

const theme = createTheme()

export const SignIn = () => {
	const userStore = useContext(UserStore)
	const pageStore = useContext(PageStore)
	const [showSignUp, setSignUp] = useState(false)
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const userData = new FormData(event.currentTarget)
		signUser({userData, userStore})
	}

	const [error, setError] = useState(false)
	return showSignUp === false
		? <ThemeProvider theme={theme}>
				<Container sx={{display: 'flex', alignItems: "center", flexDirection: "column", zIndex: 2,
					position: 'absolute', top: 0, height: '100vh', maxWidth: '100vw !important',
					backgroundColor: 'white'}} component="main" maxWidth="xs">
					<CssBaseline />
					<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
							maxWidth: '400px'}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">Sign in</Typography>
						<form onInvalid={() => setError(true)} data-testid="form" onSubmit={handleSubmit}>
							<TextField error={error} margin="normal" required fullWidth id="email" label="Email Address"
								name="email" autoComplete="email" autoFocus inputProps={{ "data-testid": "email" }} />
							<TextField error={error} margin="normal" required fullWidth name="password" label="Password"
								type="password" id="password" autoComplete="current-password" inputProps={{ "data-testid": "password" }} />
							<FormControlLabel control={<Checkbox value="remember" color="primary" />}
								label="Remember me"/>
							<Button  type="submit" data-testid="siginin-button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign In
							</Button>
							<Button onClick={() => pageStore.closeLoginForms()} type="button" fullWidth variant="contained" color='secondary'
								sx={{ mt: 1, mb: 2 }}>
								Cancel
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">Forgot password?</Link>
								</Grid>
								<Grid item>
									<Link onClick={() => setSignUp(true)} href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</Box>
				</Container>
			</ThemeProvider>
		: <SignUp />
}

export default SignIn
