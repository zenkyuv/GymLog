import {observer} from 'mobx-react-lite'
import MainPage from './page-components/mainpage'
import React, {useContext, useEffect} from 'react'
import { checkIfUserLogged } from './page-components/auth'
import Dashboard from './page-components/common/dashboard/dashboard'
import PageStore from './page-components/states-store/states/page-store'
import UserStore from './page-components/states-store/states/user-store'

const App = observer(() => {
	const pageStore = useContext(PageStore)
		const userStore = useContext(UserStore)

	useEffect(() => {
		checkIfUserLogged(userStore)
	})
	
	return (
		<React.StrictMode>
			{!pageStore.dashboardVisible
			? <MainPage />
			: <Dashboard />}
		</React.StrictMode>
	)
})

export default App
