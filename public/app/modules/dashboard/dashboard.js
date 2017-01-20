import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { observer,inject } from "mobx-react"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Dashboard_Main from './common/dashboardMain.js'

@inject("DashboardStore","SystemStore") @observer
class Dashboard extends React.Component {
	componentWillMount() {

		if(this.props.SystemStore.selectedSystem._id){

			this.props.DashboardStore.getAllPackages()

			// repiant endpoints/connections on resize
			$(window).resize(function(){
				jsPlumb.repaintEverything();
			});

			///event for connection detection
			jsPlumb.bind('connection',function(info,ev){
				let postObject = {
					inNode:info.sourceId,
					inPort:info.sourceEndpoint.portData.name,
					outNode:info.targetId,
					outPort:info.targetEndpoint.portData.name,
					graphId:this.props.SystemStore.selectedSystem._id
				}
				this.props.SystemStore.addEdge(postObject)
			}.bind(this));

			///event for connection detach detection
			jsPlumb.bind('connectionDetached',function(info,ev){
				let postObject = {
					inNode:info.sourceId,
					inPort:info.sourceEndpoint.portData.name,
					outNode:info.targetId,
					outPort:info.targetEndpoint.portData.name,
					graphId:this.props.SystemStore.selectedSystem._id
				}
				this.props.SystemStore.removeEdge(postObject)
			}.bind(this));

		} else {
			this.context.router.push('/')
		}
	}
	static get contextTypes() {
		return {
	  		router: React.PropTypes.object.isRequired,
		}
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