var router = require('express').Router();
var Graph = require('../app/models/graph');
var PackageJSON = require('../package.json')

module.exports = function(){

	router.get('/status',function(req,res){
		res.status(200).send('OK')
	})

	router.get('/package/all',function(req,res){
		flowPackages = Object.keys(PackageJSON.dependencies).filter( x => x.includes('noflo-') )
		res.status(200).json(flowPackages)
	})

	router.get('/package/info/:name',function(req,res){
		try {
			var packageJSON = require('../node_modules/'+req.params.name+'/package.json')
			if(packageJSON.noflo) res.status(200).json(packageJSON.noflo)
			 else res.status(400).json('INVALID PACKAGE')
		} catch(e){
			res.status(400).json('NO PACKAGE FOUND')
		}
		
	})
	
	return router
}