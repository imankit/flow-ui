import React from 'react';
import { observer,inject } from "mobx-react"
import ComponentPreview from './componentPreview'

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
		return (
       		<div className="sidbarcomponent">
	      			<div className="sidebarHeading">
	      				<span className="headingComp">Components</span>
	      			</div>
	       			<ComponentPreview inputs={ 2 } outputs={ 1 } key={ 1 } id={ "itemPre"+ 1 }/>
	       			<ComponentPreview inputs={ 2 } outputs={ 2 } key={ 2 } id={ "itemPre"+ 2 }/>
	       			<ComponentPreview inputs={ 1 } outputs={ 1 } key={ 3 } id={ "itemPre"+ 3 }/>
	       			<ComponentPreview inputs={ 3 } outputs={ 1 } key={ 4 } id={ "itemPre"+ 4 }/>
	       			<ComponentPreview inputs={ 3 } outputs={ 3 } key={ 5 } id={ "itemPre"+ 5 }/>
	       			<ComponentPreview inputs={ 2 } outputs={ 3 } key={ 6 } id={ "itemPre"+ 6 }/>
	       			<ComponentPreview inputs={ 1 } outputs={ 2 } key={ 7 } id={ "itemPre"+ 7 }/>
	       		
       		</div>
		);
	}
}

export default Sidebar;