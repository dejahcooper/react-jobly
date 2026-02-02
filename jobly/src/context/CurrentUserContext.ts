import { createContext } from 'react'

type CurrentUser = {
  username: string
  firstName?: string
  lastName?: string
  email?: string
  isAdmin?: boolean
  jobs?: { id: number; state?: string }[]
}

type CurrentUserContextValue = {
  currentUser: CurrentUser | null
  isLoadingUser: boolean
  applyToJob: (jobId: number) => Promise<void>
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUser: null,
  isLoadingUser: true,
  applyToJob: async () => undefined,
})

export default CurrentUserContext
