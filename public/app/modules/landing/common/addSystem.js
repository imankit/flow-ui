import React from 'react';
import { observer,inject } from "mobx-react"
import Dialog from 'material-ui/Dialog'

@inject("SystemStore") @observer
class AddSystem extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			open:false,
			selectedSystem:null,
			name:'',
			description:''
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
	selectSystemType(which){
		this.setState({selectedSystem: which})
	}
	addSystem(e){
		e.preventDefault()
		let type = "API"
		if(this.state.selectedSystem == 1) type = "TRIGGER"
		if(this.state.selectedSystem == 2) type = "WORKER"
		let postObject = {
			id:Math.random().toString(36).substring(7),
			type:type,
			name:this.state.name,
			description:this.state.description
		}
		this.props.SystemStore.addSystem(postObject)
		this.setState({
			selectedSystem:null,
			name:'',
			description:''
		})
		this.handleClose()
	}
	changeHandler(which,e){
		this.state[which] = e.target.value
		this.setState(this.state)
	}
	render() {
		return (
	        <div className="buttonaddsystem cp" onTouchTap={this.handleOpen.bind(this)}>
	        	+ New System
				<Dialog
					title="New System"
					titleClassName="newsystemtitle"
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose.bind(this)}
					bodyClassName="newsystemrootclass"
					contentClassName="contentclassaddsystme"
				>
					<form onSubmit={ this.addSystem.bind(this) }>
						<input required className="newsystemname" placeholder="System Name ." value={ this.state.name } onChange={ this.changeHandler.bind(this,'name') }/>
						<input className="newsystemname" placeholder="System Description ." value={ this.state.description } onChange={ this.changeHandler.bind(this,'description') }/>
						<span className="addsystemtypeselectspan">Choose system type:</span>
						<div onClick={ this.selectSystemType.bind(this,0) } className={ this.state.selectedSystem == 0 ? "systemtypedivselector selecttypeborder" : "systemtypedivselector" }><span className="systemtypetext">API</span></div>
						<div onClick={ this.selectSystemType.bind(this,1) } className={ this.state.selectedSystem == 1 ? "systemtypedivselector selecttypeborder" : "systemtypedivselector" }><span className="systemtypetext">TRIGGER</span></div>
						<div onClick={ this.selectSystemType.bind(this,2) } className={ this.state.selectedSystem == 2 ? "systemtypedivselector selecttypeborder" : "systemtypedivselector" }><span className="systemtypetext">WORKER</span></div>
						<div className="systemnewbtncontainer">
							<button className="systemmodalbuttonscreate" type="submit">Create System</button>
							<div className="systemmodalbuttonscancel" onClick={ this.handleClose.bind(this) } type="button">Cancel</div>
						</div>
					</form>
				</Dialog>
	        </div>
	           			
		);
	}
}

export default AddSystem;