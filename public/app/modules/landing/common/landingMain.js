import React from 'react';
import { observer,inject } from "mobx-react"
import API from './apiSystem'
import Worker from './workerSystem'
import Trigger from './triggerSystem'
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
		let apiSystems = []
		let triggerSystems = []
		let workerSystems = []
		if(this.props.SystemStore.getSystems){
			apiSystems = this.props.SystemStore.getSystems
			.filter(x => x.type == "API")
			.map((x,i)=>{
				return <API key={ i } systemData = { x } />
			})
			triggerSystems = this.props.SystemStore.getSystems
			.filter(x => x.type == "TRIGGER")
			.map((x,i)=>{
				return <Trigger key={ i } systemData = { x } />
			})
			workerSystems = this.props.SystemStore.getSystems
			.filter(x => x.type == "WORKER")
			.map((x,i)=>{
				return <Worker key={ i } systemData = { x } />
			})
		}
		return (
           <div className="main">
           		<div className="header">

           		</div>
           		<div className="landingContent">
	           			<div className="col-lg-12 col-md-12 projectsheadingrow">
	           				<span className="headingproject">App Name</span>
	           				<AddSystem/>
	           			</div>
	           			<div className="col-lg-12 col-md-12 apirow allcontentrows">
	           				<h2 className="contentheadingcommon"><img src="/app/assets/images/api.png" className="projecticonimage"/> API</h2>
	           				{ apiSystems }
	           			</div>
	           			<div className="col-lg-12 col-md-12 workerrow allcontentrows">
	           				<h2 className="contentheadingcommon"><img src="/app/assets/images/api.png" className="projecticonimage"/> Background Job</h2>
	           				{ workerSystems }
	           			</div>
	           			<div className="col-lg-12 col-md-12 triggerrow allcontentrows">
	           				<h2 className="contentheadingcommon"><img src="/app/assets/images/api.png" className="projecticonimage"/> Triggers</h2>
	           				{ triggerSystems }
	           			</div>
           		</div>
           </div>
		);
	}
}

export default LandingMain;