import React, { createContext, useReducer, useContext } from 'react'
import axios from 'axios'
import history from './history'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_USER = 'SET_USER'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

const middleware = (dispatch) => (action) => {
  if (action.type === LOGIN) {
    setTimeout(() => history.push('/'), 100)

    const token = action.payload.access_token

    if (token) {
      localStorage.setItem('access_token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return dispatch({ type: SET_USER, payload: action.payload.user })
  }

  if (action.type === LOGOUT) {
    setTimeout(() => history.push('/', 100))
    localStorage.removeItem('access_token')
  }

  return dispatch(action)
}

const initialState = {
  user: null,
}

export const Context = createContext(initialState)

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Context.Provider value={[state, middleware(dispatch)]}>
      {children}
    </Context.Provider>
  )
}

export default StoreProvider

export const useStore = () => useContext(Context)
