import { ReactElement, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import CurrentUserContext from '../context/CurrentUserContext'

type ProtectedRouteProps = {
  children: ReactElement
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoadingUser } = useContext(CurrentUserContext)

  if (isLoadingUser) {
    return <div className="page">Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
