import Main from './common/main'
import Footer from './common/footer'
import Header from './common/header'
import { observer } from 'mobx-react-lite'

const MainPage = observer(() => {
	return (
		<div>
			<Header />
			<Main />
			<Footer />
		</div>
	)
})

export default MainPage
