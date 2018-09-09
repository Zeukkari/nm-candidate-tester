import React from 'react'
import styled from 'styled-components'

const Captions = styled.div`
  width: 60px;
  position: sticky;
  float: left;
  left: 0;
  top: 0;
  background: ${props => props.theme.bg};
  z-index: 10;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  border: 0 0 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
`

const CaptionsItem = styled.div`
  height: 60px;
  padding: 5px 5px;
  text-align: center;
  line-height: 50px;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
  border: 0 0 0 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};

  img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`

const LabelColumn = props => {
  const { channels } = props
  const captionsElements = channels.map(channel => (
    <CaptionsItem key={channel.id}>
      <img src={channel.images.logo} alt="channel logo" />
    </CaptionsItem>
  ))

  return <Captions>{captionsElements}</Captions>
}

export default LabelColumn
