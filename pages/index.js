import Layout from '../components/MyLayout.js'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import EpgScreen from '../components/containers/EpgScreen'
import rootReducer from '../components/reducers'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default () => (
  <Layout>
    <Provider store={store}>
      <EpgScreen />
    </Provider>
  </Layout>
)
