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

    const { sessionToken, responses } = await req.json()

    // Get session
    const { data: session, error: sessionError } = await supabaseClient
      .from('user_sessions')
      .select('id')
      .eq('session_token', sessionToken)
      .single()

    if (sessionError) throw new Error('Invalid session')

    // Save responses
    const responseInserts = Object.entries(responses).map(([questionId, responseText]) => ({
      session_id: session.id,
      question_id: questionId,
      response_text: responseText as string
    }))

    const { error: responsesError } = await supabaseClient
      .from('story_responses')
      .upsert(responseInserts, { 
        onConflict: 'session_id,question_id',
        ignoreDuplicates: false 
      })

    if (responsesError) throw responsesError

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Save responses error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to save responses', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})