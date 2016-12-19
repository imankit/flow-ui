import React from 'react';
import { observer,inject } from "mobx-react"

@inject("DashboardStore") @observer
class RightSidebar extends React.Component {
	constructor(props){
		super(props)
		this.state = {

		}
	}
	componentDidMount(){

	}
	selectComponent(compData){
		this.props.DashboardStore.selectComponent(compData)
	}
	textChangeHandler(id,e){
		this.props.DashboardStore.editComponent(id,'text',e.target.value)
	}
	render() {
		let { text,id,inputs,outputs } = this.props.DashboardStore.selectedComponent
		return (
       		<div className="rightsidbarcomponent">
      			<div className="sidebarHeadingleft">
      				<span className={ text ? 'rightbarheadinglight cp' : 'rightbarheadingdark cp' } onClick={ this.selectComponent.bind(this,{}) }>Canvas / </span>
      				<span className="rightbarcompnameheading">{ text ? text : '' }</span>
      			</div>
      			<div className="rightsidebarContent">
      				<div className={ text ? "inputtextdiv" : "hide" }>
      					<span className="nameinputtext">Name: </span>
      					<input className="inputCompText" value={ text || ''} onChange={ this.textChangeHandler.bind(this,id) }/>
      				</div>
      			</div>    		
       		</div>
		);
	}
}

export default RightSidebar;