import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    const { email, profileName, senderName, questions } = await req.json()

    if (!email || !profileName) {
      throw new Error('Email and profile name are required')
    }

    const brevoApiKey = Deno.env.get('BREVO_API_KEY')
    if (!brevoApiKey) {
      throw new Error('Brevo API key not configured')
    }

    // Generate a unique link for the person to fill out their story
    const inviteId = crypto.randomUUID()
    const inviteLink = `${Deno.env.get('SITE_URL') || 'https://your-domain.com'}/story-form/${inviteId}`

    // Store the invitation in your database (you'd implement this)
    // await storeInvitation(inviteId, email, profileName, senderName, questions)

    // Create questions list for email
    const questionsList = questions && questions.length > 0 
      ? questions.map((q: any, index: number) => `${index + 1}. ${q.text}`).join('\n')
      : `1. What was your childhood like?
2. What is your proudest achievement?
3. What is a challenge you overcame?
4. What are some traditions you value?
5. What wisdom would you like to pass on?`

    const emailData = {
      sender: {
        name: "Life Story",
        email: "noreply@lifestory.app"
      },
      to: [
        {
          email: email,
          name: profileName
        }
      ],
      subject: `${senderName || 'Someone'} wants to preserve your life story`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E75A68; text-align: center; margin-bottom: 30px;">Your Story Matters</h1>
          
          <p style="font-size: 16px; line-height: 1.6;">Hello ${profileName},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">${senderName || 'Someone special'} has invited you to share your life story through our Life Story platform.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">We've prepared ${questions?.length || 5} thoughtful questions to help capture your memories and experiences. Your responses will be transformed into a beautiful digital storybook that can be treasured by your family for generations.</p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${inviteLink}" style="background-color: #E75A68; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">Share Your Story</a>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #333; margin-top: 0;">The questions include:</h3>
            <div style="white-space: pre-line; font-size: 14px; line-height: 1.5; color: #555;">${questionsList}</div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">This should take about 15-20 minutes to complete, and you can save your progress and return anytime.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">Thank you for sharing your precious memories with us.</p>
          
          <p style="font-size: 16px; line-height: 1.6;">Warm regards,<br>The Life Story Team</p>
          
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666; text-align: center;">
            If you have any questions, please contact us at support@lifestory.app<br>
            This invitation was sent by ${senderName || 'a family member'} on your behalf.
          </p>
        </div>
      `
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Brevo API error: ${errorData.message || 'Unknown error'}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.messageId,
        inviteLink: inviteLink,
        questionsCount: questions?.length || 5
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Email sending error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send invitation email',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})