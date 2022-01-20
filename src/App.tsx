import React, { useContext } from 'react';
import Dashboard from './page-components/common/dashboard/dashboard';
import { observer } from 'mobx-react-lite';
import PageStore from './page-components/states-store/states/page-store';
import MainPage from './page-components/mainpage';

const App = observer(() => {
	const pageStore = useContext(PageStore)
	return (
		<>
			{pageStore.dashboardVisible === false ? <MainPage /> : <Dashboard />}
		</>
  );
})

export default App;
