import { useContext } from 'react'
import CurrentUserContext from '../context/CurrentUserContext'

const Home = () => {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <section className="page">
      <h1>Welcome to Jobly</h1>
      {currentUser ? (
        <p>Welcome back, {currentUser.firstName || currentUser.username}.</p>
      ) : (
        <p>Browse companies, explore jobs, and manage your profile.</p>
      )}
    </section>
  )
}

export default Home
