import React from 'react';
import { observer,inject } from "mobx-react"
import Systems from './system'
import AddSystem from './addSystem'

@inject("SystemStore") @observer
class LandingMain extends React.Component {
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
		let systems = []
		if(this.props.SystemStore.getSystems){
			systems = this.props.SystemStore.getSystems.map((x,i)=>{
				return <Systems key={ i } systemData = { x } />
			})
		}
		return (
           <div className="main">
           		<div className="header">

           		</div>
           		<div className="landingContent">
	           			<div className="col-lg-12 col-md-12 projectsheadingrow">
	           				<span className="headingproject">Current systems</span>
	           				<AddSystem/>
	           			</div>
	           			<div className="col-lg-12 col-md-12 projectscontentrow">
	           				{ systems }
	           			</div>
           		</div>
           </div>
		);
	}
}

export default LandingMain;