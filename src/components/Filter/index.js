import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import Media from 'react-media'
import { toggleCategory } from '../../actions'
import ClearFilter from '../ClearFilter'

const Container = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  marginBottom: '8px',
})

const Img = styled('img', {
  display: 'inline-block',
  width: '40px',
  height: '40px',
  cursor: 'pointer',
  ':not(:last-child)': {
    marginRight: '6px'
  }
})

export class Filter extends PureComponent {
  render() {
    const { onClick, selected, categories } = this.props
    return (
      <Container>
        {categories.map(d => (
          <Img
            key={d.id}
            alt={`${d.name} icon`}
            src={(selected ? (d.id === selected) : true) ? d.icons.activeTileIcon : d.icons.inactiveTileIcon}
            onClick={() => onClick(d.id)}
          />
        ))}
        <Media query="(min-width: 601px)">
          {(matches) => matches ? <ClearFilter /> : null }
        </Media>
      </Container>
    )
  }
}

export default connect(state => ({
  selected: state.app.categoryId,
  categories: Object.keys(state.data.categoriesById).map(d => state.data.categoriesById[d])
}), {
  onClick: toggleCategory
})(Filter)
