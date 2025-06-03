import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Configuration, OpenAIApi } from 'npm:openai@^4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

    // Get the audio file from the request
    const formData = await req.formData();
    const audioFile = formData.get('audio');

    if (!audioFile || !(audioFile instanceof File)) {
      throw new Error('No audio file provided');
    }

    // Transcribe the audio using Whisper API
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
    });

    return new Response(
      JSON.stringify({ text: response.text }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});