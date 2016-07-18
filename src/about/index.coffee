React = require 'react'
{div, p, a, span, button, h4, ul, li, ol, strong} = React.DOM
module.exports = React.createFactory React.createClass
	render: ->
		div className:'drawer about',
			p null,
				h4 null, "About"
				p null, "This website is an initiative of the NSW Government and has been developed by the Department of Planning and Environment."

			p null,
				h4 null, "Data Disclaimer"
				p null, "The project details in this mapping tool are the major works as listed in NSW Treasury 2016-17 Budget Paper 2 ‘Infrastructure Statement’ as published on 21 June 2016. Projects being delivered across various locations where the locations cannot be accurately identified are included in the State total only. A number of projects do not include Estimated Total Cost (ETC). Where shown, the notation “n.a.” means either data is not available or not disclosed due to commercial sensitivity. The State total in the mapping tool may not match that published in the Budget Papers. The difference includes minor works programs and inter-sector purchases. In collating the Budget Paper, NSW Treasury requests certain information from the delivery agencies including a project location - usually suburb. The location provided by the delivery agencies has informed the location you see on the map and best efforts have been made to verify each project location but, in some cases, the projects may not be located correctly. The Department of Planning and Environment will continue to work with the agencies involved to verify each project location for accuracy."

			div className:'clearfix'
