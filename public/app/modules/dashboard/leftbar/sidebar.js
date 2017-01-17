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
	render() {
		let components = this.props.SystemStore.selectedSystem.components
		if(components){
			components = components.map((x,i)=>{
				return <ComponentPreview inputs={ 2 } outputs={ 2 } key={ i } id={ "itemPre"+ i } name={ x }/>
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