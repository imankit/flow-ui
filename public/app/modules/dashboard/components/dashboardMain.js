import React from 'react';
import { observer,inject } from "mobx-react"
import Sidebar from './sidebar.js'
import Canvas from './canvas.js'

@inject("DashboardStore") @observer
class DashboardMain extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	static get contextTypes() {
		return {
	  		router: React.PropTypes.object.isRequired,
		}
	}
	componentDidMount(){
	}
	
	render() {
		return (
           <div className="main">
           		<div className="header">

           		</div>
           		<Sidebar/>
           		<Canvas/>
           </div>
		);
	}
}

export default DashboardMain;