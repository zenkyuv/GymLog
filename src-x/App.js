import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from 'react';
import Dashboard from './page-components/common/dashboard/dashboard';
import { observer } from 'mobx-react-lite';
import PageStore from './page-components/states-store/states/page-store';
import MainPage from './page-components/mainpage';
const App = observer(() => {
    const pageStore = useContext(PageStore);
    return (_jsx(_Fragment, { children: pageStore.dashboardVisible === false ? _jsx(MainPage, {}, void 0) : _jsx(Dashboard, {}, void 0) }, void 0));
});
export default App;
