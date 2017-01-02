import React from 'react';
import { observer,inject } from "mobx-react"
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'

@inject("SystemStore") @observer
class TriggerSystems extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			openSetting:false,
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
	render() {
		let { name,type,id,description } = this.props.systemData
		return (
			<div className="col-lg-3 projectcardcontainer">
				<div className="midprojectdivworker">
					<span className="workername">{ name }</span>
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
					<span className="settingmenuoption" onClick={ this.redirectToCanvas.bind(this) } >View Canvas</span>
					<span className="settingmenuoption" >Edit</span>
					<span className="settingmenuoption" >Logs</span>
					<span className="settingmenuoption" onClick={ this.deleteSystem.bind(this,id) } >Delete</span>
				</Popover>
			</div>
		);
	}
}

export default TriggerSystems;