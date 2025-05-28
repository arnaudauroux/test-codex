import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { job_url } = req.body;
  if (!job_url) {
    return res.status(400).json({ error: 'Job URL required' });
  }

  try {
    const descResp = await fetch(job_url);
    const jobDescription = await descResp.text();

    // placeholder LinkedIn data - in real app you'd use OAuth to fetch profile
    const profileData = { summary: 'LinkedIn profile data here' };

    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const prompt = `Generate a professional resume for this job description:\n${jobDescription}\nCandidate: ${JSON.stringify(profileData)}`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
    });

    const text = completion.data.choices[0].text.trim();
    res.status(200).json({ resume: text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate resume', details: err.message });
  }
}
