require './index.styl'

require './ie.coffee'
L = require 'leaflet/dist/leaflet.js'

window.jQuery = window.$ = require("jquery")

App = require './App.coffee'
Modal = require './modal/index.coffee'

React = require 'react'
getRoot = require 'get-root'
ReactDOM = require 'react-dom'
numeral = require 'numeral'

app = ReactDOM.render App(), getRoot()

Backbone = require 'backbone'
Router = Backbone.Router.extend(
	routes:
		'': 'home'
		'?:query': 'home'
		'region/:region':'region'
		'region/:region?:query':'region'
		'lga/:lga':'lga'
		'lga/:lga?:query':'lga'
		'project/:project':'project'
		'project/:project?:query':'project'

	setInitialFalse: ->
		app.setState initial:false

	setInitialTrue: ->
		app.setState initial:true

	handleModal: (query) ->
		if query and query.indexOf('i=true') != -1
			app.setState modal:true
		else
			app.setState modal:false


	handleFilter: (query) ->
		if query and query.indexOf('f=') != -1
			filterId = query.match(/f=([^&]*)/)

			@findFilterType filterId[1]
		else if window.manualHistory.length == 1
			return
		else
			# Makes sure that click same filter icon removes the filter.
			app.selectType undefined

	findFilterType: (filterId) ->
		selectedType = null
		_.each(app.types, (type) ->
			if type.id == decodeURIComponent(filterId)
				selectedType = type
				return
			return
		)

		app.selectType(selectedType, true)

	findRegion: (regionName) ->
		selectedRegion = null
		_.each(app.state.regions, (region) ->
			if regionName == region.id
				selectedRegion = region
				return
			return
		)

		return selectedRegion

	findLGA: (lgaName) ->
		selectedLGA = null
		_.each(app.state.lgas, (lga) ->
			if lgaName == lga.id
				selectedLGA = lga
				return
			return
		)

		return selectedLGA

	findProject: (projectId) ->
		selectedProject = null
		_.each(app.state.projects, (project) ->
			if projectId == project.id
				selectedProject = project
				return
			return
		)

		return selectedProject

	home: (query) ->
		@setInitialFalse() if query
		@handleModal query
		if app.state.regions.length == 0 and app.state.projects.length == 0 and app.state.lgas.length == 0
			app.loadData(window.location.search.replace('?','')).done ->
				app.selectRegion undefined
				router.handleFilter query
				# Open modal if user has visited home page for first time (i.e. manualHistory == 1)
				# Need to make sure that the query is empty
				unless query and query.indexOf('f=') != -1
					router.navigate('?i=true', true)
		else
			app.selectRegion undefined
			router.handleFilter query

		# If popup is visible
		if app.state.project
			app.selectProject undefined


	region: (region, query) ->
		@setInitialFalse()
		@handleModal query

		if app.state.regions.length == 0 and app.state.projects.length == 0 and app.state.lgas.length == 0
			app.loadData(window.location.search.replace('?','')).done ->
				region = router.findRegion(decodeURIComponent(region))
				app.selectRegion(region)
				router.handleFilter query
		else
			region = router.findRegion(decodeURIComponent(region))
			app.selectRegion(region)
			router.handleFilter query


	lga: (lga, query) ->
		@setInitialFalse()
		@handleModal query

		if app.state.regions.length == 0 and app.state.projects.length == 0 and app.state.lgas.length == 0
			app.loadData(window.location.search.replace('?','')).done ->
				lga = router.findLGA(decodeURIComponent(lga))
				app.selectLGA(lga)
				router.handleFilter query
		else
			lga = router.findLGA(decodeURIComponent(lga))
			app.selectLGA(lga)
			router.handleFilter query

	project: (project, query) ->
		@setInitialFalse()
		@handleModal query

		if app.state.regions.length == 0 and app.state.projects.length == 0 and app.state.lgas.length == 0
			app.loadData(window.location.search.replace('?','')).done ->
				project = router.findProject(project)
				app.selectProject(project)
				router.handleFilter query
		else
			project = router.findProject(project)
			app.selectProject(project)
			router.handleFilter query
)

window.router = new Router

# Manually store history so that routing checks can be made.
# See src/popup/index.coffee
window.manualHistory = []
window.router.listenTo window.router, 'route', (name, args) ->
	window.manualHistory.push
		name: name
		args: args
		fragment: Backbone.history.fragment
	console.log window.manualHistory
	return

Backbone.history.start()
