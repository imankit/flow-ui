import React from 'react';
import { observer,inject } from "mobx-react"
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover'

class API extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			type:'GET',
			path:'',
			openType:false,
			openPath:false
		}
	}
	componentDidMount(){

	}
	handleTouchTap(which,event){
		event.preventDefault()
		this.state[which] = true
		this.state['anchorEl'] = event.currentTarget
		this.setState(this.state)
	};

	handleRequestClose(which){
		this.state[which] = false
		this.setState(this.state)
	};
	selectAPIType(type){
		this.state['type'] = type
		this.setState(this.state)
		this.handleRequestClose('openType')
	}
	changePath(e){
		this.setState({ path:e.target.value })
	}
	render() {
		return (
			<div className="">
				<span className="cardAPItype"><span className="APItypeandpathtext">Type:</span> <span className="cardAPItypevalue">{ this.state.type } <i className="ion-edit editicontypepath" onTouchTap={this.handleTouchTap.bind(this,'openType')}></i> </span> </span>
				<span className="cardAPIpath"><span className="APItypeandpathtext">Path:</span> <span className="cardAPIpathvalue">{ this.state.path } <i className="ion-edit editicontypepath" onTouchTap={this.handleTouchTap.bind(this,'openPath')}></i> </span> </span>
				<Popover
					open={this.state.openType}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose.bind(this,'openType')}
					animation={PopoverAnimationVertical}
					className="popapitype"
					>
					<span className="popupoptionsapitype" onClick={ this.selectAPIType.bind(this,'GET') }>GET</span>
					<span className="popupoptionsapitype" onClick={ this.selectAPIType.bind(this,'POST') }>POST</span>
					<span className="popupoptionsapitype" onClick={ this.selectAPIType.bind(this,'PUT') }>PUT</span>
					<span className="popupoptionsapitype" onClick={ this.selectAPIType.bind(this,'DELETE') }>DELETE</span>
				</Popover>
				<Popover
					open={this.state.openPath}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose.bind(this,'openPath')}
					animation={PopoverAnimationVertical}
					className="poppath"
					>
					<input className="inputpath" value={ this.state.path } onChange={ this.changePath.bind(this) }/>
				</Popover>
			</div>
		);
	}
}

export default API;