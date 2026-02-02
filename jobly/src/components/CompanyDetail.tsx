import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import JoblyApi from '../api/api'
import JobCard from './JobCard'

type Job = {
  id: number
  title: string
  salary?: number
  equity?: string
}

type Company = {
  handle: string
  name: string
  description?: string
  numEmployees?: number
  logoUrl?: string
  jobs?: Job[]
}

const CompanyDetail = () => {
  const { handle } = useParams()
  const [company, setCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCompany = async () => {
      if (!handle) return
      setIsLoading(true)
      setError(null)
      try {
        const data = await JoblyApi.getCompany(handle)
        setCompany(data)
      } catch (err) {
        setError('Unable to load company details.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCompany()
  }, [handle])

  if (isLoading) {
    return (
      <section className="page">
        <p>Loading company...</p>
      </section>
    )
  }

  if (error || !company) {
    return (
      <section className="page">
        <h1>Company Details</h1>
        <p className="error-text">{error || 'Company not found.'}</p>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="company-header">
        <div>
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          {company.numEmployees ? (
            <p>Employees: {company.numEmployees}</p>
          ) : null}
        </div>
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            className="company-logo-large"
          />
        ) : null}
      </div>

      <h2>Open Roles</h2>
      <div className="company-jobs">
        {company.jobs && company.jobs.length > 0 ? (
          company.jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No open roles listed.</p>
        )}
      </div>
    </section>
  )
}

export default CompanyDetail
