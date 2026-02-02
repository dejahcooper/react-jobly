import { useContext, useState } from 'react'
import CurrentUserContext from '../context/CurrentUserContext'

type JobCardProps = {
  job: {
    id: number
    title: string
    salary?: number
    equity?: string
    companyName?: string
  }
}

const JobCard = ({ job }: JobCardProps) => {
  const { currentUser, applyToJob } = useContext(CurrentUserContext)
  const [isApplying, setIsApplying] = useState(false)

  const applied =
    currentUser?.jobs?.some((appliedJob) => appliedJob.id === job.id) ?? false

  const handleApply = async () => {
    if (applied || isApplying) return
    setIsApplying(true)
    await applyToJob(job.id)
    setIsApplying(false)
  }

  return (
    <article className="job-card">
      <div>
        <h3>{job.title}</h3>
        {job.companyName ? <p>{job.companyName}</p> : null}
        <p>Salary: {job.salary ?? 'Not listed'}</p>
        <p>Equity: {job.equity || 'None'}</p>
      </div>
      <button type="button" onClick={handleApply} disabled={applied || isApplying}>
        {applied ? 'Applied' : isApplying ? 'Applying...' : 'Apply'}
      </button>
    </article>
  )
}

export default JobCard
