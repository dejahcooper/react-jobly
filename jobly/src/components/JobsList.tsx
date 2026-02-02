import { useEffect, useState } from 'react'
import JoblyApi from '../api/api'
import JobCard from './JobCard'

type Job = {
  id: number
  title: string
  salary?: number
  equity?: string
  companyName?: string
}

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadJobs = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const results = await JoblyApi.getJobs()
        setJobs(results)
      } catch (err) {
        setError('Unable to load jobs. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <section className="page">
      <h1>Jobs</h1>

      {isLoading ? <p>Loading jobs...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}

      {!isLoading && !error && jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : null}

      <div className="company-jobs">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}

export default JobsList
