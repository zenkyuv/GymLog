import * as React from 'react'
import Box from '@mui/material/Box'
import SignIn from './signin-panel'
import { createUser } from './auth'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useContext, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { SignProps } from '../types/interfaces'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import UserStore from './states-store/states/user-store'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const Copyright = (props: any) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">Your Website</Link>
			{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const theme = createTheme()

export const SignUp = ({ setClick }: SignProps) => {
	const userStore = useContext(UserStore)
	const [showSignIn, setSignIn] = useState(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const userData = new FormData(event.currentTarget)
		createUser({userData, userStore})
	}

	return showSignIn === false
		? <ThemeProvider theme={theme}>
				<Container sx={{display: 'flex', alignItems: "center", flexDirection: "column", zIndex: 2,
					position: 'absolute', top: 0, height: '100vh', maxWidth: '100vw !important',
					backgroundColor: 'white'}} component="main" maxWidth="xs">
					<CssBaseline />
					<Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
							maxWidth: "400px"}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">Sign up</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField autoComplete="given-name" name="firstName" required fullWidth
										id="firstName" label="First Name" autoFocus />
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField required fullWidth id="lastName" label="Last Name" name="lastName"
										autoComplete="family-name" />
								</Grid>
								<Grid item xs={12}>
									<TextField required fullWidth id="email" label="Email Address" name="email"
										autoComplete="email" />
								</Grid>
								<Grid item xs={12}>
									<TextField required fullWidth name="password" label="Password" type="password"
										id="password" autoComplete="new-password" />
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel control={<Checkbox value="allowExtraEmails" color="primary" />}
										label="I want to receive inspiration, marketing promotions and updates via email." />
								</Grid>
							</Grid>
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								Sign Up
							</Button>
							<Button onClick={() => setClick(false)} type="submit" fullWidth variant="contained"
								color='secondary' sx={{ mt: 1, mb: 2 }}>
								Cancel
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link onClick={() => setSignIn(true)} href="#" variant="body2">
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 5 }} />
				</Container>
			</ThemeProvider>
		: <SignIn /> 
}

export default SignUp