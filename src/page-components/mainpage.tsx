import Main from './common/main'
import { useContext } from 'react'
import SignIn from './signin-panel'
import Footer from './common/footer'
import Header from './common/header'
import { observer } from 'mobx-react-lite'
import PageStore from './states-store/states/page-store'
import UserStore  from './states-store/states/user-store'

const MainPage = observer(() => {
	const pageStore = useContext(PageStore)
	const userStore = useContext(UserStore)
	return (<>
		{!userStore.userIsLogged && pageStore.loginFormsOpened
			? <SignIn />
			: <>
				<Header />
				<Main />
				<Footer />
			</>}
	</>
	)
})

export default MainPage
