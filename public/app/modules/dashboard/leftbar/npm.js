import React from 'react';
import { observer,inject } from "mobx-react"
import Dialog from 'material-ui/Dialog'

@inject("DashboardStore") @observer
class NPM extends React.Component {
	constructor(){
		super()
		this.state = {
			open:false,
			packageToSearch:'',
			componentView:false,
			components:[],
			selectedComponents:[]
		}
	}
	componentDidMount(){

	}
	handleOpen(){
		this.setState({open: true})
	}
	handleClose(){
		this.setState({open: false})
	}
	fetchComponents(comp){
		this.props.DashboardStore.fetchComponentsByPackage(comp).then((data)=>{
			let components = Object.keys(data.data.components)
			this.setState({
				components:components,
				componentView:true
			})
		},(err)=>{

		})
	}
	addComponent(comp){
		this.props.DashboardStore.addPreviewComponent(comp)
		this.setState({
				open:false,
				components:[],
				componentView:false
			})
	}
	togglePackages(what){
		this.setState({
			componentView:what
		})
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {

		let Packages = this.props.DashboardStore.packages
		let Components = this.state.components
		if(Components.length){
			Components = Components.filter( x => x.toLowerCase().includes(this.state.packageToSearch))
			.map((x,i)=>{
				return <div className="npmpackagebox" key={ i } onClick={ this.addComponent.bind(this,x) }><span className="npmtypetext">{ x }</span></div>
			})
		}
		if(Packages){
			Packages = Packages.filter( x => x.toLowerCase().includes(this.state.packageToSearch))
			.map((x,i)=>{
				return <div className="npmpackagebox" key={ i } onClick={ this.fetchComponents.bind(this,x) }><span className="npmtypetext">{ x }</span></div>
			})
		}
		return (
       		<div>
	       		<img className="npmicon" onTouchTap={this.handleOpen.bind(this)} src="/app/assets/images/npm.png"/>
				<Dialog
					title="Package Manager"
					titleClassName="newsystemtitle"
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose.bind(this)}
					bodyClassName="newsystemrootclass"
					contentClassName="contentclassaddsystme"
				>
					<input required className="newsystemname" placeholder="Search/Filter Package." value={ this.state.packageToSearch } onChange={ this.changeHandler.bind(this,'packageToSearch') }/>
					<span className="addsystemtypeselectspan">{ this.state.componentView ? "Component List:" : "Installed Packages:" }</span>
					<div className="packagelistcontainer">
						{ this.state.componentView ? Components : Packages }
					</div>
					<div className="npmewbtncontainer">
						<button className="systemmodalbuttonscreate" type="submit" onClick={ this.handleClose.bind(this) }>Done</button>
						<button className="systemmodalbuttonscancel" disabled={ !this.state.componentView } onClick={ this.togglePackages.bind(this,false) } type="button">Back</button>
					</div>
				</Dialog>
       		</div>
		);
	}
}

export default NPM;