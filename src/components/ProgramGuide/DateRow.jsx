import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const StyledHeaderRow = styled.div`
  display: flex;
  justify-content: center;
  align-content: stretch;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`

const StyledDateRow = styled.div`
  width: 100%;
  height: 100%;
  display: inline;
  position: static;
  text-align: center;
  border-left: 1px solid ${props => props.theme.borderColor};
  padding-left: -1px;
  margin-left: -1px;
  user-select: none;
  background-color: ${props => props.theme.bg};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.cellBgActiveColor};
  }
`

const DateField = styled.div`
  text-align: center;
  height: 1em;
  display: inline-block;
  font-size: 0.75em;
  padding: 0px;
  margin: 0px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  text-align: center;
  color: ${props => (props.isActive ? props.theme.color : props.theme.color2)};
`

const StarContainer = styled.div`
  display: inline-block;
  box-shadow: 4px -5px 10px black;
  vertical-align: center;
  text-align: center;
  padding-top: 0px;
  margin-top: 0px;
  padding-right: 20px;
  padding-left: 20px;
  margin-right: 20px;
  margin-bottom: 0px;
  padding-bottom: 0px;
  text-align: center;
  color: ${props => props.theme.color2};

  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${props => props.theme.color};
    transform: scale(1.1);
  }
`

const DateRowWidget = props => {
  const { theme } = props
  const days = new Array(7).fill(null).map((item, index) => index)
  const today = moment()

  const dateRow = days.map(index => {
    const day = moment().day(index)
    const isActive = day.isSame(today, 'day')
    return (
      <StyledDateRow key={index} theme={theme}>
        <DateField theme={theme} isActive={isActive}>
          <div>{day.format('ddd')}</div>
          <div>{day.format('DD.MM.')}</div>
        </DateField>
      </StyledDateRow>
    )
  })

  return (
    <div>
      <StyledHeaderRow>
        <StarContainer>★</StarContainer>
        {dateRow}
      </StyledHeaderRow>
    </div>
  )
}

export default DateRowWidget
