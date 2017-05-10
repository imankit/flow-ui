import React from 'react'
import { Provider } from 'mobx-react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//modules
import Dashboard_Routes from './modules/dashboard/dashboard.js'
import Landing_Routes from './modules/landing/landing.js'

//stores
import Dashboard from './stores/dashboard.js'
import System_Store from './stores/system.js'

ReactDOM.render((
	<Provider DashboardStore = { Dashboard } SystemStore = { System_Store }>
		<Router history={browserHistory}>
			{ Dashboard_Routes }
			{ Landing_Routes }
		</Router>
	</Provider>
), document.getElementById('app'));