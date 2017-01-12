import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { observer,inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Landing_Main from './common/landingMain.js'

@inject("DashboardStore") @observer
class Landing extends React.Component {
	componentDidMount() {
		// var parser = require('fbp');
		// // Some FBP syntax code
		// var fbpData = "'6' -> MULTIPLICAND Multiply(math/Multiply)'7' -> MULTIPLIER Multiply Multiply PRODUCT -> IN Display(core/Output)";
		// // Parse into a Graph definition JSON object
		// var graphDefinition = parser.parse(fbpData, {caseSensitive: true});

		// var noflo = require('noflo/lib/Graph')
		// console.log(graphDefinition)
		// noflo.loadJSON(graphDefinition, function (err, network) {
		//   console.log('Network is now running!');
		//   console.log('ntw',network.toDOT())
		// });
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