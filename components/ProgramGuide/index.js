import { Component } from 'react'
import moment from 'moment'
import styled, { ThemeProvider } from 'styled-components'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LabelColumn from './LabelColumn'
import TableBody from './TableBody'
import * as actions from '../actions'
import TimeRowWidget from './HeaderRow'
import DateRowWidget from './DateRow'

const theme = {
  color: 'white',
  color2: '#A0A0A0',
  bg: '#202020',
  cellWidth: '200px',
  cellBgColor: '#111111',
  cellBgActiveColor: '#393939',
  borderColor: 'rgba(255, 255, 255, 0.1)',
}

const PageLoader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 3em solid ${props => props.theme.cellBgColor}
  border-top: 3em solid ${props => props.theme.cellBgActiveColor}
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: ${props => (props.loading ? 'block' : 'none')}


  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Timetable = styled.div`
  position: absolute;
  color: ${props => props.theme.color};
  background: ${props => props.theme.bg};
  padding: 0;
  top: 0;
  left: 0;
  bottom: 0;
`

const TimetableScrollable = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  opacity: ${props => (props.loading ? 0 : 1)};
  transition: all 0.6s ease-in-out;
`

const CurrentIndicator = styled.div`
  width: 1px;
  position: absolute;
  left: ${props => `calc(${props.offset} * ${props.theme.cellWidth})`};
  top: 0;
  bottom: 0;
  background: rgba(220, 165, 60, 0.5);
  transition: left 0.5s;

  &:before {
    content: '';
    width: 3px;
    height: 25px;
    display: block;
    position: absolute;
    top: 0;
    left: -1px;
    border-radius: 2px;
    background: rgba(220, 165, 60, 0.7);
  }
`

class ProgramGuide extends Component {
  constructor(props) {
    super(props)
    this.props.actions.fetchData()
    this.state = {
      loading: false,
      channels: [],
    }
  }

  render() {
    const { channels, loading } = this.props

    const now = new moment()
    const midnight = moment().startOf('day')
    const indicatorPosition = moment.duration(now.diff(midnight)).as('hours')

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Timetable theme={theme}>
            <PageLoader theme={theme} loading={loading} />
            <TimetableScrollable loading={loading}>
              <div>
                <DateRowWidget theme={theme} />
                <TimeRowWidget channels={channels} theme={theme} />
                <LabelColumn channels={channels} />
                <TableBody channels={channels} theme={theme} />
                <CurrentIndicator theme={theme} offset={indicatorPosition} />
              </div>
            </TimetableScrollable>
          </Timetable>
        </ThemeProvider>
      </div>
    )
  }
}
//
function mapStateToProps(state) {
  return {
    channels: state.channels,
    loading: state.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProgramGuide)
