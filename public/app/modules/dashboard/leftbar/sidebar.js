import React from 'react';
import { observer,inject } from "mobx-react"
import ComponentPreview from './componentPreview'
import LeftTree from './leftTree'
import NPM from './npm'

@inject("DashboardStore") @observer
class Sidebar extends React.Component {
	constructor(){
		super()
		this.state = {
		}
	}
	componentDidMount(){
		 
	}
	render() {
		let Components = this.props.DashboardStore.previewComponents
		if(Components){
			Components = Components.map((x,i)=>{
				return <ComponentPreview inputs={ 2 } outputs={ 1 } key={ i } id={ "itemPre"+ i } name={ x }/>
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
	      				{ Components }
	       			</div>
	       		
       		</div>
		);
	}
}

export default Sidebar;