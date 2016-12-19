import { observable,computed } from 'mobx'
import axios from 'axios'

class Dashboard {
	@observable components = []
	@observable selectedComponent = {}

	@computed get getComponents(){
		if(this.components.length){
			return this.components
		} else return false
	}

	addComponent(data){
		this.components.push(data)
	}

	selectComponent(compData){
		this.selectedComponent = compData
	}

	deleteComponent(id){
		this.components = this.components.filter(x => x.id != id)
		this.selectedComponent = {}
	}

	editComponent(id,whichProp,value){
		this.selectedComponent[whichProp] = value
		this.components = this.components.map((x)=>{
			if(x.id == id) x[whichProp] = value
			return x
		})
	}

}

const store = window.store = new Dashboard()

export default store