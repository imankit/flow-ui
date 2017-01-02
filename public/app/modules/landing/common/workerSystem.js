import React from 'react';
import { observer,inject } from "mobx-react"
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'

@inject("SystemStore") @observer
class WorkerSystems extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			duration:30,
			openSetting:false,
			status:true
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
		this.props.SystemStore.deleteSystem(id)
	}
	redirectToCanvas(){
		this.context.router.push('/dash');
	}
	handleTouchTap(which,event){
		event.preventDefault()
		this.state[which] = true
		this.state['anchorEl'] = event.currentTarget
		this.setState(this.state)
	}
	handleRequestClose(which){
		this.state[which] = false
		this.setState(this.state)
	}
	changeStatus(statusVal){
		this.setState({status:statusVal})
	}
	render() {
		let { name,type,id,description } = this.props.systemData
		return (
			<div className="col-lg-3 projectcardcontainer">
				<div className="midprojectdivworker">
					<i className={ this.state.status ? "fa fa-circle workerstatuscriclegreen" : "fa fa-circle workerstatuscriclered" } aria-hidden="true"></i>
					<span className="workername">{ name }</span>
					<span className="workerduration">{ this.state.duration }</span>
				</div>
				<div className="rightprojectdivworker">
					<i className="fa fa-ellipsis-v threedots" aria-hidden="true" onTouchTap={this.handleTouchTap.bind(this,'openSetting')}></i>
					<i className="fa fa-external-link linkdash" aria-hidden="true" onClick={ this.redirectToCanvas.bind(this) }></i>
				</div>
				<Popover
					open={this.state.openSetting}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose.bind(this,'openSetting')}
					animation={PopoverAnimationVertical}
					className="settingmenu"
					>
					<span className="settingmenuoption" onClick={ this.changeStatus.bind(this,!this.state.status) } >Turn { this.state.status ? " Off" : " On" }</span>
					<span className="settingmenuoption" onClick={ this.redirectToCanvas.bind(this) } >View Canvas</span>
					<span className="settingmenuoption" >Edit</span>
					<span className="settingmenuoption" >Logs</span>
					<span className="settingmenuoption" onClick={ this.deleteSystem.bind(this,id) } >Delete</span>
				</Popover>
			</div>
		);
	}
}

export default WorkerSystems;