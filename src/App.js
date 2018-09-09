import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import ProgramGuide from './components/ProgramGuide'
import rootReducer from './components/reducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default () => (
  <Provider store={store}>
    <ProgramGuide />
  </Provider>
)
