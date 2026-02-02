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
import ProtectedRoute from './components/ProtectedRoute'
import useLocalStorage from './hooks/useLocalStorage'

type CurrentUser = {
  username: string
  firstName?: string
  lastName?: string
  email?: string
  isAdmin?: boolean
}

const App = () => {
  const [token, setToken] = useLocalStorage<string | null>('joblyToken', null)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      setIsLoadingUser(true)
      if (!token) {
        setCurrentUser(null)
        JoblyApi.token = null
        setIsLoadingUser(false)
        return
      }

      try {
        JoblyApi.token = token
        const decoded: { username: string } = jwtDecode(token)
        const user = await JoblyApi.getCurrentUser(decoded.username)
        setCurrentUser(user)
      } catch (err) {
        setCurrentUser(null)
      } finally {
        setIsLoadingUser(false)
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
  }

  const updateProfile = async (data: {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
  }) => {
    if (!currentUser) {
      return { success: false, errors: ['No current user.'] }
    }

    try {
      const updatedUser = await JoblyApi.updateCurrentUser(
        currentUser.username,
        data,
      )
      setCurrentUser(updatedUser)
      return { success: true }
    } catch (err) {
      return { success: false, errors: err as string[] }
    }
  }

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={{ currentUser, isLoadingUser }}>
        <div className="app">
          <NavBar onLogout={logout} />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/companies"
                element={
                  <ProtectedRoute>
                    <CompaniesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies/:handle"
                element={
                  <ProtectedRoute>
                    <CompanyDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobsList />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login login={login} />} />
              <Route path="/signup" element={<Signup signup={signup} />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile updateProfile={updateProfile} />
                  </ProtectedRoute>
                }
              />
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
