ALTER TABLE users ALTER created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC';
ALTER TABLE users ALTER updated_at TYPE TIMESTAMPTZ USING updated_at AT TIME ZONE 'UTC';

CREATE TABLE games (
  id SERIAL PRIMARY KEY NOT NULL,
  seed INTEGER NOT NULL,
  status SMALLINT DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER games_updated_at
BEFORE UPDATE ON games
FOR EACH ROW
EXECUTE PROCEDURE update_timestamps();

CREATE TABLE players (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  game_id INTEGER REFERENCES games(id) NOT NULL,
  status SMALLINT DEFAULT 0 NOT NULL,
  rating INTEGER NOT NULL,
  rating_delta INTEGER,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
  UNIQUE(user_id, game_id)
);

CREATE TRIGGER players_updated_at
BEFORE UPDATE ON players
FOR EACH ROW
EXECUTE PROCEDURE update_timestamps();
