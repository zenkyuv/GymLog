import { observer } from "mobx-react-lite"
import Footer from "../footer"
import Header from "../header"
import "../../../component-styles/dashboard.css"

const Dashboard = observer(() => {
	return (
	<div className="container">
			<Header />
			<div className="cos">elo</div>
			<Footer/>
	</div>
)
})

export default Dashboard