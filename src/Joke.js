import React, { Component } from 'react'
import './joke.scss'

class Joke extends Component {
  static defaultProps = {
    emoji: ['&#128545'],
  }
  render() {
    return (
      <div className="Joke">
        <div className="Joke-main-group">
          <div className="Joke-score">
            <i
              onClick={this.props.UpClick}
              className="fa fa-arrow-up"
              aria-hidden="true"
            ></i>
            <p className="Joke-score-num">{this.props.score}</p>
            <i
              onClick={this.props.DownClick}
              className="fa fa-arrow-down"
              aria-hidden="true"
            ></i>
          </div>
          <div className="Joke-text">{this.props.text}</div>
        </div>
        <i
          class="em em-rolling_on_the_floor_laughing"
          aria-role="presentation"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        ></i>
      </div>
    )
  }
}

export default Joke
