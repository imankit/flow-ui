import React from 'react';
import { observer,inject } from "mobx-react"
import TreeView from 'react-treeview'

@inject("DashboardStore") @observer
class LeftTree extends React.Component {
	constructor(){
		super()
		this.state = {
			collapsed:false
		}
	}
	componentDidMount(){
		 
	}
	toggleCollapse(){
		this.setState({collapsed:!this.state.collapsed})
	}
	selectComponent(compData){
		this.props.DashboardStore.selectComponent(compData)
	}
	deleteComponent(compId){
		this.props.DashboardStore.deleteComponent(compId)
	}
	render() {
		let components = []
		if(this.props.DashboardStore.getComponents){
			components = this.props.DashboardStore.getComponents.map((x,i)=>{
				return <div className="treechilddiv" key={ i }>
							<span onClick={ this.selectComponent.bind(this,x) } className="lefttreecompname">{ x.text }</span>
							<i className="fa fa-trash-o deletecomp cp" aria-hidden="true" onClick={ this.deleteComponent.bind(this,x.id) }></i>
						</div>
			})
		}
		return (
			<div className="treecontainerdiv">
	  			<div className="sidebarHeadingright">
	  				<span className="headingComp">Canvas Components</span>
	  			</div>
	  			<div className="treeViewContainer">
	  				<TreeView collapsed={ this.state.collapsed } nodeLabel={"Canvas"} onClick={ this.toggleCollapse.bind(this) }>
	  					{ components }
	  				</TreeView>
	  			</div>
	  		</div>
		);
	}
}

export default LeftTree;