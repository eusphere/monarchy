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

CREATE TRIGGER updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE update_timestamps();