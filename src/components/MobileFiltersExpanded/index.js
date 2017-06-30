import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import Filter from '../Filter'
import ClearFilter from '../ClearFilter'
import LabelledField from '../LabelledField'
import LocationSearch from '../LocationSearch'
import ClosePath from '../../../images/nav/close.svg'
import theme from '../../theme'

const Container = styled('div', {
  backgroundColor: theme.filterBG,
  padding: '16px',
  paddingTop: '8px',
  paddingBottom: '8px'
})

const CloseButton = styled('img', {
  height: '18px',
  width: '100%',
  cursor: 'pointer'
})

const Clear = styled('div', {
  margin: '0 auto',
  display: 'block',
  textAlign: 'center'
})

export class MobileFiltersExpanded extends PureComponent {
  render() {
    const { onClose } = this.props
    return (
      <Container>
        <LabelledField label="search_label">
          <LocationSearch isMobile />
        </LabelledField>
        <LabelledField label="filter_label">
          <Filter />
        </LabelledField>
        <Clear><ClearFilter /></Clear>
        <CloseButton onClick={onClose} src={ClosePath} alt="Close filters" />
      </Container>
    )
  }
}

export default MobileFiltersExpanded
