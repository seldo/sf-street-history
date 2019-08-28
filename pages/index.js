import React from 'react'
import Router from 'next/router'

class Home extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: '/street/0'
      })
      res.end()
    } else {
      Router.push('/street/0')
    }
    return {}
  }
}

export default Home