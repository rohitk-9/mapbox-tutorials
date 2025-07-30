import { useState } from 'react'
import './App.css'
// import Map from './Components/Map'
import Searchbox from './Components/Searchbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Searchbox/>
    </>
  )
}

export default App
