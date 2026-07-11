# CodeIQ

An AI code explainer. Paste in a snippet, pick a language, and get a plain-English explanation powered by Google Gemini.

## Stack

- **Client** — React 19 + Vite + Tailwind CSS (`CodeIQ-Client/`)
- **Server** — Express 5 API wrapping the Gemini API (`server/`)

## Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

## Setup

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=http://localhost:3000
PORT=3001
```

Add a `.env` file in `CodeIQ-Client/` for the frontend:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## Run

Start the server:

```bash
cd server
npm install
npm run dev
```

Start the client (in a second terminal):

```bash
cd CodeIQ-Client
npm install
npm run dev
```

## API

### `POST /api/explain-code`

Request body:

```json
{ "code": "print('hi')", "language": "python" }
```

Response:

```json
{ "explanation": "...", "language": "python" }
```

Returns `400` if `code` is missing. Requests are rate-limited to 100 per 15 minutes per IP.

## Author

Arpit Verma
