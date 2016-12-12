import React from 'react';
import { observer,inject } from "mobx-react"

@inject("DashboardStore") @observer
class ComponentPreview extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		var commonEnd = {
			endpoint: "Dot",
			paintStyle: { fillStyle: "blue", radius: 7 },
			maxConnections: -1,
			dropOptions: { hoverClass: "hover", activeClass: "active" },
			isTarget: true,
			overlays: [["Label", { location: [0.5, -0.5], label: "", cssClass: "endpointTargetLabel" }]]
		}
		var commonSource = {
			endpoint: "Dot",
			paintStyle: {
			    strokeStyle: "green", fillStyle: "green", radius: 5, lineWidth: 1
			},
			isSource: true,
			maxConnections: -1,
			connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
			dragOptions: {},
			overlays: [["Label", { location: [0.5, 1.5], label: "", cssClass: "endpointSourceLabel", }]]
		}
		setTimeout(()=>{
			for(let k=1;k<=this.props.inputs;k++){
				let pos = 0.2*( k )
				jsPlumb.addEndpoint(this.props.id, {
			    	anchors:[[0,pos,0,0]]
				},commonEnd);
			}
			for(let k=1;k<=this.props.outputs;k++){
				let pos = 0.2*( k )
				jsPlumb.addEndpoint(this.props.id, {
			    	anchors:[[1,pos,0,0]]
				},commonSource);
			}
		},0)
	}
	addComponent(){
		let id = this.props.id + "final"
		this.props.DashboardStore.addComponent({
			inputs:this.props.inputs,
			outputs:this.props.outputs,
			text:'Sample Comp.'
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