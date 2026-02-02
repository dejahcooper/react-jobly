import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type SignupProps = {
  signup: (data: {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
  }) => Promise<{ success: boolean; errors?: string[] }>
}

const Signup = ({ signup }: SignupProps) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: 'newuser',
    password: 'password',
    firstName: 'New',
    lastName: 'User',
    email: 'newuser@example.com',
  })
  const [formErrors, setFormErrors] = useState<string[]>([])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await signup(formData)
    if (result.success) {
      setFormErrors([])
      navigate('/')
    } else {
      setFormErrors(result.errors || ['Signup failed.'])
    }
  }

  return (
    <section className="page">
      <h1>Signup</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            value={formData.username}
            onChange={(event) =>
              setFormData((data) => ({ ...data, username: event.target.value }))
            }
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) =>
              setFormData((data) => ({ ...data, password: event.target.value }))
            }
          />
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
        {formErrors.length > 0 ? (
          <div className="form-errors">
            {formErrors.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        ) : null}
        <button type="submit">Create account</button>
      </form>
    </section>
  )
}

export default Signup
