import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import MainPage from './page-components/mainpage.js'
import Dashboard from './page-components/common/dashboard/dashboard.js'
import PageStore from './page-components/states-store/states/page-store.js'

const App = observer(() => {
	const pageStore = useContext(PageStore)
	return (
		<>{pageStore.dashboardVisible === false
			? <MainPage />
			: <Dashboard />}
		</>
	)
})

export default App
