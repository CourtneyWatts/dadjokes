import React, { Component } from 'react'
import './sidebar.scss'

class SideBar extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.getMoreJokes()
  }
  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-app-name">
          <p>
            Dad <span>Jokes</span>
          </p>
        </div>
        <img
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          className="em em-laughing"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        />
        <button onClick={this.handleClick}>More Jokes</button>
      </div>
    )
  }
}

export default SideBar
