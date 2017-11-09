import React, { Component } from 'react'
import Grid from '../components/grid'
import store from '../utils/store.js'
import { observer } from 'mobx-react'
import { tmdb } from '../utils/api.js'
import { Dropdown } from 'semantic-ui-react'

@observer
class Popular extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      hasMore: true,
      nbPage: '',
      choiceSort: null
    }
    this._isMounted = false
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleSortsRequest () {
    // store.resetPopular()
    // changement de trie
    // this._isMounted = false
  }

  handleChangePage () {
    tmdb().get(`discover/movie`, {
      params: {
        page: store.pageResultPopular,
        sort_by: this.state.choiceSort,

      }
    }).then((res) => {
      if (this.state.page === res.data.total_pages && this._isMounted === true) {
        this.setState({hasMore: false})
        this._isMounted = false
      }
      if (this._isMounted === true) {
        store.addResultPopular(res.data.results)
      }
    }).catch((err) => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div>
        <Grid handleChangePage={this.handleChangePage} hasMore={this.state.hasMore} result={store.resultPopular} history={this.props.history} />
      </div>
    )
  }
}

export default Popular
