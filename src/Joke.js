import React, { Component } from 'react'
import './joke.scss'

class Joke extends Component {
  getColor() {
    if (this.props.score >= 15) {
      return '#4CAF50'
    } else if (this.props.score >= 12) {
      return '#8BC34A'
    } else if (this.props.score >= 9) {
      return '#CDDC39'
    } else if (this.props.score >= 6) {
      return '#FFEB3B'
    } else if (this.props.score >= 3) {
      return '#FFC107'
    } else if (this.props.score >= 0) {
      return '#FF9800'
    } else {
      return '#F44336'
    }
  }
  getEmoji() {
    if (this.props.score >= 15) {
      return 'em em-rolling_on_the_floor_laughing'
    } else if (this.props.score >= 12) {
      return 'em em-laughing'
    } else if (this.props.score >= 9) {
      return 'em em-smiley'
    } else if (this.props.score >= 6) {
      return 'em em-slightly_smiling_face'
    } else if (this.props.score >= 3) {
      return 'em em-neutral_face'
    } else if (this.props.score >= 0) {
      return 'em em-confused'
    } else {
      return 'em em-angry'
    }
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
            <p
              style={{ borderColor: this.getColor() }}
              className="Joke-score-num"
            >
              {this.props.score}
            </p>
            <i
              onClick={this.props.DownClick}
              className="fa fa-arrow-down"
              aria-hidden="true"
            ></i>
          </div>
          <div className="Joke-text">{this.props.text}</div>
        </div>
        <i
          class={this.getEmoji()}
          aria-role="presentation"
          aria-label="ROLLING ON THE FLOOR LAUGHING"
        ></i>
      </div>
    )
  }
}

export default Joke
