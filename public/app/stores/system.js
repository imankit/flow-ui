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

	getAllSystems(){
		axios.get('/api/graph/all').then((data) => {
			this.systems = data.data
		},(err) => {

		})
	}

	addSystem(postObject){
		axios.post('/api/graph',postObject).then((data) => {
			this.getAllSystems()
		},(err) => {

		})
	}

	selectSystem(sysData){
		this.selectedSystem = sysData
	}

	addPreviewComponent(name,graphId){
		return  axios.put('/api/graph/component',{graphId:graphId,name:name}).then((res)=>{
					return  axios.get('/api/graph/all').then((res)=>{
								this.systems = res.data
								this.selectedSystem = this.systems.filter(x => x._id == graphId)[0]
								return Promise.resolve(this.selectedSystem)
							})
				},(err)=>{
					return Promise.reject(err)
				})
	}

	deleteSystem(postObject){
		
		axios({
			method: 'delete',
			url: '/api/graph',
			data: postObject
		}).then((data) => {
			this.getAllSystems()
		},(err) => {

		})
		this.selectedSystem = {}
	}

}

const system_store = new System_Store()

export default system_store