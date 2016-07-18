React = require 'react'
Intro = require '../intro/index.coffee'
About = require '../about/index.coffee'
{ol, li, a, span, div, button, p, img} = React.DOM

module.exports = React.createFactory React.createClass
	getInitialState: ->
		tab: 'intro'

	routeToMain: ->
		currentUrl = Backbone.history.getFragment()
		if currentUrl.indexOf('?f=') != -1
			currentUrl = currentUrl.replace(/(&i=true)/, '')
		else
			currentUrl = currentUrl.replace(/(\?i=true)/, '')
		window.router.navigate(currentUrl, true)

	update: (e) ->
		text = e.target.innerText || e.target.textContent

		tab = text.toLowerCase()
		@setState tab:tab
		$('.modal-nav-link').removeClass('modal-nav-active')
		$('.modal-nav-' + tab).addClass('modal-nav-active')

	switchTo: (tab) ->
		# If a lot more get added, can change to a switch.
		if tab == 'about'
			About(handleModal:@handleModal)
		else
			Intro(handleModal:@handleModal, filter:@props.filter, routeToMain:@routeToMain)

	render: ->
		div className:'modal-container',
			div className:'modal-content',
				div className:'modal-nav',
					a className:'modal-nav-logo',href:'http://www.nsw.gov.au',target:"_blank",
						img src:require('../images/logo.png')

					a className:'modal-nav-link modal-nav-intro modal-nav-active',onClick:@update,
						'INTRO'

					a className:'modal-nav-link modal-nav-about',onClick:@update,
						'ABOUT'

					# Other sections here, don't forget to require them at top of script.

					a className:'modal-nav-link modal-nav-close',onClick:@routeToMain,
						'X'
				div className:'modal-body',
					@switchTo @state.tab
