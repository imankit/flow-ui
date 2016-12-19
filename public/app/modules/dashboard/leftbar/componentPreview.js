import React from 'react';
import { observer,inject } from "mobx-react"
import config from '../config.js'

@inject("DashboardStore") @observer
class ComponentPreview extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		setTimeout(()=>{
			for(let k=1;k<=this.props.inputs;k++){
				let pos = 0.2*( k )
				jsPlumb.addEndpoint(this.props.id, {
			    	anchors:[[0,pos,0,0]]
				},config.commonEnd);
			}
			for(let k=1;k<=this.props.outputs;k++){
				let pos = 0.2*( k )
				jsPlumb.addEndpoint(this.props.id, {
			    	anchors:[[1,pos,0,0]]
				},config.commonSource);
			}
		},0)
	}
	addComponent(){
		let id = Math.random().toString(36).substring(7)
		this.props.DashboardStore.addComponent({
			inputs:this.props.inputs,
			outputs:this.props.outputs,
			text:'Sample Comp.',
			id:id
		})
	}
	render() {
		return (
   			<div className="componentselectorContainer">
   				<div id={this.props.id} className="itemPreview" onDoubleClick={ this.addComponent.bind(this) }>
   					<span className="itemPreviewText">Sample Comp.</span>
   				</div>
   			</div>
		);
	}
}

export default ComponentPreview;