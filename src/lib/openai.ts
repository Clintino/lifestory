import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, you should proxy through your backend
});

const LIFE_STORY_SYSTEM_PROMPT = `You are a master storyteller and biographer specializing in transforming personal memories and experiences into beautiful, emotionally resonant life stories. Your role is to craft compelling narratives that preserve family legacies and connect generations.

## Your Mission:
Transform raw responses from life story interviews into polished, heartfelt narratives that families will treasure forever. Create stories that feel authentic, personal, and deeply moving while maintaining the person's unique voice and personality.

## Writing Style Guidelines:

### Tone & Voice:
- Warm, intimate, and conversational - like a beloved family member telling stories
- Respectful and dignified while being accessible and relatable
- Emotionally engaging without being overly sentimental or dramatic
- Capture and amplify the person's own voice, personality quirks, and speaking style
- Use humor naturally when it emerges from their responses

### Narrative Structure:
- Begin with a compelling opening that immediately draws readers in
- Weave responses into a cohesive narrative flow rather than Q&A format
- Connect themes and experiences across different time periods
- Build emotional arcs that show growth, challenges, and wisdom gained
- End with forward-looking thoughts, legacy, or meaningful reflection

### Language & Style:
- Use vivid, sensory details to bring memories to life ("the smell of fresh bread," "the sound of laughter")
- Include direct quotes and specific phrases from their responses when powerful
- Vary sentence length and structure for natural rhythm and flow
- Transform simple statements into rich, contextual stories
- Avoid clichés; find fresh, authentic ways to express universal experiences

### Content Enhancement:
- Expand brief responses into full scenes with context and emotion
- Connect individual memories to broader life themes and values
- Show how experiences shaped their character and worldview
- Include both joyful and challenging moments for authentic depth
- Highlight unique personality traits, habits, and perspectives

## Transformation Examples:

### Input: "I had 2 dogs"
### Output: "We had two dogs growing up. They were loud, messy, and basically ran the house — in the best way. Those dogs taught me that the best kind of chaos is the kind filled with unconditional love."

### Input: "My pet jumped on the roof"
### Output: "One of them once got up on the roof. Don't even ask how. The whole neighborhood came out like it was a parade. That moment still gets brought up every time the family's all together — it's become one of those stories that defines us."

### Input: "Family first"
### Output: "Through it all, one thing never wavered: family came first. Not in a suffocating way, but in the way that meant we always had each other's backs, always made room at the table for one more, and always knew where home was."

## Specific Techniques:

### Opening Hooks:
- Start with a vivid scene, meaningful quote, or intriguing detail from their responses
- Avoid generic biographical openings
- Examples: "The smell of [specific detail] always reminded them of..." or "When asked about [topic], their eyes still light up..."

### Emotional Resonance:
- Capture the emotions and meaning behind simple facts
- Use scenes and specific moments rather than just telling
- Show character through actions and choices described in responses
- Make readers feel connected to the person's journey and humanity

### Legacy Integration:
- Weave in lessons learned and wisdom gained throughout the narrative
- Show impact on family, community, and relationships
- Connect past experiences to present values and future hopes
- Highlight what makes this person uniquely special and memorable

## Output Requirements:
- For previews (200 words): Create a compelling excerpt that showcases their personality and leaves readers wanting more
- For full stories (2000 words across 10 pages): Develop a complete, satisfying narrative with multiple chapters/sections
- Use proper paragraphing with natural breaks for readability
- Maintain consistent voice and tone throughout
- Include smooth transitions between different life periods and themes

## Critical Guidelines:
- ALWAYS stay true to the facts and experiences they've shared
- Use their actual words and phrases when they're particularly meaningful
- Don't invent details not provided, but do add emotional context and scene-setting
- Focus on the human story - what makes this person unique and loveable
- Create something the family will be proud to share and preserve

Remember: Every person's story matters and has unique value. Your job is to find the extraordinary in the ordinary, reveal the deeper meaning in simple moments, and create a narrative that honors their life while connecting with readers across generations. Transform their responses into a story that feels like the person themselves is telling it to someone they love.`;

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
    
    // Filter out empty responses and prepare them with context
    const meaningfulResponses = Object.entries(responses)
      .filter(([_, value]) => value && value.trim().length > 0)
      .map(([questionId, response]) => {
        // Try to find the original question text for context
        const question = selectedQuestions.find(q => q.id === questionId);
        const questionText = question?.text || questionId;
        return `Q: ${questionText}\nA: ${response}`;
      });

    if (meaningfulResponses.length === 0) {
      throw new Error('No meaningful responses provided to generate story from');
    }

    // Determine relationship context for personalization
    const relationshipContext = relationship === 'myself' 
      ? 'This is an autobiography - the person is telling their own story.'
      : relationship 
      ? `This story is being created by their ${relationship} to preserve family memories.`
      : '';

    // Create the user prompt with specific instructions
    const userPrompt = `Please create a ${isPreview ? 'compelling preview excerpt (200 words)' : 'complete life story (2000 words)'} for ${name}${birthYear}.

${description ? `Brief description: ${description}` : ''}
${relationshipContext}

Here are the interview responses to transform into a beautiful narrative:

${meaningfulResponses.join('\n\n')}

${isPreview ? 
  `PREVIEW REQUIREMENTS:
- Create an engaging 200-word excerpt that showcases their personality
- Focus on the most compelling and unique elements from their responses
- Use their actual words and experiences as the foundation
- Make it feel like a warm, personal story being shared
- End with a sense that there's much more wonderful story to discover
- Transform simple responses into rich, emotional narrative` : 
  `FULL STORY REQUIREMENTS:
- Create a complete 2000-word life story across multiple thematic sections
- Weave together all provided responses into a cohesive, flowing narrative
- Transform brief responses into full scenes with context and emotion
- Show their personality, values, and unique character throughout
- Include both joyful and meaningful moments for authentic depth
- Structure it as a beautiful, readable story families will treasure
- Use their actual experiences and words as the foundation, but enhance with storytelling`
}

CRITICAL: Transform their simple responses (like "I had 2 dogs" or "family first") into rich, warm narrative sections that capture the emotion and meaning behind their words. Make this feel like the person themselves is telling their story to someone they love.`;

    // Use GPT-4o with optimal settings for storytelling
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Best model for storytelling quality
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
      temperature: 0.7, // Creative but consistent output
      max_tokens: isPreview ? 400 : 2500, // 200 words for preview, 2000+ for full stories
      presence_penalty: 0.1, // Slight penalty to avoid repetition
      frequency_penalty: 0.1, // Encourage varied language
    });

    const generatedContent = completion.choices[0].message.content;
    
    if (!generatedContent) {
      throw new Error('No content generated from OpenAI');
    }

    return generatedContent;
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Graceful fallback if API fails
    const name = profileData?.name || 'our loved one';
    const responseCount = Object.values(responses).filter(r => r && r.trim().length > 0).length;
    
    const fallbackStory = `${name} has lived a life rich with experiences and memories that deserve to be preserved. Through the ${responseCount} questions answered, we can see glimpses of a remarkable journey filled with unique moments, personal growth, and meaningful connections.

${Object.values(responses).filter(r => r && r.trim().length > 0).slice(0, 2).map(response => {
  const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 10);
  return sentences.length > 0 ? sentences[0].trim() + '.' : response;
}).join(' ')}

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
          content: "Extract or create a beautiful, meaningful quote (20-80 words) from the provided life story responses. The quote should be emotionally resonant and capture the essence of this person's wisdom, personality, or experience. Transform their actual words into something quotable and profound. Return only the quote text, no quotation marks."
        },
        {
          role: "user",
          content: `Transform these responses into a meaningful quote that captures their essence:\n\n${meaningfulResponses.join('\n\n')}`
        }
      ],
      temperature: 0.8, // More creative for quote generation
      max_tokens: 150,
    });

    return completion.choices[0].message.content || "A life filled with precious memories and wisdom...";
  } catch (error) {
    console.error('Error generating quote:', error);
    
    // Smart fallback - try to extract from actual responses
    const responseValues = Object.values(responses).filter(r => typeof r === 'string' && r.trim().length > 0);
    
    if (responseValues.length > 0) {
      // Look for meaningful sentences in their responses
      for (const response of responseValues) {
        const sentences = (response as string).split(/[.!?]+/).filter(s => s.trim().length > 20);
        for (const sentence of sentences) {
          const trimmed = sentence.trim();
          if (trimmed.length > 30 && trimmed.length < 120) {
            return trimmed + (trimmed.endsWith('.') ? '' : '...');
          }
        }
      }
    }
    
    return "Every life has a story worth telling...";
  }
};

// Function to generate chapter suggestions based on responses
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
          content: "Based on the life story responses provided, suggest 4-6 compelling chapter titles and descriptions that would organize this person's story in an engaging way. Focus on the themes and experiences that emerge from their actual responses. Return as a JSON array with objects containing 'id' (number), 'title' (string), and 'description' (string) fields. Make titles personal and evocative, not generic."
        },
        {
          role: "user",
          content: `Suggest chapters based on these actual life experiences:\n\n${meaningfulResponses.map(([q, a]) => `${q}: ${a}`).join('\n\n')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const result = completion.choices[0].message.content;
    try {
      return JSON.parse(result || '[]');
    } catch (parseError) {
      console.error('Error parsing chapter suggestions:', parseError);
      throw parseError;
    }
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

// Function to generate full multi-chapter story
export const generateFullStorybook = async (
  responses: Record<string, string>, 
  profileData: any = {},
  options: {
    relationship?: string;
    selectedQuestions?: any[];
  } = {}
) => {
  try {
    const { relationship = '', selectedQuestions = [] } = options;
    
    // First generate chapter structure
    const chapters = await generateChapterSuggestions(responses, profileData);
    
    // Then generate full story content
    const fullStory = await generateStoryContent(responses, profileData, {
      isPreview: false,
      relationship,
      selectedQuestions
    });
    
    // Split the full story into chapters (this is a simplified approach)
    const storyParagraphs = fullStory.split('\n\n').filter(p => p.trim().length > 0);
    const paragraphsPerChapter = Math.ceil(storyParagraphs.length / chapters.length);
    
    const chaptersWithContent = chapters.map((chapter, index) => {
      const startIndex = index * paragraphsPerChapter;
      const endIndex = Math.min(startIndex + paragraphsPerChapter, storyParagraphs.length);
      const chapterContent = storyParagraphs.slice(startIndex, endIndex).join('\n\n');
      
      return {
        ...chapter,
        content: chapterContent || `This chapter will contain beautiful stories about ${chapter.description.toLowerCase()}.`
      };
    });
    
    return {
      chapters: chaptersWithContent,
      fullStory,
      metadata: {
        generatedAt: new Date().toISOString(),
        wordCount: fullStory.split(' ').length,
        profileData
      }
    };
  } catch (error) {
    console.error('Error generating full storybook:', error);
    throw error;
  }
};