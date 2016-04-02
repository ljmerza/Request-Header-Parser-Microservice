'use strict'

const express = require("express")
const fs = require('fs')

const app = express()

app.use(express.static('.'))

app.get('/api/whoami/', function(req,res){
	let  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	let lang = req.headers["accept-language"].split(',')[0]
    let os = req.headers['user-agent'].split('(')[1].split(')')[0]
    
    res.json({
    	"ipaddress": ip,
    	"language": lang,
    	"software": os
    })
})

app.get('*', function(req, res){
	res.set('content-type','text/html')
    res.send(fs.readFileSync(__dirname + '/index.html','utf8'))
})

app.listen(process.env.PORT || 80, function(){
	console.log('server listening')
})