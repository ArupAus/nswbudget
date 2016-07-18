React = require 'react'
{div, p, a, span, button} = React.DOM
module.exports = React.createFactory React.createClass
	shouldComponentUpdate: (props) ->
		false

	render: ->
		shareURL = encodeURI(window.location.href.replace(/#.*/, ''))

		div className:'share-buttons',
			a className:'fb-share-button','data-href':shareURL,'data-layout':'button'

			a className:'twitter-share-button',href:'https://twitter.com/share','data-url':shareURL,'data-count':'none','data-hashtags':'NSWBudget2016,MappingTheBudget,nswpol', 'Tweet'

			div dangerouslySetInnerHTML:{__html:'<script type="IN/Share" data-url="' + shareURL + '" data-counter="none"></script>'}
