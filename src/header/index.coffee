React = require 'react'

{header, div, nav, a, img, span} = React.DOM

cx = require 'classnames'

module.exports = React.createFactory React.createClass
	showModal: ->
		currentUrl = Backbone.history.getFragment()
		if currentUrl.indexOf('?') != -1
			newUrl = currentUrl + '&i=true'
		else
			newUrl = currentUrl + '?i=true'
		window.router.navigate(newUrl, true)

	about: ->
		@props.about()

	render: ->
		header className:'header',
			div className:'header-bar',
				div className:'header-bar-wrap',
					# img className:'waratah',src:require('../images/waratah_no_text-01.png')
					img className:'waratah-text',src:require('../images/waratah_no_buffer-01.png')
					"MAPPING THE NSW BUDGET"
					span className:'header-bar-year', '2016-17'
					nav className:'header-right',
						a {
							className:cx('header-link':yes,active:@props.item is 'info')
							onClick:@showModal
						}, 'Information'
