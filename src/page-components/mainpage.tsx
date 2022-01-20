import { observer } from "mobx-react-lite"
import Footer from "./common/footer"
import Header from "./common/header"
import Main from "./common/main"

const MainPage = observer(() => {
	return (
		<div>
			<Header />
			<Main/>
			<Footer/>
		</div>
)
})

export default MainPage