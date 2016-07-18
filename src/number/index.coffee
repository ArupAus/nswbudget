React = require 'react'
{span} = React.DOM
MILLION = 1e6
BILLION = 1e9
module.exports = React.createFactory React.createClass
	render: ->
		num = @props.value
		if isNaN(num) or num is null or num is 'CIC'
			return span className:'number number-NA', 'N.A.'
		num = +(num.replace(/,/g,'').trim()) if typeof num is 'string'

		if typeof num is 'undefined' or num is null or num is 'CIC'
			return span className:'number number-NA', 'N.A.'

		num *= 1000

		if @props.words
			if num >= BILLION
				num = num / BILLION
				span className:'number', '$' + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' Billion'
			else if num >= MILLION
				num = num / MILLION
				span className:'number', '$' + num.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' Million'
			else
				span className:'number', '$' + num.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' Million'

		else
			span className:'number', '$' + num.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
