import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { signUser, createUser } from "./auth";
import UserStore from "./states-store/states/user-store";
import "../component-styles/register.css";
import loadingIndicator from "../images/loading-indicator.svg";
const Register = observer(() => {
    const userStore = useContext(UserStore);
    const signupForm = React.useRef(null);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [showLoadingIndicator, setLoadingIndicator] = useState(false);
    useEffect(() => {
        const email = signupForm?.current['email'];
        const password = signupForm?.current['psw'];
        setUser({ email, password });
    }, []);
    function spinner() {
        if (userStore.userLogged === false) {
            setLoadingIndicator(true);
        }
    }
    const spinnerImage = _jsx("img", { className: "spinner-img", src: loadingIndicator, alt: "" }, void 0);
    return (_jsx("div", Object.assign({ className: "form-popup", id: "myForm" }, { children: _jsxs("form", Object.assign({ action: "/action_page.php", ref: signupForm, className: "form-container" }, { children: [_jsx("h1", { children: "Login" }, void 0), _jsx("label", Object.assign({ htmlFor: "email" }, { children: _jsx("b", { children: "Email" }, void 0) }), void 0), _jsx("input", { type: "text", placeholder: "Enter Email", name: "email", id: "email", required: true }, void 0), _jsx("label", Object.assign({ htmlFor: "psw" }, { children: _jsx("b", { children: "Password" }, void 0) }), void 0), _jsx("input", { type: "password", placeholder: "Enter Password", name: "psw", id: "psw", required: true }, void 0), _jsx("button", Object.assign({ type: "button", onClick: (e) => { signUser(e, user.email, user.password, userStore, setLoadingIndicator); spinner(); }, className: "btn" }, { children: showLoadingIndicator
                        ? spinnerImage
                        : "Login" }), void 0), _jsx("button", Object.assign({ type: "button", onClick: (e) => createUser(e, user.email, user.password), className: "btn" }, { children: "Register" }), void 0), _jsx("button", Object.assign({ type: "button", className: "btn cancel" }, { children: "Close" }), void 0)] }), void 0) }), void 0));
});
export default Register;
