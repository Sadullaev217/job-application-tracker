# Job Application Tracker

Track every job application in one place — add applications, filter by status, and see your pipeline at a glance.

## Features

- Add / edit / delete job applications
- Filter by status: Applied, Phone Screen, Interview, Offer, Rejected
- Dashboard with live stats (total applied, offer rate, active pipeline)
- Kanban board view *(coming soon)*

## Stack

- React + Vite
- Supabase (Postgres + realtime)
- Deployed on Vercel

## Setup

1. Create a project on [supabase.com](https://supabase.com) and run [`supabase-schema.sql`](./supabase-schema.sql) in the SQL editor.
2. Copy `.env.local` and fill in your keys:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
3. `npm install && npm run dev`
