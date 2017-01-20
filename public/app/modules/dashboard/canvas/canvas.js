import React from 'react';
import { observer,inject } from "mobx-react"
import config from '../config.js'
import Component from './component.js'
import TopBar from './topBar.js'

@inject("DashboardStore","SystemStore") @observer
class Canvas extends React.Component {
	constructor(){
		super()
		this.state = {
			
		}
	}
	componentDidMount(){
		setTimeout(()=>{
			jsPlumb.ready(() => {
				let graph = this.props.SystemStore.selectedSystem.graph
				let edges = graph ? graph.edges : []
				edges.map((edge)=>{
					let fromUuid = edge.from.port + edge.from.node
					let toUuid = edge.to.port + edge.to.node
					jsPlumb.connect({ uuids:[fromUuid,toUuid] })
				})
        	});
		},500)
	}
	componentDidUpdate(){
		
	}
	getComponentMetadata(currComp){
		let metadata = {}
		this.props.SystemStore.selectedSystem.components.map((x)=>{
			if(currComp == x.name) metadata = x.data
			return x
		})
		return metadata
	}
	render() {
		let { graph,_id } = this.props.SystemStore.selectedSystem
		let components = []
		if(graph){
			components = graph.nodes.map((x,i)=>{
				return <Component data={ x } key={ i } graphId={ _id } metadata={ this.getComponentMetadata(x.component) } />
			})
		}
		return (
       		<div className="componentcanvas">
       			<TopBar/>
       			<div className="canvascomparea">
       				{ components }
       			</div>
       		</div>
		);
	}
}

export default Canvas;