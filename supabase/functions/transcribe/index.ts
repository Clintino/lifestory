import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from "npm:openai@^4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    // Get the audio file from the request
    const formData = await req.formData();
    const audioFile = formData.get('audio');

    if (!audioFile || !(audioFile instanceof File)) {
      throw new Error('No audio file provided');
    }

    // Ensure the file is not empty
    if (audioFile.size === 0) {
      throw new Error('Audio file is empty');
    }

    // Convert the File to a Blob and then to ArrayBuffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/webm' });

    // Transcribe the audio using Whisper API
    const response = await openai.audio.transcriptions.create({
      file: blob,
      model: 'whisper-1',
      language: 'en',
      response_format: 'json',
    });

    return new Response(
      JSON.stringify({ text: response.text }),
      {
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error('Transcription error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to transcribe audio',
        details: error.message 
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});