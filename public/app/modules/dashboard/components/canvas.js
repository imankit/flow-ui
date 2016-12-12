import React from 'react';
import { observer,inject } from "mobx-react"
const commonEnd = {
	endpoint: "Dot",
	paintStyle: { fillStyle: "blue", radius: 7 },
	maxConnections: -1,
	dropOptions: { hoverClass: "hover", activeClass: "active" },
	isTarget: true,
	overlays: [["Label", { location: [0.5, -0.5], label: "", cssClass: "endpointTargetLabel" }]]
}
const commonSource = {
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

@inject("DashboardStore") @observer
class Canvas extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		
	}
	componentDidUpdate(){
		setTimeout(()=>{
			jsPlumb.ready(() => {
				if(this.props.DashboardStore.getComponents){
					this.props.DashboardStore.getComponents.map((x,i)=>{
						let id = "item"+i
						for(let k=1;k<=x.inputs;k++){
							let pos = 0.2*( k )
							jsPlumb.addEndpoint(id, {
						    	anchors:[[0,pos,0,0]]
							},commonEnd);
						}
						for(let k=1;k<=x.outputs;k++){
							let pos = 0.2*( k )
							jsPlumb.addEndpoint(id, {
						    	anchors:[[1,pos,0,0]]
							},commonSource);
						}
					})
				}

				jsPlumb.bind('connection',function(info,ev){
				    console.log(info)
				});
	            
	        	jsPlumb.draggable($('.item'));
	            // jsPlumb.draggable(".item");
        	});
		},0)
	}
	render() {
		let components = []
		if(this.props.DashboardStore.getComponents){
			components = this.props.DashboardStore.getComponents.map((x,i)=>{
				return <div id={ "item"+i } className="item" key={ i }>
							<span className="itemPreviewText">{ x.text }</span>
						</div>
			})
		}
		return (
       		<div className="componentcanvas">
				{ components }
       		</div>
		);
	}
}

export default Canvas;