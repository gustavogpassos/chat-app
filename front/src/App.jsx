import Home from './pages/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
