React = require 'react'
{div, span, a} = React.DOM
_ = require 'lodash'
numeral = require 'numeral'
Number = require '../number/index.coffee'
module.exports = React.createFactory React.createClass
	getInitialState: ->
		{
			priority: true
		}
	wordify: (number) ->
		if number < 10
			[
				"Zero"
				"One"
				"Two"
				"Three"
				"Four"
				"Five"
				"Six"
				"Seven"
				"Eight"
				"Nine"
			][number]
		else number

	render: ->
		location = 'New South Wales'

		if @props.region
			location = @props.region.id

		# If LGA has zero spend, show region spend instead.
		# Temp array storing projects from the last selected region.
		if @props.region and !@props.lga
			@regionProjects = @props.projects

		if @props.lga
			# Shows regions instead of lgas with no projects
			# if @props.projects.length == 0
			# 	location = @props.region.id
			# 	@props.projects = @regionProjects
			# else
			location = @props.lga.id

		totalETC = _.reduce @props.projects,(memo,d) ->
			if !isNaN(+d.ETC)
				return memo + d.ETC
			return memo
		, 0

		totalAlloc = _.reduce @props.projects,(memo,d) ->
			if !isNaN(+d.Alloc)
				return memo + d.Alloc
			return memo
		, 0

		items = [
			span className: 'summary-big', @wordify @props.projects.length
			" Project#{if @props.projects.length is 1 then '' else 's'} in "
			span className: 'summary-big', location
		]

		div className: 'summary', items
