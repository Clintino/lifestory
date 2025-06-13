export type QuestionCategory = {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  variants?: {
    mom?: string;
    dad?: string;
    grandparent?: string;
    spouse?: string;
    sibling?: string;
    other?: string;
  };
};

export const questionCategories: QuestionCategory[] = [
  {
    id: 'family-ancestry',
    name: 'Family & Ancestry',
    icon: '🧬',
    description: 'Origins, heritage, and family history',
    questions: [
      {
        id: 'family-origins',
        text: 'What do you know about your family\'s origins or ancestry?',
        variants: {
          mom: 'What do you know about our family\'s origins or ancestry?',
          dad: 'What do you know about our family\'s origins or ancestry?',
          grandparent: 'What do you know about your family\'s origins or ancestry?',
          spouse: 'What do you know about your family\'s origins or ancestry?',
          sibling: 'What do you know about our family\'s origins or ancestry?'
        }
      },
      {
        id: 'parents-grandparents-origins',
        text: 'Where did your parents and grandparents grow up?',
        variants: {
          mom: 'Where did your parents and grandparents grow up?',
          dad: 'Where did your parents and grandparents grow up?',
          grandparent: 'Where did your parents grow up?'
        }
      },
      {
        id: 'cultural-traditions',
        text: 'What are some cultural or religious traditions passed down in your family?',
        variants: {
          mom: 'What cultural or religious traditions did you pass down to us?',
          dad: 'What cultural or religious traditions did you pass down to us?',
          grandparent: 'What cultural or religious traditions have you passed down to our family?'
        }
      },
      {
        id: 'family-stories',
        text: 'Do you have any interesting family stories or legends?'
      },
      {
        id: 'family-heirlooms',
        text: 'What family heirlooms or keepsakes are special to you?',
        variants: {
          mom: 'What family heirlooms or keepsakes are special to you that you\'d like to pass down?',
          dad: 'What family heirlooms or keepsakes are special to you that you\'d like to pass down?'
        }
      }
    ]
  },
  {
    id: 'early-childhood',
    name: 'Early Childhood',
    icon: '👶',
    description: 'Birth, early years, and first memories',
    questions: [
      {
        id: 'birth-details',
        text: 'Where and when were you born?'
      },
      {
        id: 'first-home',
        text: 'Do you remember your first home?',
        variants: {
          mom: 'Do you remember the home where you raised us?',
          dad: 'Do you remember the home where you raised us?'
        }
      },
      {
        id: 'parents-young',
        text: 'What were your parents like when you were young?',
        variants: {
          mom: 'What were your parents like when you were young?',
          dad: 'What were your parents like when you were young?',
          grandparent: 'What were your parents like?'
        }
      },
      {
        id: 'childhood-caretakers',
        text: 'Who took care of you as a baby?'
      },
      {
        id: 'earliest-memory',
        text: 'What\'s your earliest memory?'
      },
      {
        id: 'favorite-toys',
        text: 'Did you have any favorite toys or games?',
        variants: {
          mom: 'What were your favorite toys or games as a child?',
          dad: 'What were your favorite toys or games as a child?'
        }
      },
      {
        id: 'childhood-health',
        text: 'Were there any childhood illnesses or health challenges?'
      }
    ]
  },
  {
    id: 'school-years',
    name: 'School Years',
    icon: '🎒',
    description: 'Education, teachers, and school experiences',
    questions: [
      {
        id: 'school-location',
        text: 'Where did you go to school?'
      },
      {
        id: 'favorite-subjects',
        text: 'What subjects did you love or struggle with?'
      },
      {
        id: 'favorite-teachers',
        text: 'Who were your favorite teachers?'
      },
      {
        id: 'school-routine',
        text: 'What was your school routine like?'
      },
      {
        id: 'school-trouble',
        text: 'Did you get into trouble at school? For what?'
      },
      {
        id: 'school-activities',
        text: 'Were you involved in clubs, sports, or music?'
      },
      {
        id: 'school-friendships',
        text: 'Any school friendships that had a lasting impact?'
      }
    ]
  },
  {
    id: 'friendships-social',
    name: 'Friendships & Social Life',
    icon: '👯‍♀️',
    description: 'Friends, social activities, and relationships',
    questions: [
      {
        id: 'first-best-friend',
        text: 'Who was your first best friend?'
      },
      {
        id: 'childhood-fun',
        text: 'What did you do for fun growing up?'
      },
      {
        id: 'teenage-weekends',
        text: 'What was a typical weekend like for you as a teenager?'
      },
      {
        id: 'social-events',
        text: 'Did you go to dances, parties, or events?'
      },
      {
        id: 'friend-conversations',
        text: 'What kinds of conversations did you have with friends?'
      }
    ]
  },
  {
    id: 'love-relationships',
    name: 'Love & Relationships',
    icon: '💖',
    description: 'Romance, marriage, and partnerships',
    questions: [
      {
        id: 'first-love',
        text: 'When did you first fall in love?',
        variants: {
          mom: 'When did you first fall in love? Was it with Dad?',
          dad: 'When did you first fall in love? Was it with Mom?',
          spouse: 'When did you first fall in love with me?'
        }
      },
      {
        id: 'meeting-partner',
        text: 'How did you meet your partner or spouse?',
        variants: {
          mom: 'How did you meet Dad?',
          dad: 'How did you meet Mom?',
          spouse: 'How did we first meet?'
        }
      },
      {
        id: 'first-date',
        text: 'What do you remember about your first date?',
        variants: {
          spouse: 'What do you remember about our first date?'
        }
      },
      {
        id: 'proposal',
        text: 'How did you propose or get proposed to?',
        variants: {
          mom: 'How did Dad propose to you?',
          dad: 'How did you propose to Mom?',
          spouse: 'Tell me about our proposal story.'
        }
      },
      {
        id: 'wedding-day',
        text: 'What was your wedding day like?',
        variants: {
          spouse: 'What was our wedding day like for you?'
        }
      },
      {
        id: 'relationship-impact',
        text: 'How have your relationships shaped who you are?'
      }
    ]
  },
  {
    id: 'parenting-family',
    name: 'Parenting & Family Life',
    icon: '👶',
    description: 'Raising children and family traditions',
    questions: [
      {
        id: 'becoming-parent',
        text: 'What was it like to become a parent for the first time?',
        variants: {
          mom: 'What was it like when you first became a mother?',
          dad: 'What was it like when you first became a father?'
        }
      },
      {
        id: 'choosing-names',
        text: 'How did you choose your children\'s names?',
        variants: {
          mom: 'How did you and Dad choose our names?',
          dad: 'How did you and Mom choose our names?'
        }
      },
      {
        id: 'parenting-values',
        text: 'What values were most important to teach your children?',
        variants: {
          mom: 'What values were most important for you to teach us?',
          dad: 'What values were most important for you to teach us?'
        }
      },
      {
        id: 'family-traditions',
        text: 'What traditions or routines did your family have?',
        variants: {
          mom: 'What traditions did you create for our family?',
          dad: 'What traditions did you create for our family?'
        }
      },
      {
        id: 'parenting-moments',
        text: 'Funniest parenting moment? Most challenging?',
        variants: {
          mom: 'What\'s your funniest memory of raising us? Most challenging?',
          dad: 'What\'s your funniest memory of raising us? Most challenging?'
        }
      }
    ]
  },
  {
    id: 'work-career',
    name: 'Work & Career',
    icon: '💼',
    description: 'Professional life and achievements',
    questions: [
      {
        id: 'first-job',
        text: 'What was your first job?'
      },
      {
        id: 'dream-job',
        text: 'What was your dream job growing up?'
      },
      {
        id: 'job-experiences',
        text: 'What jobs did you love? Which ones did you hate?'
      },
      {
        id: 'mentors-colleagues',
        text: 'Did you have any mentors or important colleagues?'
      },
      {
        id: 'proudest-work',
        text: 'What work are you most proud of?'
      },
      {
        id: 'career-evolution',
        text: 'How did your career evolve over time?'
      }
    ]
  },
  {
    id: 'home-daily-life',
    name: 'Home Life & Daily Routine',
    icon: '🏠',
    description: 'Daily life, routines, and living spaces',
    questions: [
      {
        id: 'childhood-daily-routine',
        text: 'Describe a typical day at home during your childhood.'
      },
      {
        id: 'childhood-room',
        text: 'What was your room like?',
        variants: {
          mom: 'What was your childhood room like?',
          dad: 'What was your childhood room like?'
        }
      },
      {
        id: 'childhood-chores',
        text: 'What chores did you do growing up?'
      },
      {
        id: 'home-organization',
        text: 'How do you like to organize your home now?'
      },
      {
        id: 'favorite-home-spot',
        text: 'What\'s your favorite spot in your current home?'
      }
    ]
  },
  {
    id: 'travel-adventure',
    name: 'Travel & Adventure',
    icon: '✈️',
    description: 'Journeys, vacations, and adventures',
    questions: [
      {
        id: 'transformative-places',
        text: 'What places have you visited that changed you?'
      },
      {
        id: 'family-vacation-memory',
        text: 'Do you have a favorite family vacation memory?',
        variants: {
          mom: 'What\'s your favorite family vacation memory with us?',
          dad: 'What\'s your favorite family vacation memory with us?'
        }
      },
      {
        id: 'living-abroad',
        text: 'Did you ever live abroad or travel far from home?'
      },
      {
        id: 'dream-trip',
        text: 'What trip would you still like to take?'
      },
      {
        id: 'travel-story',
        text: 'What\'s one travel story you always tell?'
      }
    ]
  },
  {
    id: 'beliefs-values',
    name: 'Beliefs & Personal Values',
    icon: '🧠',
    description: 'Philosophy, beliefs, and life principles',
    questions: [
      {
        id: 'deep-beliefs',
        text: 'What do you believe in most deeply?'
      },
      {
        id: 'changing-beliefs',
        text: 'Have your beliefs changed over time?'
      },
      {
        id: 'turning-points',
        text: 'Were there turning points that reshaped your worldview?'
      },
      {
        id: 'defining-success',
        text: 'How do you define success? Happiness? Legacy?'
      },
      {
        id: 'future-generations-hope',
        text: 'What do you hope future generations learn from you?',
        variants: {
          mom: 'What do you hope your children and grandchildren learn from you?',
          dad: 'What do you hope your children and grandchildren learn from you?',
          grandparent: 'What do you hope your grandchildren learn from you?'
        }
      }
    ]
  },
  {
    id: 'hobbies-passions',
    name: 'Hobbies & Passions',
    icon: '🎨',
    description: 'Interests, creativity, and personal pursuits',
    questions: [
      {
        id: 'childhood-hobbies',
        text: 'What hobbies did you have growing up?'
      },
      {
        id: 'current-hobbies',
        text: 'What are your current hobbies or side projects?'
      },
      {
        id: 'creative-works',
        text: 'Have you created any art, music, writing, or crafts?'
      },
      {
        id: 'new-interests',
        text: 'What\'s something new you\'ve always wanted to try?'
      },
      {
        id: 'collections',
        text: 'Do you collect anything?'
      }
    ]
  },
  {
    id: 'pets-animals',
    name: 'Pets & Animals',
    icon: '🐶',
    description: 'Animal companions and wildlife experiences',
    questions: [
      {
        id: 'childhood-pets',
        text: 'Did you grow up with any pets?'
      },
      {
        id: 'animals-family-role',
        text: 'What role did animals play in your family?',
        variants: {
          mom: 'What role did pets play in our family?',
          dad: 'What role did pets play in our family?'
        }
      },
      {
        id: 'pet-story',
        text: 'Share a funny or touching pet story.'
      },
      {
        id: 'animal-identity',
        text: 'If you could be any animal, what would you be and why?'
      }
    ]
  },
  {
    id: 'aging-reflection',
    name: 'Aging & Reflection',
    icon: '🧓',
    description: 'Life lessons and wisdom gained',
    questions: [
      {
        id: 'biggest-lesson',
        text: 'What has been the biggest lesson of your life?'
      },
      {
        id: 'advice-younger-self',
        text: 'What do you wish you could tell your younger self?'
      },
      {
        id: 'proudest-achievement',
        text: 'What are you most proud of?'
      },
      {
        id: 'still-working-on',
        text: 'What\'s something you\'re still working on?'
      },
      {
        id: 'how-remembered',
        text: 'How do you want to be remembered?'
      }
    ]
  },
  {
    id: 'digital-modern',
    name: 'Digital Footprint & Modern Life',
    icon: '💻',
    description: 'Technology and modern experiences',
    questions: [
      {
        id: 'first-internet',
        text: 'When did you first use the internet?'
      },
      {
        id: 'first-cellphone',
        text: 'What was your first cell phone?'
      },
      {
        id: 'technology-impact',
        text: 'How has technology changed your life?'
      },
      {
        id: 'favorite-tech',
        text: 'What\'s your favorite app or gadget today?'
      }
    ]
  },
  {
    id: 'legacy-messages',
    name: 'Legacy & Messages to the Future',
    icon: '📚',
    description: 'Wisdom and messages for future generations',
    questions: [
      {
        id: 'letter-descendants',
        text: 'Write a letter to your grandchildren or future descendants.',
        variants: {
          mom: 'Write a letter to your grandchildren.',
          dad: 'Write a letter to your grandchildren.',
          grandparent: 'Write a letter to your great-grandchildren.'
        }
      },
      {
        id: 'meaningful-recipe',
        text: 'Share a recipe that means something to you.',
        variants: {
          mom: 'Share a family recipe and its story.',
          dad: 'Share a family recipe and its story.'
        }
      },
      {
        id: 'family-values-hold',
        text: 'What values should your family hold onto?',
        variants: {
          mom: 'What values should our family always hold onto?',
          dad: 'What values should our family always hold onto?'
        }
      },
      {
        id: 'life-philosophy',
        text: 'What would your "life philosophy" be in one sentence?'
      },
      {
        id: 'final-message',
        text: 'Anything else you want future generations to know?'
      }
    ]
  },
  {
    id: 'possessions-meaning',
    name: 'Family Possessions & Objects of Meaning',
    icon: '🖼️',
    description: 'Meaningful objects and their stories',
    questions: [
      {
        id: 'family-cookbook',
        text: 'Do you have a family cookbook, journal, or recipe passed down?'
      },
      {
        id: 'jewelry-story',
        text: 'What\'s the story behind your wedding ring, watch, or necklace?',
        variants: {
          mom: 'What\'s the story behind your wedding ring or special jewelry?',
          dad: 'What\'s the story behind your wedding ring or watch?',
          spouse: 'What\'s the story behind your wedding ring?'
        }
      },
      {
        id: 'sentimental-furniture',
        text: 'Any pieces of furniture with sentimental value?'
      },
      {
        id: 'meaningful-photographs',
        text: 'Which photographs mean the most to you and why?'
      },
      {
        id: 'fire-rescue-item',
        text: 'If your home were on fire, what\'s the one thing you\'d grab?'
      }
    ]
  }
];

export const getQuestionText = (question: Question, relationship: string): string => {
  if (question.variants && question.variants[relationship as keyof typeof question.variants]) {
    return question.variants[relationship as keyof typeof question.variants]!;
  }
  return question.text;
};

export const getQuestionsForCategory = (categoryId: string, relationship: string): Question[] => {
  const category = questionCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return category.questions.map(question => ({
    ...question,
    text: getQuestionText(question, relationship)
  }));
};