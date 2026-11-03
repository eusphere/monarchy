-- Baseline schema for Monarchy.
-- Existing databases are baselined at version 1; new databases apply this file.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_timestamps() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.created_at = OLD.created_at;
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  secret TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  rating INTEGER DEFAULT 1000 NOT NULL,
  membership SMALLINT DEFAULT 1 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE(username),
  UNIQUE(email)
);

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_timestamps();

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  seed INTEGER NOT NULL,
  status SMALLINT DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER games_updated_at
BEFORE UPDATE ON games
FOR EACH ROW EXECUTE PROCEDURE update_timestamps();

CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  game_id UUID REFERENCES games(id) NOT NULL,
  status SMALLINT DEFAULT 0 NOT NULL,
  role SMALLINT DEFAULT 0 NOT NULL,
  rating INTEGER NOT NULL,
  rating_delta INTEGER,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE(user_id, game_id)
);

CREATE TRIGGER players_updated_at
BEFORE UPDATE ON players
FOR EACH ROW EXECUTE PROCEDURE update_timestamps();

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  avatar TEXT NOT NULL,
  color TEXT NOT NULL,
  color_accent TEXT,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE(user_id)
);

CREATE TRIGGER profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_timestamps();
