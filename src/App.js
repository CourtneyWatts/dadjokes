import React from 'react'
import logo from './logo.svg'
import './App.scss'
import SideBar from './SideBar'
import JokeBoard from './JokeBoard'

function App() {
  return (
    <div className="App">
      <div className="Jokelist">
        <SideBar />
        <JokeBoard />
      </div>
    </div>
  )
}

export default App
