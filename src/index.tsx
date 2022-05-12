// import './index.css';
// import '../src-x/output/bundle.css';
import App from './App.js';
import ReactDOM from 'react-dom';
import {
  StoresProvider,
  stores,
} from './page-components/states-store/store.js';

ReactDOM.render(
  <StoresProvider value={stores}>
    <App />
  </StoresProvider>,
  document.getElementById('root')
);
// console.log('halo');
// export {};
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
