import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import Footer from "./common/footer";
import Header from "./common/header";
import Main from "./common/main";
const MainPage = observer(() => {
    return (_jsxs("div", { children: [_jsx(Header, {}, void 0), _jsx(Main, {}, void 0), _jsx(Footer, {}, void 0)] }, void 0));
});
export default MainPage;
