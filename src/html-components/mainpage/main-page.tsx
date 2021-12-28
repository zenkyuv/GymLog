import Header from "./header"
import Footer from "./footer"
import Main from "./main"
import { useState } from "react"
function Mainpage() {
	const [logged, isLogged] = useState(false)
	return (
		<div>
			<Header logged={logged} isLogged={isLogged} />
			<Main />
			<Footer />
		</div>
	)
}

export default Mainpage