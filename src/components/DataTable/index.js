import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { format } from 'd3-format'
import keymirror from 'keymirror'
import { connect } from 'react-redux'
import { styled } from 'styletron-react'
import theme from '../../theme'
import { filteredProjectsTable } from '../../selectors'
import { setProject, setTable } from '../../actions'
import ArrowDown from '../../../images/nav/arrow-down.svg'
import ArrowUp from '../../../images/nav/arrow-up.svg'

const numberStyle = {
  textAlign: 'right',
  fontFeatureSettings: 'tnum',
  WebkitFontFeatureSettings: 'tnum',
  MozFontFeatureSettings: 'tnum',
  fontVariantNumeric: 'tabular-nums',
  fontFamily: 'arial'
}
const naStyle = {
  color: '#9b9b9b',
  textAlign: 'right',
  fontFeatureSettings: 'tnum',
  WebkitFontFeatureSettings: 'tnum',
  MozFontFeatureSettings: 'tnum',
  fontVariantNumeric: 'tabular-nums',
  fontFamily: 'arial'
}

const COLUMNS = keymirror({
  NAME: null,
  AGENCY: null,
  ETC: null,
  BUDGET: null,
  TYPE: null
})

const DEFAULT_ASCENDING = {
  NAME: true,
  AGENCY: true,
  ETC: false,
  BUDGET: false,
  TYPE: true
}

const sortVal = (val1, val2, ascending) => {
  if (typeof val1 === 'string') {
    val1 = val1.toUpperCase()
    val2 = val2.toUpperCase()
  }

  if (ascending) {
    if (val1 < val2) {
      return -1
    } else if (val1 > val2) {
      return 1
    }

    return 0
  }

  if (val1 < val2) {
    return 1
  } else if (val1 > val2) {
    return -1
  }

  return 0
}

const Container = styled('table', {
  borderCollapse: 'collapse',
  width: '100%'
})

const Row = styled('tr', {
  borderStyle: 'solid',
  borderColor: 'rgba(151, 151, 151, 0.6)',
  borderWidth: '0 0 1px 0'
})

const Header = styled('th', (props) => ({
  lineHeight: '48px',
  padding: '0 5px',
  textAlign: 'left',
  fontFamily: 'Gotham',
  fontWeight: 500,
  fontSize: '12px',
  color: props.active ? '#000' : '#666',
  letterSpacing: 0,
  whiteSpace: 'nowrap'
}))

const SortableHeader = styled(Header, {
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.filterBG
  }
})

const Value = styled('td', {
  fontFamily: 'Gotham',
  fontSize: '13px',
  padding: '5px',
  color: '#000',
  letterSpacing: 0
})

const Icon = styled('img', {
  verticalAlign: 'middle'
})

const InvisIcon = styled('img', {
  opacity: '0'
})

const ViewOnMap = styled('span', {
  textTransform: 'uppercase',
  cursor: 'pointer',
  color: '#1170B2',
  whiteSpace: 'nowrap'
})


export class DataTable extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      sortColumn: COLUMNS.ETC,
      ascending: false
    }
  }
  sortBy(col) {
    const { sortColumn } = this.state
    if (col === this.state.sortColumn) {
      this.setState({ ascending: !this.state.ascending })
      return
    }
    if (sortColumn !== col) {
      this.setState({ sortColumn: col, ascending: DEFAULT_ASCENDING[col] })
    }
  }
  viewOnMap(id) {
    const { select, setTable } = this.props
    select(id)
    setTable(false)
  }
  renderSortArrow(col) {
    const { sortColumn, ascending } = this.state
    if (sortColumn === col) {
      return ascending ? <Icon src={ArrowUp} /> : <Icon src={ArrowDown} />
    }

    return <InvisIcon sty src={ArrowUp} />
  }
  renderRows() {
    const { projects } = this.props
    const { sortColumn, ascending } = this.state

    if (sortColumn !== null) {
      projects.sort((a, b) => {
        switch (sortColumn) {
          case COLUMNS.NAME:
            return sortVal(a.name, b.name, ascending)
          case COLUMNS.AGENCY:
            return sortVal(a.agency.name, b.agency.name, ascending)
          case COLUMNS.ETC:
            return sortVal(a.etc, b.etc, ascending)
          case COLUMNS.BUDGET:
            return sortVal(a.budget, b.budget, ascending)
          case COLUMNS.TYPE:
            return sortVal(a.category.name, b.category.name, ascending)
          default:
            return 0
        }
      })
    }

    return projects.map(project => {
      return (
        <Row key={project.id}>
          <Value key="categoryIcon">
            <Icon src={project.category.icons.activeTileIcon} />
          </Value>
          <Value key="name">
            { project.name }
          </Value>
          <Value key="deliveryAgency">
            { project.agency.name }
          </Value>
          <Value key="etc" style={project.etc ? numberStyle : naStyle}>
            { project.etc ? format("$,")(project.etc) : 'N.A.'}
          </Value>
          <Value key="budget" style={project.budget ? numberStyle : naStyle}>
            { project.budget ? format("$,")(project.budget) : 'N.A.'}
          </Value>
          <Value key="type">
            { project.category.name}
          </Value>
          <Value key="viewOnMap">
            <ViewOnMap onClick={() => this.viewOnMap(project.id)}>
              <FormattedMessage id="view_on_map" />
            </ViewOnMap>
          </Value>
        </Row>
      )
    })
  }
  render() {
    const { sortColumn } = this.state
    return (
      <Container>
        <thead>
          <Row>
            <Header active={sortColumn === null} key="categoryIcon" />
            <SortableHeader key="name" active={sortColumn === null || sortColumn === COLUMNS.NAME} onClick={() => this.sortBy(COLUMNS.NAME)}>
              {this.renderSortArrow(COLUMNS.NAME)}
              Project Name
            </SortableHeader>
            <SortableHeader key="agency" active={sortColumn === null || sortColumn === COLUMNS.AGENCY} onClick={() => this.sortBy(COLUMNS.AGENCY)}>
              {this.renderSortArrow(COLUMNS.AGENCY)}
              Delivery Agency
            </SortableHeader>
            <SortableHeader key="etc" active={sortColumn === null || sortColumn === COLUMNS.ETC} onClick={() => this.sortBy(COLUMNS.ETC)}>
              {this.renderSortArrow(COLUMNS.ETC)}
              Estmated Total Cost
            </SortableHeader>
            <SortableHeader key="budget" active={sortColumn === null || sortColumn === COLUMNS.BUDGET} onClick={() => this.sortBy(COLUMNS.BUDGET)}>
              {this.renderSortArrow(COLUMNS.BUDGET)}
              2017-18 Financial Year
            </SortableHeader>
            <SortableHeader key="type" active={sortColumn === null || sortColumn === COLUMNS.TYPE} onClick={() => this.sortBy(COLUMNS.TYPE)}>
              {this.renderSortArrow(COLUMNS.TYPE)}
              Project Type
            </SortableHeader>
            <Header key="viewOnMap" />
          </Row>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </Container>
    )
  }
}

export default connect(state => ({
  projects: filteredProjectsTable(state).map(d => ({
    ...d,
    category: state.data.categoriesById[d.categoryId],
    agency: state.data.agenciesById[d.agencyId]
  })),
  selected: state.app.projectId
}), {
  select: setProject,
  setTable
})(DataTable)
