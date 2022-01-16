import React, { useContext } from 'react';
import Dashboard from './html-components/dashboard/dashboard';
import { observer } from 'mobx-react-lite';
import PageStore from './html-components/states/page-store';
import MainPage from './html-components/mainpage';

const App = observer(() => {
	const pageStore = useContext(PageStore)
	return (
		<>
			{pageStore.dashboardVisible === false ? <MainPage /> : <Dashboard />}
		</>
  );
})

export default App;
