import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import FrontBarre from './components/frontBarre'
import Login from './routes/login'
import Register from './routes/register'
import Popular from './routes/popular'
import Profile from './routes/profile'
import OtherProfile from './routes/otherProfile'
import TopRated from './routes/topRated'
import newest from './routes/newest'
import a_z from './routes/a_z'
import z_a from './routes/z_a'
import Movie from './routes/movie'
import Search from './routes/search'
import Notification from './components/notification'
import play from './routes/play'

import './scss/index.css'

class Index extends React.Component {
  componentWillMount () {
    if (global.localStorage.getItem('token') &&
    (this.props.location.pathname === '/login' ||
    this.props.location.pathname === '/register')) {
      this.props.history.push('/popular')
    }
    if (!global.localStorage.getItem('token') &&
    this.props.location.pathname !== '/login' &&
    this.props.location.pathname !== '/register') {
      this.props.history.push('/login')
    }
  }

  render () {
    return (
      <div id='container-root'>
        <Notification />
        {global.localStorage.getItem('token') ? <FrontBarre
          history={this.props.history}
          match={this.props.match}
          location={this.props.location} /> : null}
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/popular' component={Popular} />
          <Route exact path='/top_rated' component={TopRated} />
          <Route exact path='/newest' component={newest} />
          <Route exact path='/a_z' component={a_z} />
          <Route exact path='/z_a' component={z_a} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/profile/:id' component={OtherProfile} />
          <Route exact path='/movie/:id' component={Movie} />
          <Route exact path='/search/:id' component={Search} />
          <Route exact path='/play/:uuid/:id' component={play} />
          <Redirect to='/popular' />
        </Switch>
      </div>
    )
  }
}

export default Index

ReactDOM.render(
  <BrowserRouter>
    <Route component={Index} />
  </BrowserRouter>, document.getElementById('root'))

registerServiceWorker()
