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
  isLoadingUser: boolean
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
  isLoadingUser: true,
})

export default CurrentUserContext
