-- Cloudflare D1 SQL Schema for Video Repurposing Platform
-- Way #54 / Product 56

CREATE TABLE IF NOT EXISTS video_projects (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS source_videos (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  raw_video_url TEXT NOT NULL,
  duration_seconds REAL NOT NULL,
  status TEXT CHECK (status IN ('uploaded', 'transcribed', 'segmented', 'completed')) DEFAULT 'uploaded',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES video_projects(id)
);

CREATE TABLE IF NOT EXISTS clips (
  id TEXT PRIMARY KEY,
  source_video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  start_seconds REAL NOT NULL,
  end_seconds REAL NOT NULL,
  duration_seconds REAL NOT NULL,
  virality_score INTEGER NOT NULL,
  aspect_ratio TEXT CHECK (aspect_ratio IN ('9:16', '1:1', '16:9')) DEFAULT '9:16',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_video_id) REFERENCES source_videos(id)
);

CREATE TABLE IF NOT EXISTS captions (
  id TEXT PRIMARY KEY,
  clip_id TEXT NOT NULL,
  format TEXT CHECK (format IN ('ass', 'vtt', 'srt')) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clip_id) REFERENCES clips(id)
);

CREATE TABLE IF NOT EXISTS render_jobs (
  id TEXT PRIMARY KEY,
  clip_id TEXT NOT NULL,
  status TEXT CHECK (status IN ('queued', 'rendering', 'completed', 'failed')) DEFAULT 'queued',
  output_video_url TEXT,
  progress INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clip_id) REFERENCES clips(id)
);

CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS retainers (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  tier TEXT CHECK (tier IN ('Starter', 'Growth', 'Enterprise')) NOT NULL,
  monthly_rate REAL NOT NULL,
  currency TEXT CHECK (currency IN ('USD', 'INR')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'paused', 'cancelled')) DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id)
);
