import React from 'react'
import { Provider } from 'mobx-react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//modules
import Dashboard_Routes from './modules/dashboard/dashboard.js'

//stores
import Dashboard from './stores/dashboard.js'

ReactDOM.render((
	<Provider DashboardStore = { Dashboard }>
		<Router history={hashHistory}>
			{ Dashboard_Routes }
		</Router>
	</Provider>
), document.getElementById('app'));