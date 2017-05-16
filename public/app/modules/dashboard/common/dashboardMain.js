import React from 'react';
import { observer,inject } from "mobx-react"
import Sidebar from '../leftbar/sidebar.js'
import RightSidebar from '../rightbar/rightBar.js'
import Canvas from '../canvas/canvas.js'
// import HeaderMain from '../../header/headerMain.js'

@inject("DashboardStore") @observer
class DashboardMain extends React.Component {
	constructor(props){
		super(props)
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
								{/*<HeaderMain/>*/}
           		</div>
           		<Sidebar/>
           		<Canvas/>
           		<RightSidebar/>
           </div>
		);
	}
}

export default DashboardMain;