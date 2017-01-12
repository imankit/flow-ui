import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { observer,inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Dashboard_Main from './common/dashboardMain.js'

@inject("DashboardStore") @observer
class Dashboard extends React.Component {
	componentWillMount() {

		this.props.DashboardStore.getAllPackages()

		$(window).resize(function(){
			jsPlumb.repaintEverything();
		});
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
	<Route path="/dash" component={Dashboard}>
    	<IndexRoute component={Dashboard_Main} />
    </Route>
)