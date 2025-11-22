import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface JobItem {
  title: string
  link: string
  pubDate: string
  source: string
}

const JobsContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
`

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`

const ControlsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`

const CountrySelect = styled.select`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px 10px;
`

const RefreshButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => (theme.isDark ? '#000' : '#fff')};
  border: 0;
  border-radius: 8px;
  padding: 8px 12px;
`

const JobList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
`

const JobCard = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  padding: 12px;
`

const JobTitle = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  margin-top: 8px;
`

// Only Bahrain jobs are shown

export const Jobs: React.FC = () => {
  const [items, setItems] = useState<JobItem[]>([])
  const [loading, setLoading] = useState(false)
  const country = 'Bahrain'
  const [error, setError] = useState<string| null>(null)

  const baseURL = (() => {
    const w: any = typeof window !== 'undefined' ? window.location : { protocol: 'http:', hostname: 'localhost', port: '5000' }
    const defaultDev = `${w.protocol}//${w.hostname}:5000`
    const defaultProd = `${w.protocol}//${w.hostname}`
    const devPorts = new Set(['3000','3001','3002','3003'])
    return process.env.REACT_APP_BACKEND_URL || (devPorts.has(w.port) ? defaultDev : defaultProd)
  })()

  const fetchJobs = async () => {
    setLoading(true)
    setError(null)
    try {
      const r = await fetch(`${baseURL}/api/jobs?country=${encodeURIComponent(country)}`)
      const d = await r.json()
      if (d && Array.isArray(d.items)) {
        setItems(d.items)
      } else {
        setItems([])
      }
    } catch (e: any) {
      setError('Failed to load jobs')
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
    const h = setInterval(fetchJobs, 30 * 60 * 1000)
    return () => clearInterval(h)
  }, [])

  return (
    <JobsContainer>
      <Title>💼 Jobs</Title>
      <ControlsRow>
        <RefreshButton onClick={fetchJobs}>Refresh</RefreshButton>
      </ControlsRow>
      {loading && <div>Loading jobs...</div>}
      {error && <div>{error}</div>}
      {!loading && items.length === 0 && <div>No jobs found.</div>}
      <JobList>
        {items.map((it, idx) => (
          <JobCard key={it.link + idx}>
            <JobTitle href={it.link} target="_blank" rel="noopener noreferrer">{it.title}</JobTitle>
            <MetaRow>
              <span>{new Date(it.pubDate).toLocaleString()}</span>
              <span>{it.source}</span>
            </MetaRow>
          </JobCard>
        ))}
      </JobList>
    </JobsContainer>
  )
}

export default Jobs