import { useParams } from 'react-router-dom'

const CompanyDetail = () => {
  const { handle } = useParams()

  return (
    <section className="page">
      <h1>Company Details</h1>
      <p>Details for company: {handle}</p>
    </section>
  )
}

export default CompanyDetail
