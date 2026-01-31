import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import CompaniesList from './components/CompaniesList'
import CompanyDetail from './components/CompanyDetail'
import JobsList from './components/JobsList'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <section className="page">
                  <h1>Not Found</h1>
                  <p>Sorry, we could not find that page.</p>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
