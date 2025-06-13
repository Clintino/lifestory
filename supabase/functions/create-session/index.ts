import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { profileData, relationshipData, selectedQuestions } = await req.json()

    // Create profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        name: profileData.name,
        birth_year: profileData.birthYear ? parseInt(profileData.birthYear) : null,
        description: profileData.description,
        relationship_type: relationshipData.relationship,
        custom_relationship: relationshipData.customRelationship,
        images: profileData.images || []
      })
      .select()
      .single()

    if (profileError) throw profileError

    // Create session
    const sessionToken = crypto.randomUUID()
    const { data: session, error: sessionError } = await supabaseClient
      .from('user_sessions')
      .insert({
        session_token: sessionToken,
        profile_id: profile.id,
        current_step: 4, // Story input step
        selected_questions: selectedQuestions || []
      })
      .select()
      .single()

    if (sessionError) throw sessionError

    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionToken,
        profileId: profile.id,
        sessionId: session.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Session creation error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to create session', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})