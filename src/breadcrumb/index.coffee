React = require 'react'
{ol, li, a, span} = React.DOM

module.exports = React.createFactory React.createClass
	routeToParentRegion: (regionId) ->
		query = Backbone.history.fragment.match(/\?f=([^&]*)/)
		query = query[0] unless query == null
		query = '' if query == null

		encodedRegion = encodeURIComponent(regionId)
		window.router.navigate('region/' + encodedRegion + query, true)

	resetToNSW: ->
		query = Backbone.history.fragment.match(/\?f=([^&]*)/)
		query = query[0] unless query == null
		query = '' if query == null

		window.router.navigate('' + query, true)

	centreLayer: (obj) ->
		@props.map.fitBounds obj.layer.getBounds()

	render: ->
		lga = @props.lga
		region = @props.region

		if region and lga
			ol className:'breadcrumb',
				li className:'breadcrumb-nsw',
					a onClick:@resetToNSW, 'New South Wales'
				li className:'breadcrumb-region',
					a onClick:@routeToParentRegion.bind(@, region.id), region.id
				li className:'breadcrumb-lga',
					a onClick:@centreLayer.bind(@, lga),className:'breadcrumb-lga-name', lga.id
					span onClick:@routeToParentRegion.bind(@, region.id), className:'breadcrumb-lga-close', '(clear LGA filter)'

		else if region
			ol className:'breadcrumb',
				li className:'breadcrumb-nsw',
					a onClick:@resetToNSW, 'New South Wales'
				li className:'breadcrumb-region',
					a onClick:@centreLayer.bind(@, region),className:'breadcrumb-region-name', region.id
					span onClick:@resetToNSW, className:'breadcrumb-region-close', '(clear region filter)'
		else
			ol className:'breadcrumb',
				li className:'breadcrumb-nsw',
					a onClick:@resetToNSW, 'New South Wales'
