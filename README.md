# AI Resume Builder

This is a lightweight Next.js app that generates a resume using LinkedIn data and a job description. It fetches the job post from a URL, builds a prompt, and sends it to the OpenAI API.

## Setup

1. Install dependencies (requires Node.js):

```bash
npm install
```

2. Set the following environment variable:

- `OPENAI_API_KEY`

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` and enter a job description URL. The app will call OpenAI and display the generated resume.

This example omits LinkedIn OAuth for brevity but you could integrate it using [`next-auth`](https://next-auth.js.org/).
