import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type LoginProps = {
  login: (data: { username: string; password: string }) => Promise<{
    success: boolean
    errors?: string[]
  }>
}

const Login = ({ login }: LoginProps) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: 'testuser',
    password: 'password',
  })
  const [formErrors, setFormErrors] = useState<string[]>([])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const result = await login(formData)
    if (result.success) {
      setFormErrors([])
      navigate('/')
    } else {
      setFormErrors(result.errors || ['Login failed.'])
    }
  }

  return (
    <section className="page">
      <h1>Login</h1>
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
        {formErrors.length > 0 ? (
          <div className="form-errors">
            {formErrors.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        ) : null}
        <button type="submit">Log in</button>
      </form>
    </section>
  )
}

export default Login
