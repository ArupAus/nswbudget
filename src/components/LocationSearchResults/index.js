import React, { Component } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { locationSearch, locationAndProjectSearch } from '../../selectors'
import { clearQuery, setProject, setLGA, setRegion } from '../../actions'


const Container = styled('div', {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  height: '0',
  zIndex: '2'
})

const Results = styled('div', {
  maxHeight: '50vh',
  overflowY: 'auto',
  position: 'relative',
  background: 'white',
  border: '1px solid #ccc',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  borderTop: 'none',
  padding: '0'
})

const Result = styled('div', {
  padding: '12px',
  cursor: 'pointer',
  ':hover': {
    background: '#efefef'
  },
  ':not(:last-child)': {
    borderBottom: '1px solid #ccc'
  },
  ':after': {
    content: "''",
    display: 'table',
    clear: 'both'
  }
})

const Left = styled('div', {
  float: 'left'
})

const Right = styled('div', {
  float: 'right',
  fontSize: '10px',
  lineHeight: '12px',
  textTransform: 'uppercase'
})

const Clearfix = styled('div', {
  ':after': {
    content: "''",
    display: 'table',
    clear: 'both'
  }
})

const Postcode = styled('span', {
  ':not(:last-child)': {
    marginRight: '4px'
  }
})

const Small = styled('div', {
  fontSize: '10px',
  color: '#222'
})

const ProjectSearchResult = ({ project, onClick }) => {
  return (
    <Result onClick={onClick}>
      <Left>{project.name}</Left>
      <Right>Project</Right>
    </Result>
  )
}


const LGASearchResult = ({ lga, query, onClick }) => {
  const matchesPostcodes = lga.postcodes ? lga.postcodes.filter(d => d.indexOf(query) !== -1) : []
  const matchesSuburbs = (query.length > 2 && lga.suburbs) ? lga.suburbs.filter(d => d.toLowerCase().indexOf(query.toLowerCase()) !== -1) : []

  const regx = new RegExp(query.toLowerCase(), 'ig')

  return (
    <Result onClick={onClick}>
      <Clearfix>
        <Left>{lga.name}</Left>
        <Right>LGA</Right>
      </Clearfix>
      { matchesPostcodes.length > 0 && (
        <Small>
          Postcode{matchesPostcodes.length == 1 ? '' : 's'}: {matchesPostcodes.slice(0, 3).map(d => (
            <Postcode key={d} dangerouslySetInnerHTML={{ __html: d.replace(regx, `<span class="bold">$&</span>`) }} />
          ))}
        </Small>
      )}
      { matchesSuburbs.length > 0 && (
        <Small>
          Suburb{matchesSuburbs.length == 1 ? '' : 's'}: {matchesSuburbs.slice(0, 3).map(d => (
            <Postcode key={d} dangerouslySetInnerHTML={{ __html: d.replace(regx, `<span class="bold">$&</span>`) }} />
          ))}
        </Small>
      )}
    </Result>
  )
}

const RegionSearchResult = ({ region, onClick }) => (
  <Result onClick={onClick}>
    <Left>{region.name}</Left>
    <Right>Region</Right>
  </Result>
)

class LocationSearchResults extends Component {
  selectResult(set, id) {
    this.props.clearQuery()
    set(id)
  }
  render() {
    const { query, results, setProject, setLGA, setRegion } = this.props
    return (
      <Container>
        <Results>
          { results ? (
            results.map(d => {
              switch (d.type) {
                case 'project': {
                  return <ProjectSearchResult key={`project_${d.id}`} project={d} onClick={() => this.selectResult(setProject, d.id)} />
                }
                case 'lga': {
                  return <LGASearchResult key={`lga_${d.id}`} lga={d} query={query} onClick={() => this.selectResult(setLGA, d.id)} />
                }
                case 'region': {
                  return <RegionSearchResult key={`region_${d.id}`} region={d} query={query} onClick={() => this.selectResult(setRegion, d.id)} />
                }
                default:
                  throw new Error(`unknown result type ${d.type}`)
              }
            })
          ) : 'No Results' }
        </Results>
      </Container>
    )
  }
}

export default connect((state, { isMobile }) => ({
  results: isMobile ? locationSearch(state) : locationAndProjectSearch(state),
  query: state.app.query
}), { clearQuery, setProject, setLGA, setRegion })(LocationSearchResults)
