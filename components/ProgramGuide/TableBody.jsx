import styled, { ThemeProvider } from 'styled-components'
import TableRow from './TableRow'

const TimetableContainer = styled.div`
  background-color: ${props => props.theme.bg};
`

const TableBody = props => {
  const { channels, theme } = props

  const channelElements = channels.map(channel => {
    return <TableRow channel={channel} key={channel.id} theme={theme} />
  })

  return (
    <ThemeProvider theme={theme}>
      <TimetableContainer>{channelElements}</TimetableContainer>
    </ThemeProvider>
  )
}

export default TableBody
