import type React from 'react'
import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from '../context/CurrentUserContext'

type ProfileProps = {
  updateProfile: (data: {
    firstName?: string
    lastName?: string
    email?: string
    password?: string
  }) => Promise<{ success: boolean; errors?: string[] }>
}

const Profile = ({ updateProfile }: ProfileProps) => {
  const { currentUser, isLoadingUser } = useContext(CurrentUserContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [formErrors, setFormErrors] = useState<string[]>([])
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        password: '',
      })
    }
  }, [currentUser])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaveStatus(null)
    const { password, ...rest } = formData
    const payload = password ? { ...rest, password } : rest

    const result = await updateProfile(payload)
    if (result.success) {
      setFormErrors([])
      setSaveStatus('Profile updated.')
      setFormData((data) => ({ ...data, password: '' }))
    } else {
      setFormErrors(result.errors || ['Update failed.'])
    }
  }

  if (isLoadingUser) {
    return (
      <section className="page">
        <p>Loading profile...</p>
      </section>
    )
  }

  if (!currentUser) {
    return (
      <section className="page">
        <p>You need to log in to edit your profile.</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>Your Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username
          <input value={currentUser.username} disabled />
        </label>
        <label>
          First name
          <input
            name="firstName"
            value={formData.firstName}
            onChange={(event) =>
              setFormData((data) => ({ ...data, firstName: event.target.value }))
            }
          />
        </label>
        <label>
          Last name
          <input
            name="lastName"
            value={formData.lastName}
            onChange={(event) =>
              setFormData((data) => ({ ...data, lastName: event.target.value }))
            }
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((data) => ({ ...data, email: event.target.value }))
            }
          />
        </label>
        <label>
          Confirm password to save changes
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData((data) => ({ ...data, password: event.target.value }))
            }
          />
        </label>
        {formErrors.length > 0 ? (
          <div className="form-errors">
            {formErrors.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        ) : null}
        {saveStatus ? <p>{saveStatus}</p> : null}
        <button type="submit">Save changes</button>
      </form>
    </section>
  )
}

export default Profile
