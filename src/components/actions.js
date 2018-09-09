import fetch from 'isomorphic-fetch'

const API_URL = 'http://localhost:1337'

export const FETCH_DATA = 'FETCH_DATA'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

export const fetchData = () => dispatch => {
  dispatch({ type: FETCH_DATA })

  return fetch(`${API_URL}/epg`)
    .then(response => response.json())
    .then(payload => dispatch(renderData(payload)))
}

export const renderData = payload => ({
  payload,
  type: FETCH_SUCCESS,
})
