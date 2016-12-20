import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { observer,inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Landing_Main from './common/landingMain.js'

@inject("DashboardStore") @observer
class Landing extends React.Component {
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
	<Route path="/" component={Landing}>
    	<IndexRoute component={Landing_Main} />
    </Route>
)