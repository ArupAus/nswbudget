React = require 'react'
ReactDOM = require 'react-dom'
{div,h3, header,nav,a,span,img,footer,input} = React.DOM
cx = require 'classnames'
window.jQuery = window.$ = require("jquery")

Table = require './table/index.coffee'
Summary = require './summary/index.coffee'
BreadCrumb = require './breadcrumb/index.coffee'
Search = require './search/index.coffee'
Popup = require './popup/index.coffee'

Header = require './header/index.coffee'
Intro = require './intro/index.coffee'
About = require './about/index.coffee'
Share = require './share/index.coffee'
{Footer} = require './footer/index'
{CollapseControl} = require './collapseControl/index'
Filter = require './filter/index.coffee'
AgencyFilter = require './agencyFilter/index.coffee'
Modal = require './modal/index.coffee'


module.exports = React.createFactory React.createClass
	getInitialState: ->
		projects:[]
		project:undefined
		departments:[]
		lgas:[]
		lga:undefined
		regions: []
		region:undefined
		types:{}
		type:undefined
		agencyfilter:{}
		filteropen:no
		initial:true
		fullscreen:no
		modal:false

	clearType: ->
		@setState type:undefined

	selectType: (type, reset) ->
		out = 
			type: type
		
		out.agencyfilter = {} if reset
		@setState out

	toggleAgency: (agency) ->
		@state.agencyfilter[agency] = !@state.agencyfilter[agency]
		@setState agencyfilter: @state.agencyfilter

	types:
		CommunityServices:
			color: '#488645'
			id: 'Community Services'
			icon:
				color:L.icon(
					iconUrl:'images/icons/house-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/house-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/house-active-high.png'
				grey: 'images/icons/house-active-high-gray.png'

		Education:
			color: '#FFCB05'
			id: 'Education'
			icon:
				color:L.icon(
					iconUrl:'images/icons/edu-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/edu-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/edu-active-high.png'
				grey: 'images/icons/edu-active-high-gray.png'

		GovernmentServices:
			color: '#DA4C89'
			id: 'Government Services'
			icon:
				color:L.icon(
					iconUrl:'images/icons/gov-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/gov-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/gov-active-high.png'
				grey: 'images/icons/gov-active-high-gray.png'

		Health:
			color: '#ED1C24'
			id: 'Health'
			icon:
				color:L.icon(
					iconUrl:'images/icons/health-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/health-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/health-active-high.png'
				grey: 'images/icons/health-active-high-gray.png'

		PoliceAndJustice:
			color: '#2E3192'
			id: 'Police and Justice'
			icon:
				color:L.icon(
					iconUrl:'images/icons/legal-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/legal-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/legal-active-high.png'
				grey: 'images/icons/legal-active-high-gray.png'
		Roads:
			color: '#F15A22'
			id: 'Roads'
			icon:
				color:L.icon(
					iconUrl:'images/icons/roads-active-high.png' # halo
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/roads-active-high-gray.png' # halo
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/roads-active-high.png' # nohalo
				grey: 'images/icons/roads-active-high-gray.png' # nohalo

		Transport:
			color: '#2484C6'
			id: 'Transport'
			icon:
				color:L.icon(
					iconUrl:'images/icons/transport-active-high.png' # halo
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/transport-active-high-gray.png' # halo
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/transport-active-high.png' # nohalo
				grey: 'images/icons/transport-active-high-gray.png' # nohalo

		Utilities:
			color: '#92C5EB'
			id: 'Utilities'
			icon:
				color:L.icon(
					iconUrl:'images/icons/resources-active-high.png'
					iconSize: [42, 42]
					iconAnchor:[21,21]
					popupAnchor:[0,-12]
					shadowUrl: false
				)
				grey:L.icon(
					iconUrl:'images/icons/resources-active-high-gray.png'
					iconSize: [42, 42]
					iconAnchor: [21, 21]
					shadowUrl: false
				)
			img:
				color: 'images/icons/resources-active-high.png'
				grey: 'images/icons/resources-active-high-gray.png'




	loadData: (agency) ->

		app = this
		types = @types

		mapping =
			"Aboriginal Housing Office": types.CommunityServices
			"Art Gallery of New South Wales": types.GovernmentServices
			"Ausgrid": types.Utilities
			"Australian Museum": types.GovernmentServices
			"Barangaroo Delivery Authority": types.GovernmentServices
			"Board of Studies, Teaching and Educational Standards": types.Education
			"Centennial Park and Moore Park Trust": types.GovernmentServices
			"City West Housing Pty Limited": types.CommunityServices
			"Crown Solicitor's Office": types.PoliceAndJustice
			"Department of Education": types.Education
			"Department of Family and Community Services": types.CommunityServices
			"Department of Finance, Services and Innovation": types.GovernmentServices
			"Department of Industry, Skills and Regional Development": types.GovernmentServices
			"Department of Justice": types.PoliceAndJustice
			"Department of Planning and Environment": types.GovernmentServices
			"Department of Premier and Cabinet": types.GovernmentServices
			"Endeavour Energy": types.Utilities
			"Environment Protection Authority": types.GovernmentServices
			"Essential Energy": types.Utilities
			"Fire and Rescue NSW": types.PoliceAndJustice
			"Forestry Corporation of New South Wales": types.GovernmentServices
			"Government Property NSW": types.GovernmentServices
			"Historic Houses Trust of New South Wales": types.GovernmentServices
			"Hunter Water Corporation": types.Utilities
			"Independent Commission Against Corruption": types.PoliceAndJustice
			"Independent Pricing and Regulatory Tribunal": types.GovernmentServices
			"Information and Privacy Commission": types.GovernmentServices
			"Infrastructure NSW": types.GovernmentServices
			"Local Land Services": types.GovernmentServices
			"Long Service Corporation": types.GovernmentServices
			"Minister Administering the Environmental Planning and Assessment Act": types.GovernmentServices
			"Minister Administering the Environmental Planning and": types.GovernmentServices
			"Ministry of Health": types.Health
			"Multicultural NSW": types.CommunityServices
			"Museum of Applied Arts and Sciences": types.GovernmentServices
			"Natural Resources Commission": types.GovernmentServices
			"New South Wales Electoral Commission": types.GovernmentServices
			"New South Wales Government Telecommunications Authority": types.GovernmentServices
			"New South Wales Land and Housing Corporation": types.CommunityServices
			"NSW Police Force": types.PoliceAndJustice
			"NSW Self Insurance Corporation": types.GovernmentServices
			"NSW Trustee and Guardian": types.GovernmentServices
			"Office of Environment and Heritage": types.GovernmentServices
			"Office of Local Government": types.GovernmentServices
			"Office of Sport": types.GovernmentServices
			"Office of the Children's Guardian": types.CommunityServices
			"Office of the NSW Rural Fire Service": types.PoliceAndJustice
			"Office of the NSW State Emergency Service": types.PoliceAndJustice
			"Ombudsman's Office": types.GovernmentServices
			"Newcastle Port Corporation (trading as Por Authority of NSW)": types.Transport
			"Newcastle Port Corporation (trading as Port Authority of NSW)": types.Transport
			"Public Service Commission": types.GovernmentServices
			"Rail Corporation New South Wales (Transport Asset Holding Entity)": types.Transport
			"Rail Corporation New South Wales": types.Transport
			"Roads and Maritime Services": types.Roads
			"Royal Botanic Gardens and Domain Trust": types.GovernmentServices
			"Service NSW": types.GovernmentServices
			"State Library of New South Wales": types.GovernmentServices
			"State Insurance Regulatory Authority": types.GovernmentServices
			"State Records Authority of New South Wales": types.GovernmentServices
			"State Transit Authority of New South Wales": types.Transport
			"Sydney Cricket and Sports Ground Trust": types.GovernmentServices
			"Sydney Ferries": types.Transport
			"Sydney Harbour Foreshore Authority": types.GovernmentServices
			"Sydney Motorway Corporation Pty Ltd and its subsidiaries": types.Roads
			"Sydney Olympic Park Authority": types.GovernmentServices
			"Sydney Opera House Trust": types.GovernmentServices
			"Sydney Trains": types.Transport
			"Sydney Water Corporation": types.Utilities
			"Teacher Housing Authority of New South Wales": types.CommunityServices
			"TAFE Commission": types.Education
			"The Legislature": types.GovernmentServices
			"The Treasury": types.GovernmentServices
			"TransGrid": types.Utilities
			"Transport for NSW": types.Transport
			"Venues NSW": types.GovernmentServices
			"Waste Assets Management Corporation": types.Utilities
			"Water NSW": types.Utilities
			"Western Sydney Parklands Trust": types.GovernmentServices
			"Zoological Parks Board of New South Wales": types.GovernmentServices
			"Zoological Parks Board of New South Wales (trading as Taronga Conservation Society Australia)": types.GovernmentServices

		clean = (d) ->
			# Keep as much as possible the same as it was. Can be updated properly later on.
			d.id = d.__uid # ProjectID or Projectcode? (Can just give a fake one for now, as long as they're unique)
			_ETC = parseFloat(d.properties.ETC,10)
			if (!_ETC or !isNaN(_ETC))
				d.ETC = _ETC
			else d.ETC = d.properties.ETC
			_STD = parseFloat(d.properties.EstSpendTo20160630,10)
			if (!_STD or !isNaN(_STD))
				d.STD = _STD
			else d.STD = d.properties.EstSpendTo20160630
			_Alloc = parseFloat(d.properties.Allocation201617,10)
			if (!_Alloc or !isNaN(_Alloc))
				d.Alloc = _Alloc
			else d.Alloc = d.properties.Allocation201617
			d.type = mapping[d.properties.AgencyName]
			console.log d if not d.type
			d.typeid = d.type.id
			d.agency = d.properties.AgencyName
			d.name = d.properties.ProjectName
			d.markers = []
			d.lgas = d.properties.LGA.split(',')
			d.priority = !!d.properties.Priority
			delete d.properties
			d

		# Get projects.
		agency or= 'all'

		$.getJSON agency + '.json', (responseData) ->
			projects = responseData.features.map clean

			amap = {}
			for i in _.uniq(_.map(projects, (d) -> d.Department))
				amap[i] = yes

			app.setState projects:projects, agencymap: amap, types:types

		# Get lgas and regions.
		$.getJSON require('./lgas_projects_regions.json'), (data) ->
			topojson = require 'topojson'
			lgas = topojson.feature(data, data.objects.lgas).features
			# .map (d) ->
			# d.id = d.properties.LGA_NAME13.replace('(A)','').replace('(C)','').trim()
			#	d

			regions = topojson.feature(data, data.objects.region).features

			app.setState lgas:lgas, regions:regions


	selectProject: (project) ->
		$('html,body').animate({scrollTop:0},300);

		@setState project:project
		if project
			if @state.lga
				if not _.contains project.lgas, @state.lga.id
					@state.lga.layer.setStyle {fillOpacity: 0}
					@setState lga: undefined
			if project.marker
				# Get first container
				i = 0
				for k, v of project.marker._markers
					for n, m of v._layers
						i++
				if i > 1

					@map.fitBounds project.marker.getBounds()
				else @map.panTo project.marker.getBounds().getCenter()

	# Find out which component needed to pass in region as an arg at the end and refactor.
	selectLGA: (lga, zoomToNSW, region) ->
		# If user has been linked directly to LGA, or if user has used search bar to find LGA in different region to current one.
		if @state.region == undefined or @state.region.id != lga.properties.REGION
			parentRegion = window.router.findRegion(lga.properties.REGION)
			@selectRegion(parentRegion)

		if @state.lga
			if @state.lga.layer
				@state.lga.layer.setStyle {fillOpacity: 0}

		@setState lga:lga
		if lga
			if @state.project
				if not _.contains @state.project.lga, lga
					@setState project: undefined
			if lga.layer
				lga.layer.setStyle {fillOpacity: 0.6}
			@map.fitBounds(lga.layer.getBounds())

		if region and lga == undefined
			@zoomTo region

	selectRegion: (region, zoomToNSW) ->
		@setState region:region

		# Removes lga so that when new region is selected, previous lga is reset (if applicable).
		if @state.lga
			if @state.lga.layer
				@state.lga.layer.setStyle {fillOpacity: 0}
				@setState lga:undefined

		# Something here is closing the popup.
		if region
			for obj in @state.regions
				obj.layer.setStyle fillOpacity: 0.2
			if @state.project
				if not _.contains @state.project.region, region
					@setState project: undefined
			if region.layer
				region.layer.setStyle fillOpacity: 0.6

			@map.fitBounds(region.layer.getBounds())
		else
			for obj in @state.regions
				obj.layer.setStyle fillOpacity: 0
			@map.setView @options.center, @options.zoom

	toggleFilterOpen: ->
		if @state.filteropen
			@setState filteropen: no, type:null
		else @setState filteropen: yes
	lgamap:{}
	projectmap:{}
	regionmap: {}
	satellite: L.tileLayer("http://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGF0aWFuYSIsImEiOiJjaWs1bzRiZGQwMDdjcHRrc285bTdwcWU5In0.0EWPVHyjaE9jTzNvOiIO-w")
	streets: L.tileLayer("http://{s}.tiles.mapbox.com/v4/btsdatavisualisation.pk03pg7k/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGF0aWFuYSIsImEiOiJjaWs1bzRiZGQwMDdjcHRrc285bTdwcWU5In0.0EWPVHyjaE9jTzNvOiIO-w")
	zoomControl:L.control.zoom({position:'topleft'})
	options:
		center: L.latLng(-32.750322607,147.249755859)
		zoom:6
		maxZoom:15
		minZoom:5
		maxBounds: L.latLngBounds(L.latLng(-26.92206991673281,139.3505859375), L.latLng(-39.16414104768742,155.5224609375))
		doubleClickZoom:no
		zoomControl:no
		scrollWheelZoom:no
		attributionControl:no
		zoomAnimationThreshold:9
		markerZoomAnimation:yes

	componentDidMount: ->
		@modalEl = document.createElement('div')
		@modalEl
		$('body').append(@modalEl)
		@renderModal()

		@options.layers = [@streets]
		@map = L.map @refs.map, @options
		baseLayers = Satellite:@satellite, Streets: @streets


		_that = @

		FullscreenControl = L.Control.extend
			options:
				position: 'topleft'
			onAdd: (map) ->
				this._link = L.DomUtil.create('a', 'fullscreen-control')
				this._link.innerHTML = '';
				this._link.href = '#';
				this._link.title = "Fullscreen";
				L.DomEvent
					.on(this._link, 'mousedown dblclick', L.DomEvent.stopPropagation)
					.on(this._link, 'click', L.DomEvent.stop)
					.on(this._link, 'click', this._click, this)
					.on(this._link, 'click', this._refocusOnMap, this);
				this._link
			_click: (e) ->
				_that.setState({fullscreen:!_that.state.fullscreen})

		@fullscreenControl = new FullscreenControl()

		ResetControl = L.Control.extend
			options:
				position: 'topleft'
			onAdd: (map) ->
				this._link = L.DomUtil.create('a', 'reset-control')
				this._link.innerHTML = '';
				this._link.href = '#';
				this._link.title = "Reset";
				L.DomEvent
					.on(this._link, 'mousedown dblclick', L.DomEvent.stopPropagation)
					.on(this._link, 'click', L.DomEvent.stop)
					.on(this._link, 'click', _that.resetMap, _that)
					.on(this._link, 'click', this._refocusOnMap, this);
				this._link

		@resetControl = new ResetControl()
		@map.addControl(@resetControl);
		@zoomControl.addTo @map
		@map.addControl(@fullscreenControl);
		@layerControl = L.control.layers(baseLayers, null, {position:'topleft'}).addTo @map

	createLGALayer: ->
		@lgalayer = L.geoJson @state.lgas,
			onEachFeature: (feature, layer) =>
				feature.layer = layer
				layer.setStyle
					color: '#00AAE7'
					fillColor: '#00AAFF'
					fillOpacity: 0
					fill: true
					weight: 1

				@lgamap[feature.id] = layer

				layer.on 'click', (d) =>
					query = Backbone.history.fragment.match(/\?f=([^&]*)/)
					query = query[0] unless query == null
					query = '' if query == null
					encodedLGA = encodeURIComponent(feature.id)
					window.router.navigate('lga/' + encodedLGA + query, true)

					$('.hover-crumb').remove()
					$('.breadcrumb-lga-close').css('visibility', 'visible')
				layer.on 'mouseover', (d) =>
					layer.setStyle fillOpacity: 0.4
					return if @state.lga == feature
					if @state.lga
						$('.breadcrumb-lga-name').text(feature.id)
						$('.breadcrumb-lga-name').css('color', '#000') # Change style to show it's a different region to one selected
						$('.breadcrumb-lga-close').css('visibility', 'hidden')
					else
						$('ol.breadcrumb').append('<li class="hover-crumb">' + feature.id + '</li>')
				layer.on 'mouseout', (d) =>
					if @state.lga
						$('.breadcrumb-lga-name').text(@state.lga.id)
						$('.breadcrumb-lga-name').css('color', '#00AAE7') # Reset back to how it was originally, budget blue
						$('.breadcrumb-lga-close').css('visibility', 'visible')
					layer.setStyle(if feature is @state.lga then {fillOpacity: 0.6} else {fillOpacity: 0})
					$('.hover-crumb').remove()
		@lgalayer.addTo @map

	createProjectLayer: ->

		@projectslayer = L.featureGroup()
		app = this

		# Filters out the projects with geometries so they can be placed on map.
		@state.projects.filter((d) -> d.geometry).map (project) =>

			if project.geometry.geometries
				lineGeometry = project.geometry.geometries.filter((d) -> d.type is 'LineString')
				markerGeometry = project.geometry.geometries[1]

				project.lines = L.geoJson(lineGeometry,
					# Hide all lines by default, so only relevant ones are displayed when selected.
					style: (feature) ->
						{
							opacity: 0
							color: project.type.color
						}
				)
				@projectslayer.addLayer project.lines
			else
				markerGeometry = project.geometry

			project.marker = L.geoJson(markerGeometry,
				pointToLayer: (feature, latlng) ->
					marker = L.marker(latlng, icon:project.type.icon.color)
					project.markers.push marker
					marker
			)

			project.marker.on 'click', =>
				window.router.navigate('project/' + project.id, true)
			# @projectslayer.addLayer project.marker
		@projectslayer.addTo @map

	createRegionLayer: ->
		@regionslayer = L.geoJson @state.regions,
			onEachFeature: (feature, layer) =>
				feature.layer = layer
				layer.setStyle
					color: '#1D2088'
					fillColor: '#187FC4'
					fillOpacity: 0
					fill: true
					weight: 1

				@regionmap[feature.id] = layer

				layer.on 'click', (d) =>
					@setState initial:false
					query = Backbone.history.fragment.match(/\?f=([^&]*)/)
					query = query[0] unless query == null
					query = '' if query == null

					encodedRegion = encodeURIComponent(feature.id)
					window.router.navigate('region/' + encodedRegion + query, true)

					$('.hover-crumb').remove()
					$('.breadcrumb-region-close').css('visibility', 'visible')
				layer.on 'mouseover', (d) =>
					layer.setStyle fillOpacity: 0.4
					return if @state.lga
					if @state.region
						$('.breadcrumb-region-name').text(feature.id)
						$('.breadcrumb-region-name').css('color', '#000')
						$('.breadcrumb-region-close').css('visibility', 'hidden')
					else
						$('ol.breadcrumb').append('<li class="hover-crumb">' + feature.id + '</li>')
				layer.on 'mouseout', (d) =>
					$('.hover-crumb').remove()
					# Both lga + region and just region cases need the css and fill opacity changes.
					# Only the latter needs the innerText stuff.
					if @state.region and !@state.lga
						$('.breadcrumb-region-name').text(@state.region.id)
					if @state.region
						layer.setStyle fillOpacity: 0.2
						$('.breadcrumb-region-name').css('color', '#00AAE7')
						$('.breadcrumb-region-close').css('visibility', 'visible')
					else
						layer.setStyle(unless feature is @state.region then {fillOpacity: 0})
		@regionslayer.addTo @map

	setProjectsCollapsed: ->
		@setState({projectsCollapsed: !@state.projectsCollapsed})

	renderModal: ->
		app = this
		if @state.modal
			filter = Filter(
				projects:@filteredProjects
				types:@state.types,
				typeprojects:@typeprojects,
				type:@state.type,
				selectType:@selectType,
				clearType:@clearType,
				open:true,
				toggleOpen:@toggleFilterOpen,
				agencyfilter:@state.agencyfilter
				toggleAgency:@toggleAgency
				initial:@state.initial
				modal:@state.modal
			)
			ReactDOM.render(Modal({filter:filter}), @modalEl)
			@modalEl.className = 'modal-wrap'
		else
			ReactDOM.unmountComponentAtNode(@modalEl)
			@modalEl.className = ''

	componentDidUpdate: (props, state)->
		@renderModal()
		if @state.fullscreen
			@map.scrollWheelZoom.enable()
			L.DomUtil.addClass(@fullscreenControl._link, 'in')
		else
			@map.scrollWheelZoom.disable()
			L.DomUtil.removeClass(@fullscreenControl._link, 'in')
		if @state.fullscreen isnt state.fullscreen
			@map.invalidateSize(true)

		if @state.lgas.length and not @lgalayer
			@createLGALayer()
			# Better placement?
			@createRegionLayer()
		if @state.projects.length and not @projectslayer
			@createProjectLayer()

		for region in @state.regions
			if region == @state.region
				# Allows user to click through region to access LGAs while maintaining border of region.
				region.layer.setStyle fill:false
			else
				region.layer.setStyle fill:true

		# Removes all markers when reset button is clicked.
		@filtered = [] if @state.initial

		_old = _.difference(@_oldFiltered, @filtered)
		_new = _.difference(@filtered, @_oldFiltered)
		for project in _old
			if project.marker
				@projectslayer.removeLayer project.marker
		for project in _new
			if project.marker
				@projectslayer.addLayer project.marker

		if @state.project
			for project in @state.projects
				if project.lines
					project.lines.setStyle({opacity: 0})
				for marker in project.markers
					# PERFORMANCE improvement (stops leaflets redundant work)
					if marker._icon
						marker._icon.src = project.type.icon.grey.options.iconUrl
					else marker.setIcon project.type.icon.grey

					marker.setZIndexOffset 0

			for marker in @state.project.markers

				# PERFORMANCE improvement (stops leaflets redundant work)
				if marker._icon
					marker._icon.src = @state.project.type.icon.color.options.iconUrl
				else marker.setIcon @state.project.type.icon.color

				marker.setZIndexOffset 1000

			if @state.project.lines
				this.state.project.lines.setStyle({opacity: 0.8})

		else
			for project in @state.projects
				if project.lines
					project.lines.setStyle({opacity: 0})
				for marker in project.markers
					# PERFORMANCE improvement (stops leaflets redundant work)
					if marker._icon
						marker._icon.src = project.type.icon.color.options.iconUrl
					else marker.setIcon project.type.icon.color

					marker.setZIndexOffset 0

		if @state.fullscreen isnt state.fullscreen
			centreCoords = {lat: -32.75032260780971, lng: 147.425537109375}
			if @state.fullscreen
				centreCoords = {lat: -33.23868752757413, lng: 147.43652343749997}

			@map.setView([centreCoords.lat, centreCoords.lng], @map.getZoom())

	filter: ->
		if @state.region
			region = @state.region.id
			# Filter down the lgas to get all of the ones contained in the selected region.
			@regionLGAs = @state.lgas.filter (d) => return d.properties.REGION == region
			# Filter down the projects to those that are contained within the above lgas (in the particular region).
			@filteredProjects = []

			for lga in @regionLGAs
				for project in @state.projects
					if project.lgas.indexOf(lga.id) > -1 && @filteredProjects.indexOf(project) == -1
						@filteredProjects.push project

		else
			@filteredProjects = @state.projects

		if @state.lga
			@filteredProjects = @state.projects.filter (d) => _.contains(d.lgas, @state.lga.id)

		if @state.type
			@typeprojects = @filteredProjects.filter (d) => d.type is @state.type
		else @typeprojects = @filteredProjects
		@_oldFiltered = @filtered
		@filtered = @typeprojects.filter (d) => not @state.agencyfilter[d.agency]

	zoomTo: (object) ->
		# object arg can be lga, project or region
		if @map and object.layer
			@map.fitBounds object.layer.getBounds(), maxZoom:10
		else if @map and object.marker
			@map.fitBounds object.marker.getBounds(), maxZoom:10

	setFullscreen: ->
		@setState({fullscreen: !@state.fullscreen})

	resetMap: ->
		@setState initial:true
		window.router.navigate('', true)

	render: ->
		@filter()
		cls = 'app'
		cls += ' fullscreen'if @state.fullscreen

		# Disable page scroll when modal is open
		overflow = if @state.modal or @state.fullscreen then 'hidden' else 'auto'
		$('body').css('overflow', overflow)

		div className:cls,
			Header()
			div className:'map-container',
				div className:'map',ref:'map',style:{height:450}
				div className:'map-wrap map-bottom',
					div className: 'search-wrap',
						Search(
							projects:@state.projects,
							lgas:@state.lgas,
							selectProject:@selectProject,
							selectLGA:@selectLGA,
							regions:@state.regions
							selectRegion:@selectRegion
						)
				# Map(allprojects:@state.projects, projects:mapprojects, click: @selectProject, project:@state.project, lgas:@state.lgas, selectLGA: @selectLGA, lga:@state.lga)
				div className:'map-wrap map-top',
					div className:cx('popup-container':yes),
						Popup(
							item:@state.project,
							selectProject:@selectProject
							lgas:@state.lgas
							zoomTo: @zoomTo
						)
			div className:'foot',
				div className:'wrap',
					BreadCrumb(
						region:@state.region,
						selectRegion:@selectRegion,
						lga:@state.lga,
						selectLGA:@selectLGA
						map:@map
						options:@options
					)
					Share()
				Summary(
					projects:@filtered,
					lga:@state.lga,
					region:@state.region
				)
				React.createElement(CollapseControl, {
					fullscreen: @state.fullscreen,
					setFullscreen: @setFullscreen
				})
				Filter(
					projects:@filteredProjects
					types:@state.types,
					typeprojects:@typeprojects,
					type:@state.type,
					selectType:@selectType,
					clearType:@clearType,
					open:true,
					toggleOpen:@toggleFilterOpen,
					agencyfilter:@state.agencyfilter
					toggleAgency:@toggleAgency
					initial:@state.initial
					modal:@state.modal
				)
			AgencyFilter(
				projects:@filteredProjects
				types:@state.types,
				typeprojects:@typeprojects,
				type:@state.type,
				selectType:@selectType,
				clearType:@clearType,
				open:@state.filteropen,
				toggleOpen:@toggleFilterOpen,
				agencyfilter:@state.agencyfilter
				toggleAgency:@toggleAgency
			)
			Table(
				projects:@filtered,
				selectProject:@selectProject,
				project:@state.project
			)
			React.createElement(Footer)
