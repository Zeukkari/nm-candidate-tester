import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
  cellWidth: '300px',
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
  flex: 0 0 auto;
  display: inline-block;

  transition: all 0.2s ease-in-out;
`

const FullWidth = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  overlow-x: auto;
`

const ScrollWrapper = styled.div``

const TimetableScrollable = styled.div`
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

const StickyButton = styled.button`
  background: yellow;
  color: white;

  display: inline;
  float: right;

  font-size: 2em;
  margin: 0em;

  padding: 0.25em;
  border: 1px solid black;
  box-shadow: 2px -2px 2px;
  border-radius: 3px;
  position: fixed;
  bottom: 15%;
  right: 15%;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    color: grey;
  }
`

class ProgramGuide extends Component {
  constructor(props) {
    super(props)

    this.myRef = React.createRef()
    timer: null,
      (this.state = {
        loading: false,
        channels: [],
      })
    this.handleClick = this.handleClick.bind(this)
    this.props.actions.fetchData()

    this.percentage
    this.starttime

    this.offset
    this.targetY = this.myRef

    this.settings = {
      duration: 100,
      easing: {
        outQuint: function(x, t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
      },
    }
  }

  scrollTo(node) {
    console.log('node: ', node)

    var nodeTop = node.offsetLeft
    var nodeHeight = node.offsetWidth
    var body = document.body
    var html = document.documentElement
    var height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    )
    var windowHeight = window.innerWidth
    var offset = window.pageXOffset
    var delta = nodeTop - offset
    var bottomScrollableY = height - windowHeight
    var targetY =
      bottomScrollableY < delta
        ? bottomScrollableY - (height - nodeTop - nodeHeight + offset)
        : delta

    this.startTime = Date.now()
    this.percentage = 0
    this.elapsed = 0
    this.yScroll = 0

    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setTimeout(this.step, 1000)
  }

  stop() {
    clearTimeout(this.timer)
  }

  step() {
    console.log('STEP!', this.percentage)
    this.elapsed = Date.now() - this.startTime

    this.settings = {
      duration: 100,
      easing: {
        outQuint: function(x, t, b, c, d) {
          return c * ((t = t / d - 1) * t * t * t * t + 1) + b
        },
      },
    }

    if (this.elapsed > this.settings.duration) {
      clearTimeout(this.timer)
    }

    this.percentage = this.elapsed / this.settings.duration

    if (this.percentage > 1) {
      clearTimeout(this.timer)
    } else {
      console.log('yScroll: ', this.yScroll)
      this.yScroll = this.settings.easing.outQuint(
        this.yScroll,
        this.elapsed,
        this.offset,
        this.targetY,
        this.settings.duration,
      )
      console.log('yScroll: ', this.yScroll)
      window.scrollTo(this.yScroll, 0)
      this.timer = setTimeout(this.step, 1000)
    }
  }

  handleClick() {
    console.log('click handled!', this.myRef)
    const domNode = ReactDOM.findDOMNode(this.myRef.current)
    // domNode.scrollIntoView({ behaviour: 'smooth' })
    // window.scrollTo(0, this.myRef)
    this.scrollTo(domNode)
  }

  render() {
    const { channels, loading } = this.props

    const now = new moment()
    const midnight = moment().startOf('day')
    const indicatorPosition = moment.duration(now.diff(midnight)).as('hours')

    return (
      <div>
        <ThemeProvider theme={theme}>
          <div>
            <Timetable theme={theme}>
              <PageLoader theme={theme} loading={loading} />
              <div>
                <TimetableScrollable loading={loading}>
                  <ScrollWrapper>
                    <DateRowWidget theme={theme} />
                    <TimeRowWidget channels={channels} theme={theme} />
                    <LabelColumn channels={channels} />
                    <TableBody channels={channels} theme={theme} />
                    <CurrentIndicator
                      theme={theme}
                      offset={indicatorPosition}
                      ref={this.myRef}
                    />
                  </ScrollWrapper>
                </TimetableScrollable>
              </div>
              <div>
                <StickyButton onClick={this.handleClick}>
                  <h3>NOW</h3>
                </StickyButton>
              </div>
            </Timetable>
          </div>
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
