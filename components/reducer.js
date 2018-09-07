import { FETCH_DATA, FETCH_SUCCESS } from './actions'

const initialState = {
  loading: false,
  channels: [],
}

export default function channels(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return { channels: [], loading: true }

    case FETCH_SUCCESS:
      return { channels: action.payload.channels, loading: false }

    default:
      return state
  }
}
