import { NavLink } from 'react-router-dom'

const NavBar = () => {
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
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
          <NavLink to="/signup" className={navLinkClass}>
            Signup
          </NavLink>
          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
