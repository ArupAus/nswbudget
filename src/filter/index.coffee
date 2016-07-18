React = require 'react'
_ = require 'lodash'

INACTIVE_COLOR = '#f3f3f3'
{div,h3, img, span, a, div,ul,li,input, label, h3, span, p} = React.DOM

window.jQuery = window.$ = require("jquery")

Icons = React.createFactory React.createClass
	select: (type) ->
		window.router.setInitialFalse()
		currentUrl = Backbone.history.getFragment()
		newUrl = currentUrl.replace(/\?.*/, '')
		if currentUrl.indexOf(type.id) == -1
			newUrl = newUrl + '?f=' + encodeURIComponent(type.id)

		window.router.navigate(newUrl, true)

	clear: ->
		@props.clear()

	render: ->
		icons = []
		for typeid, type of @props.types
			if @props.initial and !@props.modal
				color = INACTIVE_COLOR
				accessor = 'grey'
			else
				# If this type is selected or if there are no selected types
				if @props.selected is type or not @props.selected
					color = type.color
					accessor = 'color'
				else
					color = INACTIVE_COLOR
					accessor = 'grey'

			icons.push span className:'filter-type-icon-item',
				img src:type.img[accessor],onClick:@select.bind(@,type),className:'filter-type-icon',key:type.id
				div null, type.id


		iconel = div className:'filter-type-icon-list', icons

		div className:'filter-type',
			iconel


Agencies = React.createFactory React.createClass

	render: ->
		agencies = _.uniq(@props.projects.map((d) -> d.agency))
		rows = []
		for agency in agencies.sort()
			checked = true
			if @props.agencyfilter[agency]
				checked = false

			rows.push li key:agency, className:'filter-agency-item',
				label className:'filter-agency-item-label',
					input className:'filter-agency-item-label',type:'checkbox', checked:checked, onChange:@props.toggleAgency.bind(@,agency)
					agency

		div className:'filter-agency',
			div className:'filter-agency-list-container',
				ul className:'filter-agency-list', rows


module.exports = React.createFactory React.createClass
	toggleAgency: (agency) ->
		@props.toggleAgency agency
	all: ->
		agencies = _.uniq(@props.projects.map((d) -> d.agency))
		for agency in agencies
			if @props.agencyfilter[agency]
				@toggleAgency agency
	none: ->
		agencies = _.uniq(@props.projects.map((d) -> d.agency))
		for agency in agencies
			if not @props.agencyfilter[agency]
				@toggleAgency agency

	filterAll: ->
		# show all projects on map
		window.router.setInitialFalse()
		window.router.navigate('', true)

	filterNone: ->
		# hide all projects from map
		window.router.setInitialTrue()
		window.router.navigate('', true)

	render: ->
		if @props.type
			ttt = span null, @props.type.id

			cleartype = span className:'link',onClick:@props.clearType,  'clear'

		onClick = @onClick
		div className:'filter',
			p className:'hint','Filter by Project Type:'
			div className:'filter-content open',
				Icons(
					open:@props.open
					types:@props.types,
					projects:@props.projects,
					selected:@props.type,
					select:@props.selectType,
					clear:@props.clearType
					initial:@props.initial
					modal:@props.modal
				)
			unless @props.modal
				div className:'filter-type-all-none',
					'Filter types: '
					span null,
						span className:'link',onClick:@filterAll,  'All'
						span null, ' / '
						span className:'link',onClick:@filterNone,  'None'
