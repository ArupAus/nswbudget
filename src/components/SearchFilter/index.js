import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { connect } from 'react-redux'
import { setSearchFilter } from '../../actions'

const Input = styled('input', {
  marginBottom: '8px',
  width: '100%',
  border: '1px solid #ccc',
  color: '#666',
  fontWeight: '500',
  padding: '12px 12px',
  fontSize: '14px'
})
export class SearchFilter extends PureComponent {
  onChange = (e) => {
    const { onChange } = this.props
    onChange(e.target.value)
  }
  render() {
    const { value } = this.props
    return (
      <Input placeholder="Filter by keyword" value={value} onChange={this.onChange} />
    )
  }
}

export default connect(state => ({
  value: state.app.searchFilter
}), { onChange: setSearchFilter })(SearchFilter)
