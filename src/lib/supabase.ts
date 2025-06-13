import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Profile = {
  id: string
  name: string
  birth_year?: number
  description?: string
  relationship_type: string
  custom_relationship?: string
  images: string[]
  created_at: string
  updated_at: string
}

export type QuestionCategory = {
  id: string
  name: string
  icon: string
  description: string
  sort_order: number
  created_at: string
}

export type Question = {
  id: string
  category_id: string
  base_text: string
  variants: Record<string, string>
  sort_order: number
  created_at: string
}

export type UserSession = {
  id: string
  session_token: string
  profile_id?: string
  current_step: number
  selected_questions: any[]
  progress_data: Record<string, any>
  created_at: string
  updated_at: string
  expires_at: string
}

export type StoryResponse = {
  id: string
  session_id: string
  question_id: string
  response_text?: string
  response_audio_url?: string
  created_at: string
  updated_at: string
}

export type Invitation = {
  id: string
  invite_token: string
  email: string
  profile_name: string
  sender_name?: string
  selected_questions: any[]
  status: 'sent' | 'opened' | 'completed'
  sent_at: string
  opened_at?: string
  completed_at?: string
  expires_at: string
}

// Helper functions
export const getQuestionsWithVariants = async (relationship: string) => {
  const { data: categories, error: categoriesError } = await supabase
    .from('question_categories')
    .select('*')
    .order('sort_order')

  if (categoriesError) throw categoriesError

  const { data: questions, error: questionsError } = await supabase
    .from('questions')
    .select('*')
    .order('sort_order')

  if (questionsError) throw questionsError

  // Group questions by category and apply variants
  const categoriesWithQuestions = categories.map(category => ({
    ...category,
    questions: questions
      .filter(q => q.category_id === category.id)
      .map(question => ({
        ...question,
        text: question.variants[relationship] || question.base_text
      }))
  }))

  return categoriesWithQuestions
}

export const createSession = async (profileData: any, relationshipData: any, selectedQuestions: any[]) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/create-session`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      profileData,
      relationshipData,
      selectedQuestions
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || 'Failed to create session')
  }

  return response.json()
}

export const saveResponses = async (sessionToken: string, responses: Record<string, string>) => {
  const response = await fetch(`${supabaseUrl}/functions/v1/save-responses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionToken,
      responses
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || 'Failed to save responses')
  }

  return response.json()
}