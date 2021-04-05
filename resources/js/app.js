import React, { useEffect } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import { Router, Switch, Route } from 'react-router-dom'
import StoreProvider, { useStore, SET_USER } from './store'
import history from './history'
import agent from './agent'

import DefaultLayout from './layouts/default'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import TopicPage from './pages/topic'
import QueryPage from './pages/query'
import ProfilePage from './pages/profile'
import HomePage from './pages/home'
import NewestPage from './pages/newest'

const App = () => {
  const [, dispatch] = useStore()

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      agent.Auth.me().then((user) => {
        dispatch({ type: SET_USER, payload: user })
      })
    }
  }, [])

  return (
    <Router history={history}>
      <Route>
        <DefaultLayout>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/yeni" component={NewestPage} />
            <Route path="/giris" component={LoginPage} />
            <Route path="/kayit" component={RegisterPage} />
            <Route path="/ara/:q" component={QueryPage} />
            <Route path="/biri/:username" component={ProfilePage} />
            <Route path="/:slug" component={TopicPage} />
          </Switch>
        </DefaultLayout>
      </Route>
    </Router>
  )
}

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ChakraProvider>,
  document.getElementById('root'),
)
