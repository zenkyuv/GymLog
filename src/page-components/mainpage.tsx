import Main from './common/main.js'
import Footer from './common/footer.js'
import Header from './common/header.js'
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
