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
    const { email, profileName, senderName } = await req.json()

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
    // await storeInvitation(inviteId, email, profileName, senderName)

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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #E75A68; text-align: center;">Your Story Matters</h1>
          
          <p>Hello ${profileName},</p>
          
          <p>${senderName || 'Someone special'} has invited you to share your life story through our Life Story platform.</p>
          
          <p>We've prepared some thoughtful questions to help capture your memories and experiences. Your responses will be transformed into a beautiful digital storybook that can be treasured by your family for generations.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteLink}" style="background-color: #E75A68; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Share Your Story</a>
          </div>
          
          <p>The questions include:</p>
          <ul>
            <li>What was your childhood like?</li>
            <li>What is your proudest achievement?</li>
            <li>What is a challenge you overcame?</li>
            <li>What are some traditions you value?</li>
            <li>What wisdom would you like to pass on?</li>
          </ul>
          
          <p>This should take about 15-20 minutes to complete, and you can save your progress and return anytime.</p>
          
          <p>Thank you for sharing your precious memories with us.</p>
          
          <p>Warm regards,<br>The Life Story Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">
            If you have any questions, please contact us at support@lifestory.app
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
        inviteLink: inviteLink 
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