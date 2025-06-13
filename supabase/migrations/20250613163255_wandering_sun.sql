/*
  # Life Story App Database Schema

  1. New Tables
    - `profiles` - Store profile information for people whose stories are being told
    - `question_categories` - Categories of questions (Family & Ancestry, etc.)
    - `questions` - Individual questions with variants for different relationships
    - `user_sessions` - Track user sessions and progress
    - `story_responses` - Store answers to questions
    - `invitations` - Track email invitations sent
    - `generated_stories` - Store AI-generated story content

  2. Security
    - Enable RLS on all tables
    - Add policies for public access (since this is a public app)
    - Secure invitation system

  3. Features
    - Question variants based on relationship type
    - Progress tracking
    - Story generation pipeline
    - Email invitation system
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  birth_year integer,
  description text,
  relationship_type text NOT NULL, -- 'mom', 'dad', 'grandparent', etc.
  custom_relationship text,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create question categories table
CREATE TABLE IF NOT EXISTS question_categories (
  id text PRIMARY KEY,
  name text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id text PRIMARY KEY,
  category_id text NOT NULL REFERENCES question_categories(id),
  base_text text NOT NULL,
  variants jsonb DEFAULT '{}'::jsonb, -- Store relationship-specific variants
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user sessions table (for tracking progress)
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token text UNIQUE NOT NULL,
  profile_id uuid REFERENCES profiles(id),
  current_step integer DEFAULT 1,
  selected_questions jsonb DEFAULT '[]'::jsonb,
  progress_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '7 days')
);

-- Create story responses table
CREATE TABLE IF NOT EXISTS story_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES user_sessions(id),
  question_id text NOT NULL,
  response_text text,
  response_audio_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invite_token text UNIQUE NOT NULL,
  email text NOT NULL,
  profile_name text NOT NULL,
  sender_name text,
  selected_questions jsonb NOT NULL,
  status text DEFAULT 'sent', -- 'sent', 'opened', 'completed'
  sent_at timestamptz DEFAULT now(),
  opened_at timestamptz,
  completed_at timestamptz,
  expires_at timestamptz DEFAULT (now() + interval '30 days')
);

-- Create generated stories table
CREATE TABLE IF NOT EXISTS generated_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid REFERENCES user_sessions(id),
  profile_id uuid REFERENCES profiles(id),
  story_content text NOT NULL,
  story_metadata jsonb DEFAULT '{}'::jsonb,
  generation_prompt text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_stories ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public app)
CREATE POLICY "Allow public read access to question_categories"
  ON question_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to questions"
  ON questions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert/update on profiles"
  ON profiles
  FOR ALL
  TO public
  USING (true);

CREATE POLICY "Allow public access to user_sessions"
  ON user_sessions
  FOR ALL
  TO public
  USING (true);

CREATE POLICY "Allow public access to story_responses"
  ON story_responses
  FOR ALL
  TO public
  USING (true);

CREATE POLICY "Allow public access to invitations"
  ON invitations
  FOR ALL
  TO public
  USING (true);

CREATE POLICY "Allow public access to generated_stories"
  ON generated_stories
  FOR ALL
  TO public
  USING (true);

-- Insert question categories
INSERT INTO question_categories (id, name, icon, description, sort_order) VALUES
('family-ancestry', 'Family & Ancestry', '🧬', 'Origins, heritage, and family history', 1),
('early-childhood', 'Early Childhood', '👶', 'Birth, early years, and first memories', 2),
('school-years', 'School Years', '🎒', 'Education, teachers, and school experiences', 3),
('friendships-social', 'Friendships & Social Life', '👯‍♀️', 'Friends, social activities, and relationships', 4),
('love-relationships', 'Love & Relationships', '💖', 'Romance, marriage, and partnerships', 5),
('parenting-family', 'Parenting & Family Life', '👶', 'Raising children and family traditions', 6),
('work-career', 'Work & Career', '💼', 'Professional life and achievements', 7),
('home-daily-life', 'Home Life & Daily Routine', '🏠', 'Daily life, routines, and living spaces', 8),
('travel-adventure', 'Travel & Adventure', '✈️', 'Journeys, vacations, and adventures', 9),
('beliefs-values', 'Beliefs & Personal Values', '🧠', 'Philosophy, beliefs, and life principles', 10),
('hobbies-passions', 'Hobbies & Passions', '🎨', 'Interests, creativity, and personal pursuits', 11),
('pets-animals', 'Pets & Animals', '🐶', 'Animal companions and wildlife experiences', 12),
('aging-reflection', 'Aging & Reflection', '🧓', 'Life lessons and wisdom gained', 13),
('digital-modern', 'Digital Footprint & Modern Life', '💻', 'Technology and modern experiences', 14),
('legacy-messages', 'Legacy & Messages to the Future', '📚', 'Wisdom and messages for future generations', 15),
('possessions-meaning', 'Family Possessions & Objects of Meaning', '🖼️', 'Meaningful objects and their stories', 16)
ON CONFLICT (id) DO NOTHING;

-- Insert sample questions (Family & Ancestry category)
INSERT INTO questions (id, category_id, base_text, variants, sort_order) VALUES
('family-origins', 'family-ancestry', 'What do you know about your family''s origins or ancestry?', 
 '{"mom": "What do you know about our family''s origins or ancestry?", "dad": "What do you know about our family''s origins or ancestry?", "grandparent": "What do you know about your family''s origins or ancestry?", "spouse": "What do you know about your family''s origins or ancestry?", "sibling": "What do you know about our family''s origins or ancestry?"}', 1),

('parents-grandparents-origins', 'family-ancestry', 'Where did your parents and grandparents grow up?',
 '{"mom": "Where did your parents and grandparents grow up?", "dad": "Where did your parents and grandparents grow up?", "grandparent": "Where did your parents grow up?"}', 2),

('cultural-traditions', 'family-ancestry', 'What are some cultural or religious traditions passed down in your family?',
 '{"mom": "What cultural or religious traditions did you pass down to us?", "dad": "What cultural or religious traditions did you pass down to us?", "grandparent": "What cultural or religious traditions have you passed down to our family?"}', 3),

('family-stories', 'family-ancestry', 'Do you have any interesting family stories or legends?', '{}', 4),

('family-heirlooms', 'family-ancestry', 'What family heirlooms or keepsakes are special to you?',
 '{"mom": "What family heirlooms or keepsakes are special to you that you''d like to pass down?", "dad": "What family heirlooms or keepsakes are special to you that you''d like to pass down?"}', 5)

ON CONFLICT (id) DO NOTHING;

-- Insert Early Childhood questions
INSERT INTO questions (id, category_id, base_text, variants, sort_order) VALUES
('birth-details', 'early-childhood', 'Where and when were you born?', '{}', 1),
('first-home', 'early-childhood', 'Do you remember your first home?',
 '{"mom": "Do you remember the home where you raised us?", "dad": "Do you remember the home where you raised us?"}', 2),
('parents-young', 'early-childhood', 'What were your parents like when you were young?',
 '{"mom": "What were your parents like when you were young?", "dad": "What were your parents like when you were young?", "grandparent": "What were your parents like?"}', 3),
('childhood-caretakers', 'early-childhood', 'Who took care of you as a baby?', '{}', 4),
('earliest-memory', 'early-childhood', 'What''s your earliest memory?', '{}', 5),
('favorite-toys', 'early-childhood', 'Did you have any favorite toys or games?',
 '{"mom": "What were your favorite toys or games as a child?", "dad": "What were your favorite toys or games as a child?"}', 6),
('childhood-health', 'early-childhood', 'Were there any childhood illnesses or health challenges?', '{}', 7)
ON CONFLICT (id) DO NOTHING;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_category_id ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_story_responses_session_id ON story_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_story_responses_question_id ON story_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON invitations(invite_token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_sessions_updated_at BEFORE UPDATE ON user_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_story_responses_updated_at BEFORE UPDATE ON story_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();