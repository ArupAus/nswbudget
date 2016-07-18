React = require 'react'
{div, p, a, span, button, strong, img} = React.DOM
module.exports = React.createFactory React.createClass
	render: ->
		# Needs to have the NSW business logo in there somewhere, top left.
		div className:'drawer intro',
			p className:'lead',
				"The "
				a href:"http://www.budget.nsw.gov.au/home/budget_papers_links/infrastructure_statement", target:"_blank", "2016-17 Budget"
				" provides for a record capital spend of "
				strong null, "$73.3 billion"
				" in the four years to 2019-20. The Government’s commitment in 2016-17 is "
				strong null, "$21.8 billion"
				". This includes "
				strong null, "672" 
				" major infrastructure projects and programs to realise opportunities for economic growth and provide for our communities."
			p null,
				strong null, "Mapping the Budget"
				" highlights the key areas of spend. You can use the map to explore projects across planning regions and Local Government Areas (LGA), or filter by agency and project type."
			@props.filter
			div className:'key',
				div className:'keyItem',
					img src:require('../images/priority.png'), className:'icon'
					div null,
						span null, ' - '
						a href:'https://www.nsw.gov.au/premiers-priorities', target:"_blank", "Premier's priorities"
				div className:'keyItem',
					img src:require('../images/spatial.png'), className:'icon'
					div null,
						span null, ' - Projects with icon on map'
			p className:'sourceData',
				"Visit "
				a href:'http://www.budget.nsw.gov.au/', target:"_blank", "NSW Budget"
				" for more information on the NSW Budget 2016-17. Source data is available from "
				a href: 'http://data.nsw.gov.au/data/dataset/nsw-budget-paper-2', target:"_blank", "Data.nsw.gov.au"
				"."

			button  onClick:@props.routeToMain, className:'intro-button-close', 'Let me explore'
			div className:'clearfix'
