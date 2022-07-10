import App from '../App'
import {useContext} from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react'
import UserStore from '../page-components/states-store/states/user-store'
import PageStore from '../page-components/states-store/states/page-store'

//email for this account is: test@gmail.com, password: test123
const testUserUID = "PIKGFTyeO5bYckoW1wBykCpWbm02"

describe("user logged-in", () => {

	interface Element {
		element: "Dashboard"
	}

	const user = userEvent.setup()
	const LoggedApp = ({element}: Element) => {
		if (element === "Dashboard") {
		const pageStore = useContext(PageStore)
		pageStore.makeDashboardVisible()
		}
		const userStore = useContext(UserStore)
		userStore.clearStore()
		userStore.setUserUID(testUserUID)
		userStore.Logged()
		return <App />
	}

	describe("Inside Dashboard", () => {
		beforeEach(async () => {
			render(<LoggedApp element="Dashboard" />)
		})
		
		describe("WorkoutPanel", () => {
		test('user see appropriate date when forward button clicked', async () => {
			const buttonForward = screen.getByTestId("button-forward")
			const numberOfClicks = 50
				for (let i = 0; i < numberOfClicks; i++) {
				await user.click(buttonForward)
			}
			let date = new Date( Date.now() + numberOfClicks * 24 * 60 * 60 * 1000).toISOString()
			.slice(0, 10)
			.split('-')
			.map((e) => Number(e))
			const time = screen.getByTestId("time")
			const [yearAfterClicks, monthAfterClicks, dayAfterClicks] = date

			expect(time).toHaveTextContent(`${yearAfterClicks}-${monthAfterClicks}-${dayAfterClicks}`)
		});

			test('user see appropriate date when backward button clicked', async () => {
				const buttonBack = screen.getByTestId("button-back")
				const numberOfClicks = 150
				for (let i = 0; i < numberOfClicks; i++) {
				await user.click(buttonBack)
			}
				const time = screen.getByTestId("time")
				let date = new Date( Date.now() - numberOfClicks * 24 * 60 * 60 * 1000).toISOString()
				.slice(0, 10)
				.split('-')
				.map((e) => Number(e))
				const [yearAfterClicks, monthAfterClicks, dayAfterClicks] = date
				
			expect(time).toHaveTextContent(`${yearAfterClicks}-${monthAfterClicks}-${dayAfterClicks}`)
		});

	})

	describe("Calendar", () => {
		test("user see appropriate date when forward button clicked", async () => {

		})

		test("user see appropriate date when backward button clicked", async () => {

		})

	})
	})
	

})