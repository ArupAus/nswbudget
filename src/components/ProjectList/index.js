import React, { PureComponent } from 'react'
import { styled } from 'styletron-react'
import { descending } from 'd3-array'
import ProjectItem from '../ProjectItem'

import upIcon from '../../../images/nav/up.svg'
import downIcon from '../../../images/nav/down.svg'

const Container = styled('div', {})

const Header = styled('div', {
  position: 'relative',
  fontFamily: 'Gotham',
  fontSize: '16px',
  color: '#141414',
  lineHeight: '30px',
  borderStyle: 'solid',
  borderColor: 'rgba(151, 151, 151, 0.6)',
  borderWidth: '0 0 1px 0'
})

const List = styled('div', {})

const Title = styled('div', {
  width: 'calc(100% - 24px)'
})

const ListExpanderIcon = styled('div', {
  position: 'absolute',
  right: '0',
  top: '3px',
  height: '24px',
  cursor: 'pointer',
  verticalAlign: 'middle'
})

class ProjectList extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: props.initialOpen
    }
  }
  toggle = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { projects, name, select, selected } = this.props
    const { open } = this.state
    const list = open ? projects.sort((a, b) => descending(a.budget, b.budget)).map(p => <ProjectItem key={p.id} active={!selected || p.id === selected} project={p} onSelect={select} />) : []

    return (
      <Container>
        <Header>
          <Title>
            {name}
          </Title>
          <ListExpanderIcon onClick={this.toggle}>
            {open ? <img src={upIcon} alt="up" /> : <img src={downIcon} alt="down" />}
          </ListExpanderIcon>
        </Header>
        <List>
          {list}
        </List>
      </Container>
    )
  }
}

export default ProjectList
