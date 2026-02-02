import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import CurrentUserContext from '../context/CurrentUserContext'

type NavBarProps = {
  onLogout: () => void
}

const NavBar = ({ onLogout }: NavBarProps) => {
  const { currentUser } = useContext(CurrentUserContext)
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link${isActive ? ' active' : ''}`

  return (
    <header className="app-header">
      <nav className="nav">
        <div className="nav-brand">Jobly</div>
        <div className="nav-links">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/companies" className={navLinkClass}>
            Companies
          </NavLink>
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                {currentUser.username}
              </NavLink>
              <button type="button" className="nav-link nav-button" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={navLinkClass}>
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default NavBar
