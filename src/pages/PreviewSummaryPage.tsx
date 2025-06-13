import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Shield, Download, Share2, Lock, ChevronRight, Edit, Loader2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';
import { generateStoryContent, generateDynamicQuote } from '../lib/openai';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Select Questions' },
  { id: 4, label: 'Tell Story' },
  { id: 5, label: 'Preview' },
];

const testimonials = [
  { name: "Sarah M.", text: "It felt like Mom was writing a letter to my kids.", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" },
  { name: "David K.", text: "We'll treasure this forever.", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" },
  { name: "Maria L.", text: "Captured Dad's voice perfectly.", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2" }
];

const lockedChapters = [
  { id: 2, title: "Early Adventures", description: "Childhood memories and formative experiences" },
  { id: 3, title: "Love & Family", description: "Romance, marriage, and raising children" },
  { id: 4, title: "Career & Dreams", description: "Professional life and aspirations" },
  { id: 5, title: "Wisdom & Legacy", description: "Life lessons and messages for the future" }
];

const PreviewSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');
  const [profileData, setProfileData] = useState<any>(null);
  const [showCTA, setShowCTA] = useState(false);
  const [dynamicQuote, setDynamicQuote] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationError, setGenerationError] = useState('');

  useEffect(() => {
    const generateStory = async () => {
      try {
        setIsGenerating(true);
        setGenerationError('');

        // Get data from localStorage
        const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
        const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
        const relationshipData = JSON.parse(localStorage.getItem('relationshipData') || '{}');
        const selectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions') || '[]');
        
        setProfileData(profile);

        // Generate story content using OpenAI
        const content = await generateStoryContent(responses, profile, {
          isPreview: true,
          relationship: relationshipData.relationship,
          selectedQuestions: selectedQuestions
        });
        setStoryContent(content);

        // Generate dynamic quote
        const quote = await generateDynamicQuote(responses);
        setDynamicQuote(quote);

      } catch (error) {
        console.error('Error generating story:', error);
        setGenerationError('Failed to generate story. Please try again.');
        
        // Fallback content
        const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
        const name = profile?.name || 'our loved one';
        setStoryContent(`${name} has lived a life rich with experiences and memories that deserve to be preserved. These stories and memories are more than just tales from the past - they are the threads that weave together our family's tapestry, connecting generations through shared experiences and values.`);
        setDynamicQuote("Every life has a story worth telling...");
      } finally {
        setIsGenerating(false);
      }
    };

    generateStory();

    // Show CTA after scroll
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 25) {
        setShowCTA(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRegenerateStory = async () => {
    setIsGenerating(true);
    setGenerationError('');

    try {
      const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
      const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
      const relationshipData = JSON.parse(localStorage.getItem('relationshipData') || '{}');
      const selectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions') || '[]');

      const content = await generateStoryContent(responses, profile, {
        isPreview: true,
        relationship: relationshipData.relationship,
        selectedQuestions: selectedQuestions
      });
      setStoryContent(content);

      const quote = await generateDynamicQuote(responses);
      setDynamicQuote(quote);
    } catch (error) {
      console.error('Error regenerating story:', error);
      setGenerationError('Failed to regenerate story. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageTransition>
      {/* Light background */}
      <div className="min-h-screen bg-neutral-50">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <ProgressIndicator steps={steps} currentStep={5} />

          {/* Hero Book Frame */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute inset-0 bg-black/10 rounded-lg transform translate-x-1 translate-y-1 blur-sm"></div>
              
              {/* Main book */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-xl border border-neutral-200">
                
                {/* Chapter ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-bl-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium text-sm">Chapter 1 • Life & Legacy</span>
                  </div>
                </div>

                {/* Page content */}
                <div className="p-8 md:p-12">
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <Loader2 size={32} className="animate-spin text-indigo-600 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-neutral-700 mb-2">
                        Crafting your story...
                      </h3>
                      <p className="text-neutral-600">
                        Our AI is weaving together your memories into a beautiful narrative
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Opening pull quote - now dynamic */}
                      <div className="relative mb-8 text-center">
                        <svg className="absolute inset-0 w-full h-full text-neutral-100 -z-10" viewBox="0 0 100 100">
                          <text x="50" y="50" fontSize="60" textAnchor="middle" dominantBaseline="middle" fill="currentColor" opacity="0.3">"</text>
                        </svg>
                        <blockquote className="text-2xl font-serif italic text-neutral-700 relative z-10">
                          "{dynamicQuote}"
                        </blockquote>
                      </div>

                      {/* Story content */}
                      <div className="prose max-w-none">
                        <h1 className="font-serif text-3xl font-bold text-neutral-800 mb-6">
                          {profileData?.name || "Their"} Life Story
                        </h1>
                        
                        {/* Polaroid photo */}
                        {profileData?.images?.[0] && (
                          <div className="float-right ml-6 mb-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white p-3 shadow-lg border border-neutral-200" style={{ width: '200px' }}>
                              <img
                                src={profileData.images[0]}
                                alt={profileData?.name}
                                className="w-full h-32 object-cover"
                              />
                              <p className="text-xs text-center mt-2 font-handwriting text-neutral-600">
                                {profileData?.name} • {profileData?.birthYear || 'Beloved'}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* AI-generated story text */}
                        <div className="text-neutral-700 leading-relaxed space-y-4">
                          {storyContent.split('\n\n').filter(paragraph => paragraph.trim().length > 0).map((paragraph, index) => (
                            <p key={index} className="text-base">
                              {paragraph.trim()}
                            </p>
                          ))}
                        </div>

                        {/* Preview indicator */}
                        <div className="mt-8 flex justify-between items-center">
                          <div className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                            Preview • Page 1 only
                          </div>
                          {generationError && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRegenerateStory}
                              disabled={isGenerating}
                              icon={isGenerating ? <Loader2 size={14} className="animate-spin" /> : undefined}
                            >
                              {isGenerating ? 'Regenerating...' : 'Regenerate Story'}
                            </Button>
                          )}
                        </div>

                        {/* Error message */}
                        {generationError && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm">{generationError}</p>
                          </div>
                        )}

                        {/* Preview end notice */}
                        <div className="mt-8 p-6 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg border border-neutral-200">
                          <h3 className="font-serif text-xl font-semibold text-center mb-2">
                            This is just the beginning...
                          </h3>
                          <p className="text-neutral-600 text-center text-sm">
                            The complete storybook includes all chapters, photos, and memories beautifully arranged.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Subtle page curl effect */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-neutral-200 to-transparent opacity-30 rounded-tl-full transform rotate-180"></div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              {/* Locked chapters grid */}
              <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
                <h2 className="font-serif text-2xl font-bold text-center mb-6">
                  Unlock the Complete Story
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {lockedChapters.map((chapter) => (
                    <div key={chapter.id} className="relative bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                      <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center">
                        <Lock size={20} className="text-neutral-400" />
                      </div>
                      <h3 className="font-medium text-sm mb-1 text-neutral-600">Chapter {chapter.id}</h3>
                      <p className="text-xs text-neutral-500">{chapter.title}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    to="/upgrade"
                    className="w-full md:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Unlock the Full Storybook – $29
                  </Button>
                  <p className="text-xs text-neutral-500">
                    30-day happiness guarantee • One-click gift option
                  </p>
                  
                  <div className="flex justify-center gap-4 pt-2 opacity-60">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Klarna_logo.svg" alt="Klarna" className="h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium mb-4">
                  124 families saved 8,700 memories last month.
                </p>

                {/* Testimonials */}
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">"{testimonial.text}"</p>
                        <p className="text-xs font-medium text-neutral-800">— {testimonial.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feature badges */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Shield size={12} className="text-green-500" />
                      <span>Private</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download size={12} className="text-blue-500" />
                      <span>Printable</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 size={12} className="text-purple-500" />
                      <span>Share Anytime</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={12} className="text-orange-500" />
                      <span>AI-Enhanced</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                to="/story-input"
                icon={<Edit size={16} />}
                className="w-full"
              >
                Edit Questions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA Banner */}
      {showCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-600 text-white p-4 shadow-lg z-50 transform transition-transform duration-300">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium">Unlock the Full Storybook</p>
              <p className="text-sm text-indigo-200">All chapters, photos, and audio for just $29</p>
            </div>
            <Button
              variant="secondary"
              to="/upgrade"
              className="bg-white text-indigo-600 hover:bg-neutral-100"
            >
              Unlock Now
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
        .font-handwriting {
          font-family: 'Kalam', cursive;
        }
      `}</style>
    </PageTransition>
  );
};

export default PreviewSummaryPage;