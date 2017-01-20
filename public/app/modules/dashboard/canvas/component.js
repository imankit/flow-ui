import React from 'react';
import { observer,inject } from "mobx-react"
import config from '../config.js'

@inject("DashboardStore","SystemStore") @observer
class Component extends React.Component {
	constructor(){
		super()
		this.state = {
			endpoints:[]
		}
	}
	componentDidMount(){
		this.mountJSPlumbComp(this.props)
	}
	componentDidUpdate(){
		// this.mountJSPlumbComp(this.props)
	}
	getPorts(ports){
		return  Object.keys(ports).map(x => {
					return { name:x,data:ports[x] }
				})
	}
	componentWillUnmount(){
		let endpoints = [].concat(this.state.endpoints)
		endpoints.map((x)=>{
			try {
			 jsPlumb.deleteEndpoint(x);
			} catch(e){
				console.log(e)
				jsPlumb.repaintEverything();
			}
		})
		jsPlumb.repaintEverything();
	}
	mountJSPlumbComp(props){
		setTimeout(()=>{
			jsPlumb.ready(() => {

				// set initial position of element
				$('#' + props.data.id).css({
					top:props.data.metadata ? props.data.metadata.top : 36,
					left:props.data.metadata ? props.data.metadata.left : 1
				})

				// set jsplumendpoints on the component
				// k = number of inputs/outputs
				let inputs = this.getPorts(props.metadata.inPorts.ports)
				let outputs = this.getPorts(props.metadata.outPorts.ports)

				for(let k=1;k<=inputs.length;k++){
					let pos = 0.2*( k )
					let endpoint =  jsPlumb.addEndpoint(props.data.id, {
										anchors:[[0,pos,0,0]],
										uuid:inputs[k-1].name+props.data.id
									},config.commonEnd)
					endpoint.portData = inputs[k-1]
					this.state.endpoints.push(
						endpoint
					)
				}
				for(let k=1;k<=outputs.length;k++){
					let pos = 0.2*( k )
					let endpoint =  jsPlumb.addEndpoint(props.data.id, {
										anchors:[[1,pos,0,0]],
										uuid:outputs[k-1].name+props.data.id
									},config.commonSource)
					endpoint.portData = outputs[k-1]
					this.state.endpoints.push(
						endpoint
					)
				}
				// saveing those endpoints in state, for cleanup
				this.setState(this.state)

				
				// make the current element draggable
				jsPlumb.draggable($('#' + props.data.id), {
					containment: '.canvascomparea',
					stop: function (event, ui) {
						var pos = ui.position;
						props.SystemStore.updateNodeMetadata({
							nodeId:props.data.id,
							graphId:props.graphId,
							metadata:pos
						})
					}.bind(this) // binding for context
				});

        	});
		},0)
	}
	selectComponent(){
		//this.props.DashboardStore.selectComponent(this.props.data)
	}
	render() {
		let { id,component } = this.props.data
		return (
       		<div id={ id } className="item" onClick={ this.selectComponent.bind(this) }>
				<span className="itemPreviewText">{ component }</span>
			</div>
		);
	}
}

export default Component;