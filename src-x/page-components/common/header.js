import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import "../../component-styles/header.css";
import { logout } from "../auth";
import Register from "../register-login-panel";
import { observer } from "mobx-react-lite";
import UserStore from "../states-store/states/user-store";
import PageStore from "../states-store/states/page-store";
const Header = observer(() => {
    const userStore = useContext(UserStore);
    const pageStore = useContext(PageStore);
    const [clicked, setClick] = useState(false);
    useEffect(() => {
        if (userStore.userLogged) {
            setClick(false);
        }
        else if (userStore.userLogged && pageStore.dashboardVisible === false) {
            setClick(true);
        }
    }, [pageStore.dashboardVisible, userStore.userLogged]);
    return (_jsxs("header", Object.assign({ className: "header-area header-sticky header-color" }, { children: [_jsxs("nav", Object.assign({ className: "main-nav" }, { children: [_jsxs("a", Object.assign({ href: "index.html", className: "logo" }, { children: ["Gym", _jsx("em", { children: " Log" }, void 0), _jsx("span", Object.assign({ className: "line" }, { children: "-" }), void 0), _jsx("span", { children: "simple workout tracker" }, void 0)] }), void 0), _jsxs("ul", Object.assign({ className: "nav" }, { children: [userStore.userLogged ? _jsx("li", Object.assign({ className: "scroll-to-section" }, { children: _jsx("a", Object.assign({ href: "#top", className: "active", onClick: () => pageStore.makeDashboardVisible() }, { children: "Dashboard" }), void 0) }), void 0) :
                                null, userStore.userLogged === false
                                ? _jsx("li", Object.assign({ className: "main-button" }, { children: _jsx("a", Object.assign({ href: "#/", onClick: () => setClick(true) }, { children: "Sign up" }), void 0) }), void 0)
                                : _jsx("li", Object.assign({ className: "main-button" }, { children: _jsx("a", Object.assign({ href: "#/", onClick: () => logout(userStore, pageStore) }, { children: "Sign out" }), void 0) }), void 0)] }), void 0), _jsx("a", Object.assign({ className: "menu-trigger", href: "#/" }, { children: _jsx("span", { children: "Menu" }, void 0) }), void 0)] }), void 0), clicked === true && userStore.userLogged === false
                ? _jsx(Register, {}, void 0)
                : null] }), void 0));
});
export default Header;
