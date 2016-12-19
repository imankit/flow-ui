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
				for(let k=1;k<=props.data.inputs;k++){
					let pos = 0.2*( k )
					this.state.endpoints.push(
						jsPlumb.addEndpoint(props.data.id, {
					    	anchors:[[0,pos,0,0]]
						},config.commonEnd)
					)
				}
				for(let k=1;k<=props.data.outputs;k++){
					let pos = 0.2*( k )
					this.state.endpoints.push(
						jsPlumb.addEndpoint(props.data.id, {
					    	anchors:[[1,pos,0,0]]
						},config.commonSource)
					)
				}
				this.setState(this.state)
        	});
		},0)
	}
	selectComponent(){
		this.props.DashboardStore.selectComponent(this.props.data)
	}
	render() {
		let { id,text } = this.props.data
		return (
       		<div id={ id } className="item" onClick={ this.selectComponent.bind(this) }>
				<span className="itemPreviewText">{ text }</span>
			</div>
		);
	}
}

export default Component;