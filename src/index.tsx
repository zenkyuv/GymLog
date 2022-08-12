import App from './App'
import ReactDOM from 'react-dom'
import {
	StoresProvider,
	stores,
} from './page-components/states-store/store'

ReactDOM.render(
	<StoresProvider value={stores}>
		<App />
	</StoresProvider>,
	document.getElementById('root')
)