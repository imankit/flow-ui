import React from 'react';
import { observer,inject } from "mobx-react"
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import config from '../config.js'
import Component from './component.js'

@inject("DashboardStore") @observer
class TopBar extends React.Component {
	constructor(){
		super()
		this.state = {
			zoom:100,
			open: false
		}
	}
	componentDidMount(){
		
	}
	selectZoom(zoom){
		this.setState({zoom:zoom})
		this.handleRequestClose()
		setTimeout(()=>{
			let canvas = $('.canvascomparea')
			let canvasZoom = this.state.zoom+"%"
		    canvas.css('zoom',canvasZoom)
		    // jsPlumb.repaintEverything();
		},0)
	}
	handleTouchTap(event){
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};
	handleRequestClose(){
		this.setState({
			open: false
		});
	};
	render() {
		return (
   			<div className="topbarcanvas">
   				<span className="platforminfo">Platform <span className="platforminfotype">NodeJs</span></span>
   				<span className="zoomselector cp" onTouchTap={this.handleTouchTap.bind(this)}>{ this.state.zoom }% <i className="fa fa-caret-down zoomcaret cp" aria-hidden="true"></i></span>
   				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose.bind(this)}
					animation={PopoverAnimationVertical}
					className="zoompopover"
		        >
		        	<span className="zoomoptionspans" onClick={ this.selectZoom.bind(this,20) }>20%</span>
		        	<span className="zoomoptionspans" onClick={ this.selectZoom.bind(this,35) }>35%</span>
		        	<span className="zoomoptionspans" onClick={ this.selectZoom.bind(this,50) }>50%</span>
		        	<span className="zoomoptionspans" onClick={ this.selectZoom.bind(this,75) }>75%</span>
		        	<span className="zoomoptionspans" onClick={ this.selectZoom.bind(this,100) }>100%</span>
		        </Popover>
   			</div>
		);
	}
}

export default TopBar;