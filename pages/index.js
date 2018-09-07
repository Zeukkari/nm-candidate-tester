import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Layout from '../components/Layout'
import ProgramGuide from '../components/ProgramGuide'
import rootReducer from '../components/reducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default () => (
  <Layout>
    <Provider store={store}>
      <ProgramGuide />
    </Provider>
  </Layout>
)
