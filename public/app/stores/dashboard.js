import { observable,computed } from 'mobx'
import axios from 'axios'

class Dashboard {
	@observable components = []

	@computed get getComponents(){
		if(this.components.length){
			return this.components
		} else return false
	}

	addComponent(data){
		this.components.push(data)
	}

}

const store = window.store = new Dashboard()

export default store