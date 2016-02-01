import React, { Component, PropTypes } from 'react'
import { bindings, routeActions } from 'refire-app'
import { Spinner } from 'elemental'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {  }
  }

  render() {
    const { _status: { connected, initialFetchDone }, params } = this.props
    const loading = !connected && !initialFetchDone

    if (loading) {
      return <Spinner size="lg" />
    }

  console.log("LOADING", loading)

    const style = {
      maxWidth: "760px",
      margin: "0 auto",
      padding: "0 20px"
    }

    return (
      <div className="App">
        <div style={style}>
          <h1>Forum</h1>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default bindings("_status")(App)
