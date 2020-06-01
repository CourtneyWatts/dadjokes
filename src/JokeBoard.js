import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './jokeboard.scss'

class JokeBoard extends Component {
  static defaultProps = {
    loadedJokes: [],
  }
  constructor(props) {
    super(props)
    this.state = {
      jokes: [],
    }
    this.incrementScore = this.incrementScore.bind(this)
  }

  incrementScore(dir, id) {
    let jokeIDX = this.state.jokes.findIndex((jk) => jk.id === id)
    console.log(dir)
    console.log(jokeIDX)
    this.setState( st => ({
        jokes: st.jokes.map( jk => jk.id === id ? {...jk, score: jk.score +dir} : jk)
    }))
  }

  getJoke(loadedJokes) {
    return axios
      .get('https://icanhazdadjoke.com', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((res) => {
        if (loadedJokes.some((jk) => jk.id === res.data.id)) {
          console.log('duplicate')
          this.getJoke(loadedJokes)
        } else {
          loadedJokes.push({ id: res.data.id, joke: res.data.joke, score: 0 })
          if (loadedJokes.length >= 3) {
            console.log(loadedJokes)
            this.setState({
              jokes: [...loadedJokes],
            })
          } else {
            this.getJoke(loadedJokes)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    let jokes = this.getJoke(this.props.loadedJokes)
    console.log(jokes)
  }
  render() {
    const jokesList = this.state.jokes.map((jk) => {
      return <Joke text={jk.joke} score={jk.score} UpClick={()=>{this.incrementScore(1,jk.id)}} DownClick={()=>{this.incrementScore(-1,jk.id)}}  key={jk.id} id={jk.id} />
    })
    return <div className="Jokeboard">{jokesList}</div>
  }
}

export default JokeBoard
