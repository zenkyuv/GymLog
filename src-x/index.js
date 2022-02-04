import { jsx as _jsx } from "react/jsx-runtime";
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import { StoresProvider, stores } from "./page-components/states-store/store";
ReactDOM.render(_jsx(StoresProvider, Object.assign({ value: stores }, { children: _jsx(App, {}, void 0) }), void 0), document.getElementById('root'));
