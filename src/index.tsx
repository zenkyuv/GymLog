import App from './App.js'
import ReactDOM from 'react-dom'
import {
	StoresProvider,
	stores,
} from './page-components/states-store/store.js'

ReactDOM.render(
	<StoresProvider value={stores}>
		<App />
	</StoresProvider>,
	document.getElementById('root')
)