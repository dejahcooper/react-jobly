import { Link } from 'react-router-dom'

type CompanyCardProps = {
  company: {
    handle: string
    name: string
    description?: string
    logoUrl?: string
  }
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <article className="company-card">
      <Link to={`/companies/${company.handle}`} className="company-card-link">
        <div>
          <h2>{company.name}</h2>
          <p>{company.description || 'No description yet.'}</p>
        </div>
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            className="company-logo"
          />
        ) : null}
      </Link>
    </article>
  )
}

export default CompanyCard
