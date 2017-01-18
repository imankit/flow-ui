import React from 'react';
import { observer,inject } from "mobx-react"
import ComponentPreview from './componentPreview'
import LeftTree from './leftTree'
import NPM from './npm'

@inject("DashboardStore","SystemStore") @observer
class Sidebar extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		 
	}
	getInputs(inps){
		return Object.keys(inps).length
	}
	getOutputs(outs){
		return Object.keys(outs).length
	}
	render() {
		let components = this.props.SystemStore.selectedSystem.components
		if(components){
			components = components.map((x,i)=>{
				let inputs = this.getInputs(x.data.inPorts.ports)
				let outputs = this.getOutputs(x.data.outPorts.ports)
				return <ComponentPreview inputs={ inputs } outputs={ outputs } key={ i } id={ "itemPre"+ i } name={ x.name }/>
			})
		}
		return (
       		<div className="sidbarcomponent">
       				<LeftTree/>
	      			<div className="sidebarHeadingright">
	      				<span className="headingComp">Components</span>
	      				<NPM/>
	      			</div>
	      			<div className="ComponentsDivContainer">
	      				{ components }
	       			</div>
	       		
       		</div>
		);
	}
}

export default Sidebar;