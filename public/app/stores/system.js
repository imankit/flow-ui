import { observable,computed } from 'mobx'
import axios from 'axios'

class System_Store {
	@observable systems = []
	@observable selectedSystem = {}

	@computed get getSystems(){
		if(this.systems.length){
			return this.systems
		} else return false
	}

	addSystem(data){
		this.systems.push(data)
	}

	selectSystem(sysData){
		this.selectedSystem = sysData
	}

	deleteSystem(id){
		this.systems = this.systems.filter(x => x.id != id)
		this.selectedSystem = {}
	}

}

const system_store = window.system_store = new System_Store()

export default system_store