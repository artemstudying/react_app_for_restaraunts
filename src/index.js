import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App.jsx';

// const history = createBrowserHistory();

ReactDOM.render(
		<App/>
	,document.getElementById('root'));

