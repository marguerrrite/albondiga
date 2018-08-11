import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
//import AppContainer from './components/AppContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
