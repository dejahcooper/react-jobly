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
  return (
    <article className="job-card">
      <div>
        <h3>{job.title}</h3>
        {job.companyName ? <p>{job.companyName}</p> : null}
        <p>Salary: {job.salary ?? 'Not listed'}</p>
        <p>Equity: {job.equity || 'None'}</p>
      </div>
    </article>
  )
}

export default JobCard
