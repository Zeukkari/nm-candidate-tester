import moment from 'moment'
import styled from 'styled-components'

const TimetableItem = styled.div`
  text-align: left;
  padding-top: 1em;
  padding-left: 1em;
  user-select: none;
`

const Title = styled.div`
  font-size: 11px;
  line-height: 13px;
  margin: 0 0 0px;
  max-height: 27px;
`
const Details = styled.div`
  color: ${props => props.theme.color2};
  font-size: 11px;
  line-height: 13px;
  white-space: nowrap;
`

const TimetableBodyCell = styled.div`
  height: 100%;
  width: ${props => `calc(${props.width} * ${props.theme.cellWidth})`};
  left: ${props => `calc(${props.left} * ${props.theme.cellWidth})`};
  position: absolute;
  top: 0;
  display: inline-block;
  overflow: visible;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  border-left: 1px solid ${props => props.theme.borderColor};
  padding-left: -1px;
  margin-left: -1px;
  margin-bottom: -1px;

  background-color: ${props =>
    props.isActive ? props.theme.cellBgActiveColor : props.theme.cellBgColor};

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.cellBgActiveColor};
  }
`

const TableCell = props => {
  const { program, theme } = props
  const title = program.title

  const midnight = moment().startOf('day')
  const start = moment(program.start)
  const end = moment(program.end)
  const duration = moment.duration(end.diff(start)).as('hours')
  const offset = moment.duration(start.diff(midnight)).as('hours')

  const isPlayingNow = moment().isBetween(start, end)

  return (
    <TimetableBodyCell
      theme={theme}
      left={offset}
      isActive={true}
      width={duration}
      isActive={isPlayingNow}
    >
      <TimetableItem>
        <Title>{title}</Title>
        <Details>
          {moment(start).format('HH:mm')} - {moment(end).format('HH:mm')}
        </Details>
      </TimetableItem>
    </TimetableBodyCell>
  )
}

export default TableCell
