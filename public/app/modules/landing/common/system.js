import React from 'react';
import { observer,inject } from "mobx-react"
import API from './API'

@inject("SystemStore") @observer
class Systems extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:'GET',
			path:''
		}
	}
	static get contextTypes() {
		return {
	  		router: React.PropTypes.object.isRequired,
		}
	}
	componentDidMount(){

	}
	deleteSystem(id,e){
		e.stopPropagation()
		// this.props.SystemStore.deleteSystem(id)
	}
	redirectToCanvas(){
		this.context.router.push('/dash');
	}
	render() {
		let { name,type,id,description } = this.props.systemData
		let midContent
		if( type == "API" ){
			midContent = <API systemData={ this.props.systemData }/>
		}
		return (
			<div className="col-lg-3 projectcardcontainer">
				<div className="topprojecticon" onClick={ this.redirectToCanvas.bind(this) }><img src="/app/assets/images/api.png" className="projecticonimage"/></div>
				<div className="midprojectdiv">
					<span className="cardtype">{ type }</span>
					<span className="cardname">{ name }</span>
					{ midContent }
				</div>
				<div className="bottomprojectdiv" onClick={ this.redirectToCanvas.bind(this) }>
					<i className="ion-trash-b deletesystemicon" onClick={ this.deleteSystem.bind(this,id) }></i>
				</div>
			</div>
		);
	}
}

export default Systems;