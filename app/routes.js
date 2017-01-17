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
		if(validate(req.body.name,"string"),validate(req.body.graphId,"string")){
			Graph.findOne({_id:req.body.graphId},(err,graph)=>{
				if(err) res.status(500).send('INTERNAL SERVER ERROR')
				if(graph.components.indexOf(req.body.name) == -1){
					graph.components.push(req.body.name)
					graph.markModified('components')
					graph.save((err)=>{
						res.status(200).send('ADDED')
					})
				} else res.status(400).send('COMPONENT ALREADY ADDED')
			})
		} else res.status(400).send('INVALID REQUEST')
	})

	// router.get('/test/graph',function(req,res){
	// 	//init graph
	// 	let graph = noflo.graph.createGraph('test')

	// 	//Add comps
	// 	graph.addNode("Read","ReadFile")
	// 	graph.addNode("Display","Output")

	// 	//connect above comps
	// 	graph.addEdge("Read",'out','Display','in')

	// 	//send initial data
	// 	graph.addInitial("models/graph.js","Read","in")
	// 	// graph.addInitial("testStrings","Display","in")

	// 	//run
	// 	let network = noflo.createNetwork(graph,function(err,nw){
	// 		// nw.connect(function(err) {
	//           // if (err) {
	//           //   return done(err);
	//           // }
	//           // return nw.start();
	//         // });
	// 	})
		
	// })

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