import { FormEvent, useEffect, useState } from 'react'
import JoblyApi from '../api/api'
import CompanyCard from './CompanyCard'

type Company = {
  handle: string
  name: string
  description?: string
  logoUrl?: string
}

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadCompanies = async (term?: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await JoblyApi.getCompanies(term)
      setCompanies(results)
    } catch (err) {
      setError('Unable to load companies. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = searchTerm.trim()
    loadCompanies(trimmed.length ? trimmed : undefined)
  }

  return (
    <section className="page">
      <h1>Companies</h1>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search companies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading ? <p>Loading companies...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!isLoading && !error && companies.length === 0 ? (
        <p>No companies found.</p>
      ) : null}

      <div className="company-grid">
        {companies.map((company) => (
          <CompanyCard key={company.handle} company={company} />
        ))}
      </div>
    </section>
  )
}

export default CompaniesList
