import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './jokeboard.scss'
import SideBar from './SideBar'

class JokeBoard extends Component {
  static defaultProps = {
    loadedJokes: [],
  }
  constructor(props) {
    super(props)
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      isLoading: true,
    }
    this.incrementScore = this.incrementScore.bind(this)
    this.getMoreJokes = this.getMoreJokes.bind(this)
  }

  incrementScore(dir, id) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((jk) =>
          jk.id === id ? { ...jk, score: jk.score + dir } : jk
        ),
      }),
      () => {
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      }
    )
  }

  getJoke(loadedJokes, counter) {
    console.log(counter)
    return axios
      .get('https://icanhazdadjoke.com', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        if (loadedJokes.some((jk) => jk.id === res.data.id)) {
          console.log('duplicate')
          this.getJoke(loadedJokes, counter)
        } else {
          loadedJokes.push({ id: res.data.id, joke: res.data.joke, score: 0 })
          if (counter === 0) {
            console.log(loadedJokes)
            this.setState(
              (st) => ({
                jokes: [...loadedJokes],
                loadedJokes: [],
                isLoading: false,
              }),
              () => {
                window.localStorage.setItem(
                  'jokes',
                  JSON.stringify(this.state.jokes)
                )
              }
            )
          } else {
            this.getJoke(loadedJokes, counter - 1)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getMoreJokes() {
    if(this.state.isLoading){
        return
    }
    this.setState({
      isLoading: true,
    })
    this.getJoke(this.state.jokes, 9)
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJoke(this.props.loadedJokes, 10)
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }
  render() {
    const sortedJokes = this.state.jokes.sort((a, b) => {
      return b.score - a.score
    })
    const jokesList = sortedJokes.map((jk) => {
      return (
        <Joke
          text={jk.joke}
          score={jk.score}
          UpClick={() => {
            this.incrementScore(1, jk.id)
          }}
          DownClick={() => {
            this.incrementScore(-1, jk.id)
          }}
          key={jk.id}
          id={jk.id}
        />
      )
    })
    if (this.state.isLoading) {
      return (
        <div className="Jokelist">
          <SideBar getMoreJokes={this.getMoreJokes} />
          <div className="Jokeboard">
            <div className="loading-screen">
              <i className="fa-5x far fa-laugh fa-spin"></i>
              <span>...fetching jokes</span>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className="Jokelist">
        <SideBar isLoading={this.state.isLoading} getMoreJokes={this.getMoreJokes} />
        <div className="Jokeboard">{jokesList}</div>
      </div>
    )
  }
}

export default JokeBoard
