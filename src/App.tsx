import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Layout from './Layouts/Layout'
import Login from './Pages/Login/Login'
import Departments from './Pages/Departments/Departments'
import PatientRegestration from './Pages/Patients Regestration/PatientRegestration'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Home/>} />
          <Route path='/departments' element={<Departments/>} />
          <Route path='/register' element={<PatientRegestration/>} />
          <Route path='/login' element={<Login/>} />
        </Route>
      </Routes>


    </>
  )
}

export default App
