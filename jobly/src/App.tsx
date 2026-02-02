import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './App.css'
import JoblyApi from './api/api'
import NavBar from './components/NavBar'
import Home from './components/Home'
import CompaniesList from './components/CompaniesList'
import CompanyDetail from './components/CompanyDetail'
import JobsList from './components/JobsList'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import CurrentUserContext from './context/CurrentUserContext'

type CurrentUser = {
  username: string
  firstName?: string
  lastName?: string
  email?: string
  isAdmin?: boolean
}

const App = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('joblyToken')
  })
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setCurrentUser(null)
        JoblyApi.token = null
        return
      }

      try {
        JoblyApi.token = token
        const decoded: { username: string } = jwtDecode(token)
        const user = await JoblyApi.getCurrentUser(decoded.username)
        setCurrentUser(user)
        localStorage.setItem('joblyToken', token)
      } catch (err) {
        setCurrentUser(null)
      }
    }

    loadUser()
  }, [token])

  const login = async (data: { username: string; password: string }) => {
    try {
      const newToken = await JoblyApi.login(data)
      setToken(newToken)
      return { success: true }
    } catch (err) {
      return { success: false, errors: err as string[] }
    }
  }

  const signup = async (data: {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
  }) => {
    try {
      const newToken = await JoblyApi.signup(data)
      setToken(newToken)
      return { success: true }
    } catch (err) {
      return { success: false, errors: err as string[] }
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('joblyToken')
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="app">
          <NavBar onLogout={logout} />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<CompaniesList />} />
              <Route path="/companies/:handle" element={<CompanyDetail />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/signup" element={<Signup signup={signup} />} />
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
      </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App
