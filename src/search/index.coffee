Number = require '../number/index.coffee'
React = require 'react'
{div,input, table, thead, tbody, tr, td, th, form} = React.DOM


DepartmentRow = React.createFactory React.createClass
	render: ->
		tr null,
			th null, @props.agency

ProjectRow = React.createFactory React.createClass
	click: ->
		@props.close()
		# Resets map to NSW view.
		@props.selectRegion undefined
		window.router.setInitialFalse()
		window.router.navigate('project/' + @props.id, true)
	render: ->
		name = @props.item.name.replace(@props.regex, (d) -> '<span class="search-result-match">' + d + '</span>')
		tr className:'search-result-item',onClick:@click,
			td dangerouslySetInnerHTML:{__html:name}

LGARow = React.createFactory React.createClass
	click: ->
		@props.close()
		window.router.setInitialFalse()
		window.router.navigate('lga/' + @props.id, true)
	render: ->
		name = @props.item.id.replace(@props.regex, (d) -> '<span class="search-result-match">' + d + '</span>')
		tr className:'search-result-item',onClick:@click,
			td dangerouslySetInnerHTML:{__html:name}

NoResultsRow = React.createFactory React.createClass
	render: ->
		tr className:'search-result-item',
			td dangerouslySetInnerHTML:{__html:'Sorry, there are no results that match your search'}


ResultTable = React.createFactory React.createClass
	sort: (a, b) ->
		return -1 if a.agency < b.agency
		return 1 if a.agency > b.agency
		return -1 if a.name < b.name
		return 1 if a.name > b.name
		return 0
	render: ->
		rows = []
		lastDepartment = null
		regex = new RegExp(@props.filterText,'i')
		first = true
		srt = (a, b) ->
			return -1 if a.id < b.id
			return 1 if a.id > b.id
			return 0
		@props.lgas.sort(srt).forEach (item) =>
			return if not regex.test item.id
			rows.push DepartmentRow(agency:'LGA', key:'LGA') if first
			first = false
			rows.push LGARow(select: @props.selectLGA, item:item, key:item.id, id:item.id, regex:regex, close:@props.close)

		@props.projects.sort(@sort).forEach (item) =>
			return if not regex.test item.name
			if item.agency isnt lastDepartment
				rows.push DepartmentRow(agency:item.agency, key:item.agency)
			rows.push ProjectRow(select: @props.selectProject, item:item, key:item.id, id:item.id, regex:regex, close:@props.close, selectRegion:@props.selectRegion)
			lastDepartment = item.agency

		# This works, when it's empty rows is given a NoResultsRow (passes in a proxyconstructor)
		if rows.length == 0
			rows.push NoResultsRow()

		table {className:'search-result-list', onClick:@click},
			tbody null, rows

SearchBar = React.createFactory React.createClass
	handleChange: ->
		@props.onUserInput(@refs.input.value)
	focus: (e) ->
		@props.open()
		e.stopPropagation()
		no
	click: (e) ->
		e.stopPropagation()
		no

	handleSubmit: (e) ->
		e.preventDefault()

	render: ->
		form {onSubmit:@handleSubmit, onFocus:@focus, onClick: @click},
			input {className:'search-input',ref:'input', onChange: @handleChange, type:'text', placeholder: 'Search for a Council or Project...', value:@props.filterText}




module.exports = React.createFactory React.createClass
	getInitialState: ->
		{
			filterText: ''
			open: false
			lgas: []
		}
	handleUserInput: (filterText) ->
		@setState
			filterText: filterText
	selectLGA: (lga) ->
		@props.selectLGA lga
		@removeRegionLayer lga
		@close()
	selectProject: (project) ->
		@props.selectProject project
		@removeRegionLayer project
		@close()

	removeRegionLayer: (object) ->
		regionName = ''

		# If object arg is a project.
		if object.lgas
			# May not necessarily work visually for projects with multiple regions.
			# Could get an array of all relevant regions and use apply().
			lga = object.lgas[0]

			_.each @props.lgas, (d) ->
				if d.id == lga
					regionName = d.properties.REGION
		# If the object arg is an lga.
		else
			regionName = object.properties.REGION

		region = ''

		_.each @props.regions, (d) ->
			if d.id == regionName
				region = d

		@props.selectRegion region

	open: ->
		@setState open:yes
	close: ->
		@setState open:no
		@setState filterText: ''

	render: ->
		result = null
		result = ResultTable(selectProject:@selectProject, selectLGA:@selectLGA, projects:@props.projects,lgas:@props.lgas,filterText:@state.filterText, close:@close, selectRegion:@props.selectRegion) if @state.open
		mask = null
		if result
			mask = div {className:'search-mask', onClick: @close}

		div className: 'search',
			mask
			SearchBar(filterText:@state.filterText, onUserInput:@handleUserInput, open:@open)
			result
