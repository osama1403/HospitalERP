import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Layout from './Layouts/Layout'
import Login from './Pages/Login/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<></>} />
        </Route>
      </Routes>


    </>
  )
}

export default App
