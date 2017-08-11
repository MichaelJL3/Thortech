import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './components/Router.jsx';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
