import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
const Home = lazy(() => import('./Pages/Home/Home'))
const Layout = lazy(() => import('./Layouts/Layout'))
const Login = lazy(() => import('./Pages/Login/Login'))
const Departments = lazy(() => import('./Pages/Departments/Departments'))
const PatientRegestration = lazy(() => import('./Pages/Patients Regestration/PatientRegestration'))
const Admissions = lazy(() => import('./Pages/Admissions/Admissions'))
const Accounts = lazy(() => import('./Pages/Accounts/Accounts'))
const Staff = lazy(() => import('./Pages/Staff/Staff'))
const PatientProfile = lazy(() => import('./Pages/PatientProfile/PatientProfile'))
const Patients = lazy(() => import('./Pages/Patients/Patients'))





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
          <Route path='/admissions' element={<Admissions/>} />
          <Route path='/accounts' element={<Accounts/>} />
          <Route path='/staff' element={<Staff/>} />
          <Route path='/patients' element={<Patients/>} />
          <Route path='/patients/:id' element={<PatientProfile/>} />
        </Route>
      </Routes>


    </>
  )
}

export default App
