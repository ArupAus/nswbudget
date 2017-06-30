import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedPlural } from 'react-intl'
import { styled } from 'styletron-react'
import {
  clearLGA,
  clearRegion,
  clearCategory
} from '../../actions'
import { filteredProjects } from '../../selectors'
import FilterButton from '../FilterButton'

const Span = styled('div', {
  paddingTop: '8px',
  paddingBottom: '8px',
  lineHeight: '32px'
})

export class ListTitle extends Component {
  render() {
    const { count, lga, region, category, onClearLGA, onClearRegion, onClearCategory } = this.props
    if (region && category) {
      return <Span> {count} <FilterButton name={category.name} onClose={onClearCategory} /> <FormattedPlural value={count} one="project" other="projects" /> in <FilterButton name={region.name} onClose={onClearRegion} /></Span>
    }
    if (region) {
      return <Span> {count} <FormattedPlural value={count} one="project" other="projects" /> in <FilterButton name={region.name} onClose={onClearRegion} /></Span>
    }
    if (lga && category) {
      return <Span> {count} <FilterButton name={category.name} onClose={onClearCategory} /> <FormattedPlural value={count} one="project" other="projects" /> in <FilterButton name={lga.name} onClose={onClearLGA} /></Span>
    }
    if (lga) {
      return <Span> {count} <FormattedPlural value={count} one="project" other="projects" /> in <FilterButton name={lga.name} onClose={onClearLGA} /></Span>
    }
    if (category) {
      return <Span> {count} <FilterButton name={category.name} onClose={onClearCategory} /> <FormattedPlural value={count} one="project" other="projects" /></Span>
    }
    return <Span> {count} <FormattedPlural value={count} one="project" other="projects" /></Span>
  }
}


export default connect(state => ({
  lga: state.app.lgaId && state.data.lgasById[state.app.lgaId],
  region: state.app.regionId && state.data.regionsById[state.app.regionId],
  category: state.app.categoryId && state.data.categoriesById[state.app.categoryId],
  count: filteredProjects(state).length
}), {
  onClearLGA: clearLGA,
  onClearRegion: clearRegion,
  onClearCategory: clearCategory
})(ListTitle)
