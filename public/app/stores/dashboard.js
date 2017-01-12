import { observable,computed } from 'mobx'
import axios from 'axios'

class Dashboard {
	@observable previewComponents = []
	@observable components = []
	@observable packages = []
	@observable selectedComponent = {}


	@computed get getComponents(){
		if(this.components.length){
			return this.components
		} else return false
	}

	@computed get getPackages(){
		if(this.packages.length){
			return this.packages
		} else return false
	}

	getAllPackages(){
		axios.get('/api/package/all').then((data) => {
			this.packages = data.data
		},(err) => {

		})
	}

	fetchComponentsByPackage(comp){
		return axios.get('/api/package/info/'+comp)
	}

	addComponent(data){
		this.components.push(data)
	}

	addPreviewComponent(data){
		this.previewComponents.push(data)
	}

	addPackage(data){
		this.packages.push(data)
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