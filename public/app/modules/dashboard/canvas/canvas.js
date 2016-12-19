import React from 'react';
import { observer,inject } from "mobx-react"
import config from '../config.js'
import Component from './component.js'
import TopBar from './topBar.js'

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
				
				jsPlumb.bind('connection',function(info,ev){
				    console.log(info)
				});
	            
	        	jsPlumb.draggable($('.item'),{
	        		containment:'.canvascomparea'
	        	});
        	});
		},0)
	}
	render() {
		let components = []
		if(this.props.DashboardStore.getComponents){
			components = this.props.DashboardStore.getComponents.map((x,i)=>{
				return <Component data={ x } key={ i }/>
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