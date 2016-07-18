var id = 0
var hasha = require('hasha')
var tocsv = require('to-csv')
module.exports = function(cb){
	var fs = require('fs')

	var data = fs.readFileSync(__dirname + '/src/budget.json', 'utf-8')
	var lines = fs.readFileSync(__dirname + '/src/projectLines.json', 'utf-8')

	lines = JSON.parse(lines)

	var lineNameLookup = {}
	var lineIdLookup = {}
	lines.features.forEach(function(d){
		lineNameLookup[d.properties.ProjectName] = d
		lineIdLookup[d.properties.ProjectID] = d
	})
	console.log('names', Object.keys(lineNameLookup).length)
	console.log('ids', Object.keys(lineIdLookup).length)

	data = JSON.parse(data)
	var out = {}

	var hadLine = 0
	for (var i in data.features){
		var feature = data.features[i];


		if (lineNameLookup[feature.properties.ProjectName]){
			hadLine++

			var oldgeo = feature.geometry
			var newgeo = {
				"type": "FeatureCollection",
				"geometries": [
					lineNameLookup[feature.properties.ProjectName].geometry,
				]
			}
			if (oldgeo && oldgeo.type) {
				newgeo.geometries.push(oldgeo)
			}
			feature.geometry = newgeo
		}

		feature.__uid = "UID" + id++

		out[feature.properties.AgencyName] = out[feature.properties.AgencyName] || {
			"name": "NSWBP2_2016",
			"type": "FeatureCollection",
			"features": []
		}
		out[feature.properties.AgencyName].features.push(feature)
	}
	console.log('hadLineforName', 55)
	var all = JSON.stringify(data)
	var hash = hasha(all);
	fs.writeFileSync(__dirname + '/dist/all.json', all, 'utf-8')
	fs.writeFileSync(__dirname + '/dist/' + hash + '.json', all, 'utf-8')
	console.log('hash:', hash)
	var mapping = []
	for (var i in out){

		var _hash = hasha(i);
		mapping.push({AgencyName:i, AgencyURL:"http://nswbudget-2016.s3-website-ap-southeast-2.amazonaws.com/?" + _hash})

		fs.writeFileSync(__dirname + '/dist/' + _hash + '.json', JSON.stringify(out[i]), 'utf-8')
	}
	fs.writeFileSync(__dirname + '/mapping.csv', tocsv(mapping), 'utf-8')
	cb()
}
