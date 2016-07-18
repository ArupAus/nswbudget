React = require 'react'
numeral = require 'numeral'
{div, table, thead, tbody, tfoot, tr, th, td, img, span} = React.DOM
cx = require 'classnames'
Number = require '../number/index.coffee'

TableRow = React.createFactory React.createClass
	click: ->
		window.router.setInitialFalse()
		window.router.navigate('project/' + @props.item.id, true)

	render: ->
		selected = if @props.selected is @props.item then 'selected' else ''

		tr {onClick: @click,className:selected},
			td className: if @props.item.priority then 'priority' else ''
			td className: if @props.item.geometry then 'spatial' else ''
			td null, img src:@props.item.type.img.color
			td null, @props.item.name
			td null, @props.item.agency
			td className:'table-align-right', Number(value:@props.item.ETC/1000)
			td className:'table-align-right', Number(value:@props.item.Alloc/1000)

module.exports = React.createFactory React.createClass
	getInitialState: ->
		{
			sortBy: 'ETC'
			desc: true
			open: false
			all: false
			alphanumeric: 'numeric'
		}
	select: (item) ->
		@props.selectProject item
	sort: (a, b) ->
		if @state.desc
			pos = 1
			neg = -1
		else
			pos = -1
			neg = 1

		aVal = a[@state.sortBy]
		bVal = b[@state.sortBy]
		if @state.alphanumeric is 'numeric'
			if isNaN(+aVal)
				aVal = 0

			if isNaN(+bVal)
				bVal = 0

		return pos if aVal < bVal
		return neg if aVal > bVal
		return pos if a.Name < b.Name
		return neg if a.Name > b.Name
		0
	setSort: (type, alphanumeric) ->
		if @state.sortBy is type
			@setState desc:!(@state.desc), alphanumeric:alphanumeric
			return
		else
			@setState desc:false, sortBy:type, alphanumeric:alphanumeric
	all: ->
		@setState all:yes

	render: ->
		allrows = @props.projects.sort(@sort).map (d) => TableRow(key:d.id,item:d,select:@select, selected:@props.project)
		if allrows.length <= 10 or @state.all
			rows = allrows
			footer = undefined
		else
			rows = allrows.slice(0,10)
			footer = tfoot null,
				tr null,
					td className:'table-footer-more',onClick:@all, colSpan:6, 'Load more ...'


		table className: 'table',
			thead null,
				tr null,
					th {
						className: cx
							sort: @state.sortBy is 'priority'
							desc: @state.desc
						onClick: @setSort.bind(@, 'priority', 'alpha')
					}, img src:require('../images/priority.png'), className:'thImg'
					th {
						className: cx
							sort: @state.sortBy is 'geometry'
							desc: @state.desc
						onClick: @setSort.bind(@, 'geometry', 'numeric')
					}, img src:require('../images/spatial.png'), className:'thImg pin'
					th {
						className: cx
							sort: @state.sortBy is 'typeid'
							desc: @state.desc
						onClick: @setSort.bind(@, 'typeid', 'alpha')
					}, ''
					th {
						className: cx
							sort: @state.sortBy is 'name'
							desc: @state.desc
						onClick: @setSort.bind(@, 'name', 'alpha')
					}, 'Project Description'
					th {
						className: cx
							sort: @state.sortBy is 'agency'
							desc: @state.desc
						onClick: @setSort.bind(@, 'agency', 'alpha')
					}, 'Agency'
					th {
						className: cx
							sort: @state.sortBy is 'ETC'
							desc: @state.desc
						onClick: @setSort.bind(@, 'ETC', 'numeric')
					}, 'ETC ',
						span className:'abbr', '($’000)',
					th {
						className: cx
							sort: @state.sortBy is 'Alloc'
							desc: @state.desc
						onClick: @setSort.bind(@, 'Alloc', 'numeric')
					}, '2016-17 ',
						span className:'abbr', '($’000)',
			tbody null,
				rows
			footer
