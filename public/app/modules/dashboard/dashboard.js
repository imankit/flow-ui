import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { observer,inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Dashboard_Main from './components/dashboardMain.js'

@inject("DashboardStore") @observer
class Dashboard extends React.Component {
	componentWillMount() {
		
	}
	render() {
		return (
			<MuiThemeProvider>
				<div id="wrapper">
				  	{ this.props.children }
				</div>
			</MuiThemeProvider>
		);
	}
}
export default(
	<Route path="/" component={Dashboard}>
    	<IndexRoute component={Dashboard_Main} />
    </Route>
)