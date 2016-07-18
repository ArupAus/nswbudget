React = require 'react'
_ = require 'lodash'

INACTIVE_COLOR = '#f3f3f3'
{div,h3, img, span, a, div,ul,li,input, label, h3, span} = React.DOM

window.jQuery = window.$ = require("jquery")



Agencies = React.createFactory React.createClass

	render: ->
		agencies = _.uniq(@props.projects.map((d) -> d.agency))
		rows = []
		for agency in agencies.sort()
			checked = true
			if @props.agencyfilter[agency]
				checked = false

			rows.push li key:agency, className:'agencyFilter-agency-item',
				label className:'agencyFilter-agency-item-label',
					input className:'agencyFilter-agency-item-label',type:'checkbox', checked:checked, onChange:@props.toggleAgency.bind(@,agency)
					agency

		div className:'agencyFilter-agency',
			div className:'agencyFilter-agency-list-container',
				ul className:'agencyFilter-agency-list', rows



Bar = React.createFactory React.createClass
	select: (type) ->
		if @props.selected is type
			@props.select undefined
		else
			@props.select type
	clear: ->
		@props.clear()
	onClick: ->
		if not @props.open
			@props.toggleOpen()
			return no
		return

	render: ->
		counts = _.countBy(@props.projects, (d) ->
			d.type.id
		)
		total = @props.projects.length
		rects = []
		for typeid in _.keys(counts).sort()
			count = counts[typeid]
			type = @props.types[typeid.replace(' and ', 'And').replace(' ', '')]

			if @props.selected is type or not @props.selected
				color = type.color
				accessor = 'color'
			else
				color = INACTIVE_COLOR
				accessor = 'grey'
			rects.push div onClick:@select.bind(@,type),className:'agencyFilter-type-rect',key:type.id,style:{width:100*count/total+'%','backgroundColor':color}
		div className:'agencyFilter-type-list', onClick:@onClick, rects




module.exports = React.createFactory React.createClass
	toggleAgency: (agency) ->
		@props.toggleAgency agency
	toggleOpen: ->
		@props.toggleOpen()
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

	render: ->
		if @props.type
			ttt = span null, @props.type.id
			cleartype = span className:'link',onClick:@props.clearType,  'clear'

		if @props.open
			onClick = @onClick
			div className:'agencyFilter',
				Bar(
					toggleOpen:@props.toggleOpen
					open:@props.open
					types:@props.types,
					projects:@props.projects,
					selected:@props.type,
					select:@props.selectType,
					clear:@props.clearType
				)
				div className:'agencyFilter-content open',
					div className:'agencyFilter-collapse-button', onClick:@props.toggleOpen, 'close'
					div className:'agencyFilter-title-bar filter-agency-controls',
						"Select Agencies"
						span null,
							span className:'link',onClick:@all,  'All'
							span null, ' / '
							span className:'link',onClick:@none,  'None'
					Agencies(
						projects:@props.typeprojects,
						open:@props.open,
						agencyfilter:@props.agencyfilter,
						toggleAgency:@props.toggleAgency
					)
		else
			div className:'agencyFilter',
				Bar(
					toggleOpen:@props.toggleOpen
					open:@props.open
					types:@props.types,
					projects:@props.projects,
					selected:@props.type,
					select:@props.selectType,
					clear:@props.clearType
				)
				div className:'agencyFilter-expand',onClick:@props.toggleOpen, "Filter by Agency"
