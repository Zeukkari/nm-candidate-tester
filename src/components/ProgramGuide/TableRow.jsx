import React from 'react'
import styled from 'styled-components'
import TableCell from './TableCell'

const BodyRow = styled.div`
  height: 60px;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.borderColor};
`

const TableRow = props => {
  const { channel, theme } = props
  const programs = channel.schedules

  return (
    <BodyRow>
      {programs.map((program, index) => {
        return (
          <TableCell
            program={program}
            key={index}
            isActive={false}
            theme={theme}
          />
        )
      })}
    </BodyRow>
  )
}

export default TableRow
