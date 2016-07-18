React = require 'react'
Number = require '../number/index.coffee'
numeral = require 'numeral'
{h3, h5, img, table, tbody, tr, td, p, i, div, span} = React.DOM

module.exports = React.createFactory React.createClass
	getInitialState: ->
		{
			zoomActive:true
		}

	zoomTo: ->
		@props.zoomTo @props.item

	getLastValidUrl: ->
		lastValidUrl = undefined
		i = window.manualHistory.length - 1
		while i >= 0
			console.log(i, window.manualHistory[i].name)
			if window.manualHistory[i].name == 'region' or window.manualHistory[i].name == 'lga' or window.manualHistory[i].name == 'home'
				return lastValidUrl = window.manualHistory[i]
			i--

	close: ->
		# Allows coverage for multiple use cases:
		# - user closing popup after viewing region/lga
		# - user closing popup after reaching project via social share link
		# - accounts for the last URL being a project/multiple projects too
		#   (user browsing project to project, returns them to previous LGA/region if applicable)
		# - also accounts for history only containing projects
		# - solved table and search cases (when user searches directly and popup behaves unexpectedly)
		# Ensures that the user is sent back to the right page.
		# Retains filter queries

		lastValidUrl = @getLastValidUrl()
		lastLocation = lastValidUrl.fragment.replace('region/', '').replace('lga/', '') unless lastValidUrl == undefined

		if lastLocation == undefined
			queryString = ''
		else
			queryString = lastLocation.match(/\?.*/)
			lastLocation = lastLocation.replace(/\?.*/, '')

		if queryString == null
			queryString = ''
		else
			queryString = queryString[0]

		lastLocation = decodeURIComponent(lastLocation)
		project = @props.item
		projectLga = project.lgas[0]
		projectRegion = ''
		unless projectLga == ''
			_.each(@props.lgas, (obj) ->
				if obj.properties.LGA_NAME13 == projectLga
					projectRegion = obj.properties.REGION
					return
			)

		unless lastLocation == projectLga or lastLocation == projectRegion
			window.router.navigate('' + queryString, true)
			@props.selectProject undefined
			return

		if window.manualHistory.length <= 1 # manualHistory = 1 as soon as page as visited.
			window.router.navigate('' + queryString, true)
		else
			lastUrl = if lastValidUrl == undefined then '' else lastValidUrl.fragment
			window.router.navigate(lastUrl, true)

		@props.selectProject undefined

	render: ->
		end = null
		if not @props.item
			return div null
		if not @props.item.geometry
			end = p className:"nolocate",
				React.DOM.i null, "No specific location available"
		else if @state.zoomActive
			end = div {className:"locate",onClick:@zoomTo}, "Zoom To"
		priority = null
		if @props.item.priority
			priority = div className:"priority", "Premier’s Priority"
		div className:'popup',
			div {className:'popup-close',onClick:@close}, '✖'
			h5 className:'popup-title',
				img className:'popup-image',src:@props.item.type.img.color
				span className:'popup-type',@props.item.type.id
			h3 null, @props.item.name
			priority
			table null,
				tbody null,
					tr null,
						td className:"popup-title", "Delivery Agency"
					tr null,
						td className:"popup-value", @props.item.agency
					tr null,
						td className:"popup-title", "Estimated Total Cost (ETC) ",
							span className:"abbr", "($’000)"
					tr null,
						td className:"popup-value", Number(value:@props.item.ETC/1000)
					tr null,
						td className:"popup-title", "Commitment for 2016-17 Financial Year ",
							span className:"abbr", "($’000)"
					tr null,
						td className:"popup-value", Number(value:@props.item.Alloc/1000)
			end
