import React from 'react';
import { observer,inject } from "mobx-react"
import config from '../config.js'

@inject("DashboardStore") @observer
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
				// k = number of inputs/outputs
				for(let k=1;k<=2;k++){
					let pos = 0.2*( k )
					this.state.endpoints.push(
						jsPlumb.addEndpoint(props.data.id, {
					    	anchors:[[0,pos,0,0]]
						},Object.assign(config.commonEnd,{test:"test"}))
					)
				}
				for(let k=1;k<=2;k++){
					let pos = 0.2*( k )
					this.state.endpoints.push(
						jsPlumb.addEndpoint(props.data.id, {
					    	anchors:[[1,pos,0,0]]
						},Object.assign(config.commonSource,{test:"test"}))
					)
				}
				this.setState(this.state)

				jsPlumb.draggable($('#' + props.data.id), {
					containment: '.canvascomparea',
					stop: function (event, ui) {
						var pos = ui.position;
						console.log(pos)
					}
				});

				jsPlumb.bind('connection',function(info,ev){
				    console.log(info)
				});

        	});
		},0)
	}
	selectComponent(){
		this.props.DashboardStore.selectComponent(this.props.data)
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