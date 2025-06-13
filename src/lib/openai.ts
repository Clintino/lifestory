import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy through your backend
});

const LIFE_STORY_SYSTEM_PROMPT = `You are a master storyteller and biographer specializing in transforming personal memories and experiences into beautiful, emotionally resonant life stories. Your role is to craft compelling narratives that preserve family legacies and connect generations.

## Your Mission:
Transform raw responses from life story interviews into polished, heartfelt narratives that families will treasure forever. Create stories that feel authentic, personal, and deeply moving.

## Writing Style Guidelines:

### Tone & Voice:
- Warm, intimate, and conversational
- Respectful and dignified while being accessible
- Emotionally engaging without being overly sentimental
- Use the person's own voice and personality when possible

### Structure:
- Begin with a compelling opening that draws readers in
- Organize chronologically or thematically as appropriate
- Include specific details, dates, and names when provided
- End with wisdom, legacy, or forward-looking thoughts

### Language:
- Use vivid, sensory details to bring memories to life
- Include direct quotes when available
- Vary sentence length for rhythm and flow
- Avoid clichés; find fresh ways to express universal experiences

### Content Approach:
- Highlight unique personality traits and quirks
- Include both joyful and challenging moments for authenticity
- Connect individual experiences to broader historical context when relevant
- Show how experiences shaped the person's character and values

## Specific Techniques:

### Opening Hooks:
- Start with a vivid scene, meaningful quote, or intriguing detail
- Avoid generic openings like "John was born in..."
- Examples: "The smell of fresh bread always reminded Sarah of her grandmother's kitchen..." or "When asked about his proudest moment, David's eyes still light up..."

### Transitions:
- Use smooth transitions between time periods and topics
- Connect themes across different life stages
- Show growth and change over time

### Emotional Resonance:
- Capture the emotions behind the facts
- Show don't just tell - use scenes and dialogue
- Include moments of humor, love, struggle, and triumph
- Make readers feel connected to the person's journey

### Legacy Focus:
- Highlight lessons learned and wisdom gained
- Show impact on family and community
- Include hopes and dreams for future generations
- Connect past experiences to present values

## Output Format:
- Create a cohesive narrative of 800-1500 words for a complete story
- For previews, provide 300-500 words that give a taste of the full story
- Use proper paragraphing and formatting
- Include chapter suggestions for longer works

## Remember:
Every person's story matters. Your job is to find the extraordinary in the ordinary, the universal in the specific, and the timeless in the temporal. Create stories that make families proud and help preserve precious memories for generations to come.

When given sparse information, use your creativity to weave a compelling narrative while staying true to the facts provided. Focus on the emotional truth and human experience behind the details.`;

export const generateStoryContent = async (
  responses: Record<string, string>, 
  profileData: any = {},
  options: {
    isPreview?: boolean;
    relationship?: string;
    selectedQuestions?: any[];
  } = {}
) => {
  try {
    const { isPreview = false, relationship = '', selectedQuestions = [] } = options;
    
    // Prepare the context
    const name = profileData?.name || 'this remarkable person';
    const birthYear = profileData?.birthYear ? ` (born ${profileData.birthYear})` : '';
    const description = profileData?.description || '';
    
    // Filter out empty responses
    const meaningfulResponses = Object.entries(responses)
      .filter(([_, value]) => value && value.trim().length > 0)
      .map(([questionId, response]) => {
        // Try to find the original question text
        const question = selectedQuestions.find(q => q.id === questionId);
        const questionText = question?.text || questionId;
        return `Q: ${questionText}\nA: ${response}`;
      });

    if (meaningfulResponses.length === 0) {
      throw new Error('No meaningful responses provided to generate story from');
    }

    // Create the user prompt
    const userPrompt = `Please create a ${isPreview ? 'preview excerpt (300-500 words)' : 'complete life story (800-1500 words)'} for ${name}${birthYear}.

${description ? `Brief description: ${description}` : ''}

${relationship ? `Relationship context: This story is being created by their ${relationship}.` : ''}

Here are the interview responses to work with:

${meaningfulResponses.join('\n\n')}

${isPreview ? 
  'Create an engaging preview that gives a taste of their full story. Focus on the most compelling elements and end with a sense that there\'s much more to discover.' : 
  'Create a complete, beautifully crafted life story that weaves together all the provided information into a cohesive, emotionally resonant narrative.'
}

Remember to:
- Use their actual words and experiences as the foundation
- Create a warm, engaging narrative voice
- Include specific details and quotes when available
- Show their personality and character through stories
- Make it feel authentic and personal to them
- ${isPreview ? 'Leave readers wanting to know more' : 'Provide a satisfying, complete portrait of their life'}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: LIFE_STORY_SYSTEM_PROMPT 
        },
        { 
          role: "user", 
          content: userPrompt 
        }
      ],
      temperature: 0.7,
      max_tokens: isPreview ? 800 : 2000,
    });

    const generatedContent = completion.choices[0].message.content;
    
    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return generatedContent;
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Provide a fallback story if OpenAI fails
    const name = profileData?.name || 'our loved one';
    const fallbackStory = `${name} has lived a life rich with experiences and memories that deserve to be preserved. Through the questions answered, we can see glimpses of a remarkable journey filled with unique moments, personal growth, and meaningful connections.

Every response shared reveals another layer of their character and the experiences that have shaped who they are today. These stories and memories are more than just tales from the past - they are the threads that weave together our family's tapestry, connecting generations through shared experiences and values.

This is just the beginning of preserving their incredible story for future generations to treasure.`;
    
    return fallbackStory;
  }
};

// Enhanced function for generating dynamic quotes from responses
export const generateDynamicQuote = async (responses: Record<string, string>) => {
  try {
    const meaningfulResponses = Object.values(responses)
      .filter(r => typeof r === 'string' && r.trim().length > 20);
    
    if (meaningfulResponses.length === 0) {
      return "Every life has a story worth telling...";
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Extract or create a beautiful, meaningful quote (20-80 words) from the provided life story responses. The quote should be emotionally resonant and capture the essence of this person's wisdom or experience. Return only the quote text, no quotation marks."
        },
        {
          role: "user",
          content: `Find the most meaningful quote from these responses:\n\n${meaningfulResponses.join('\n\n')}`
        }
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    return completion.choices[0].message.content || "A life filled with precious memories and wisdom...";
  } catch (error) {
    console.error('Error generating quote:', error);
    return "Every life has a story worth telling...";
  }
};

// Function to generate chapter suggestions
export const generateChapterSuggestions = async (responses: Record<string, string>, profileData: any = {}) => {
  try {
    const meaningfulResponses = Object.entries(responses)
      .filter(([_, value]) => value && value.trim().length > 0);

    if (meaningfulResponses.length === 0) {
      return [
        { id: 1, title: "Early Years", description: "Childhood memories and formative experiences" },
        { id: 2, title: "Growing Up", description: "School years and coming of age" },
        { id: 3, title: "Love & Family", description: "Relationships and family life" },
        { id: 4, title: "Life's Work", description: "Career and achievements" },
        { id: 5, title: "Wisdom & Legacy", description: "Life lessons and messages for the future" }
      ];
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Based on the life story responses provided, suggest 4-6 chapter titles and descriptions that would organize this person's story in a compelling way. Return as JSON array with objects containing 'id', 'title', and 'description' fields."
        },
        {
          role: "user",
          content: `Suggest chapters for this life story:\n\n${meaningfulResponses.map(([q, a]) => `${q}: ${a}`).join('\n\n')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0].message.content;
    return JSON.parse(result || '[]');
  } catch (error) {
    console.error('Error generating chapters:', error);
    return [
      { id: 1, title: "Early Years", description: "Childhood memories and formative experiences" },
      { id: 2, title: "Growing Up", description: "School years and coming of age" },
      { id: 3, title: "Love & Family", description: "Relationships and family life" },
      { id: 4, title: "Life's Work", description: "Career and achievements" },
      { id: 5, title: "Wisdom & Legacy", description: "Life lessons and messages for the future" }
    ];
  }
};