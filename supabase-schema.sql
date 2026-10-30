create table jobs (
  id uuid default gen_random_uuid() primary key,
  company text not null,
  role text not null,
  url text,
  status text not null default 'applied'
    check (status in ('applied','phone_screen','interview','offer','rejected')),
  applied_at date not null default current_date,
  notes text,
  created_at timestamptz default now()
);
