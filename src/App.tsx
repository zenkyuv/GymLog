import {useContext, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import MainPage from './page-components/mainpage'
import Dashboard from './page-components/common/dashboard/dashboard'
import PageStore from './page-components/states-store/states/page-store'
import UserStore from './page-components/states-store/states/user-store'
import { checkIfUserLogged } from './page-components/auth'

const App = observer(() => {
	const pageStore = useContext(PageStore)
		const userStore = useContext(UserStore)

	useEffect(() => {
		checkIfUserLogged(userStore)
	})
	
	return (
		<>{pageStore.dashboardVisible === false
			? <MainPage />
			: <Dashboard />}
		</>
	)
})

export default App
