import React from 'react'
import styled from 'styled-components'

const StyledHeaderRow = styled.div`
  height: 1.5em;
  white-space: nowrap;
`

const StyledHeaderCell = styled.div`
  width: ${props => props.theme.cellWidth};
  height: 100%;
  font-size: 12px;
  line-height: 25px;
  display: inline-block;
  text-align: center;
  border-left: 1px solid ${props => props.theme.borderColor};
  padding-left: -1px;
  margin-left: -1px;
  color: ${props => props.theme.color2};
  background-color: ${props => props.theme.bg};
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:after {
    content: '';
    height: 5px;
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &:hover {
    background-color: ${props => props.theme.cellBgActiveColor};
  }
`

const ClockIndicator = styled.div`
  width: 1px;
  height: 0.5em;
  position: absolute;
  display: block;
  bottom: 0;
  border-radius: 2px;
  left: 50%;
  background: ${props => props.theme.cellBgActiveColor};
  transition: left 0.5s;
`

const TimeRowWidget = props => {
  const { theme } = props
  const hours = new Array(24).fill(null).map((item, index) => index)

  const timeRow = hours.map(item => {
    return (
      <StyledHeaderCell key={item} theme={theme}>
        {' '}
        {`${item}:00`}
        <ClockIndicator />
      </StyledHeaderCell>
    )
  })

  return (
    <div>
      <StyledHeaderRow>{timeRow}</StyledHeaderRow>
    </div>
  )
}

export default TimeRowWidget
