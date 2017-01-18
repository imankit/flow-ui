const router = require('express').Router();
const Graph = require('../app/models/graph');
const PackageJSON = require('../package.json')
const noflo = require('noflo');

module.exports = function(){

	router.get('/status',function(req,res){
		res.status(200).send('OK')
	})

	router.get('/graph/all',function(req,res){
		let graphs = Graph.find({},(err,data)=>{
			if(err) res.status(500).send('INTERNAL SERVER ERROR')
			res.status(200).json(data)
		})
	})

	router.post('/graph',function(req,res){
		if(validate(req.body.name,"string"),validate(req.body.type,"string")){
			let graph = new Graph()
			//init noflow graph
			graph.graph = noflo.graph.createGraph(req.body.name)
			graph.description = req.body.description ? req.body.description : null
			graph.created_on = new Date()
			graph.type = {
				type:req.body.type.toUpperCase()
			}
			graph.save((err)=>{
				if(err) res.status(500).send('INTERNAL SERVER ERROR')
				res.status(200).send('SUCCESS')
			})
		} else res.status(400).send('INVALID REQUEST')
	})

	router.delete('/graph',function(req,res){
		if(validate(req.body.id,"string")){
			Graph.remove({_id:req.body.id},(err)=>{
				if(err) res.status(500).send('INTERNAL SERVER ERROR')
				res.status(200).send('SUCCESS')
			})
		} else res.status(400).send('INVALID REQUEST')
	})

	router.put('/graph/component',function(req,res){
		if(validate(req.body.name,"string"),validate(req.body.graphId,"string"),validate(req.body.pkg,"string")){
			Graph.findOne({_id:req.body.graphId},(err,graph)=>{
				try{
					if(err) res.status(500).send('INTERNAL SERVER ERROR')
					let uri = '../node_modules/'+req.body.pkg+'/components/'+req.body.name+'.coffee'
					let comp = require(uri)
					if(graph.components.length == graph.components.filter(comp => comp.name != req.body.name).length){
						graph.components.push({
							name:req.body.name,
							data:comp.getComponent()
						})
					}
					graph.markModified('components')
					graph.save((err)=>{
						res.status(200).send('ADDED')
					})
				} catch(e){
					res.status(400).send('NO PACKAGE/COMP FOUND')
				}
			})
		} else res.status(400).send('INVALID REQUEST')
	})

	router.put('/graph/node',function(req,res){
		if(validate(req.body.name,"string"),validate(req.body.graphId,"string")){
			Graph.findOne({_id:req.body.graphId},(err,graph)=>{
				try{
					if(err) res.status(500).send('INTERNAL SERVER ERROR')
					let nodeId = Math.random().toString(36).substring(7)
					Object.setPrototypeOf(graph.graph,noflo.Graph.prototype)
					graph.graph.addNode(nodeId,req.body.name)
					graph.markModified('graph')
					graph.save((err)=>{
						res.status(200).send('NODE ADDED')
					})
				} catch(e){
					console.log(e)
					res.status(400).send('NO PACKAGE/COMP FOUND')
				}
			})
		} else res.status(400).send('INVALID REQUEST')
	})

	router.get('/test/graph',function(req,res){
		//init graph
		let graph = noflo.graph.createGraph('test')

		//Add comps
		graph.addNode("Read","ReadFile")
		graph.addNode("Display","Output")

		res.json(graph)

		//connect above comps
		graph.addEdge("Read",'out','Display','in')

		//send initial data
		graph.addInitial("models/graph.js","Read","in")
		// graph.addInitial("testStrings","Display","in")

		//run
		let network = noflo.createNetwork(graph,function(err,nw){
			// nw.connect(function(err) {
	          // if (err) {
	          //   return done(err);
	          // }
	          // return nw.start();
	        // });
		})
		
	})

	router.get('/package/all',function(req,res){
		flowPackages = Object.keys(PackageJSON.dependencies).filter( x => x.includes('noflo-') )
		res.status(200).json(flowPackages)
	})

	router.get('/package/info/:name',function(req,res){
		try {
			let packageJSON = require('../node_modules/'+req.params.name+'/package.json')
			if(packageJSON.noflo) res.status(200).json(packageJSON.noflo)
			 else res.status(400).send('INVALID PACKAGE')
		} catch(e){
			res.status(400).send('NO PACKAGE FOUND')
		}
		
	})
	
	return router
}

function validate(value,type){
	if(value === undefined || value === null || value === '') return false
	if(type && type != 'any'){
		if(typeof value != type) return false
	}
	return true
}