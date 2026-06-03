-- Run this in your Supabase SQL editor

create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  product_id text not null,
  stripe_session_id text,
  created_at timestamptz default now()
);

create index on purchases(clerk_user_id);

create table if not exists domains (
  id uuid primary key default gen_random_uuid(),
  certification text not null default 'security_plus_701',
  number int not null,
  name text not null,
  full_name text not null
);

create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid references domains(id),
  number int not null,
  title text not null,
  youtube_url text,
  ebook_chapter text
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references modules(id),
  domain_id uuid references domains(id),
  type text not null check (type in ('mcq','pbq')),
  question text not null,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_answer text not null,
  explanation text,
  difficulty text check (difficulty in ('easy','medium','hard'))
);

create table if not exists student_progress (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  module_id uuid references modules(id),
  completed boolean default false,
  completed_at timestamptz,
  unique(clerk_user_id, module_id)
);

create table if not exists student_scores (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  question_id uuid references questions(id),
  domain_id uuid references domains(id),
  selected_answer text not null,
  is_correct boolean not null,
  exam_session_id text,
  created_at timestamptz default now()
);

create index on student_scores(clerk_user_id);
create index on student_progress(clerk_user_id);

-- Seed Security+ SY0-701 domains
insert into domains (certification, number, name, full_name) values
  ('security_plus_701', 1, 'General Security Concepts', 'Domain 1: General Security Concepts'),
  ('security_plus_701', 2, 'Threats, Vulnerabilities & Mitigations', 'Domain 2: Threats, Vulnerabilities & Mitigations'),
  ('security_plus_701', 3, 'Security Architecture', 'Domain 3: Security Architecture'),
  ('security_plus_701', 4, 'Security Operations', 'Domain 4: Security Operations'),
  ('security_plus_701', 5, 'Security Program Management & Oversight', 'Domain 5: Security Program Management & Oversight');
