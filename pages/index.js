import { useState } from 'react'

export default function Home() {
  const [jobUrl, setJobUrl] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_url: jobUrl }),
    });
    const data = await res.json();
    setResume(data.resume || 'Error generating resume');
    setLoading(false);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>AI Resume Builder</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="url"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="Job description URL"
          required
          style={{ width: '300px', marginRight: '0.5rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate my resume for this position'}
        </button>
      </form>
      {resume && (
        <pre style={{ whiteSpace: 'pre-wrap' }}>{resume}</pre>
      )}
    </main>
  );
}
