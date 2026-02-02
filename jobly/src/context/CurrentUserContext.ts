import { createContext } from 'react'

type CurrentUser = {
  username: string
  firstName?: string
  lastName?: string
  email?: string
  isAdmin?: boolean
}

type CurrentUserContextValue = {
  currentUser: CurrentUser | null
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
})

export default CurrentUserContext
