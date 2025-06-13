import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Star, Users, Shield, Download, Share2, Lock, ChevronRight, Edit } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [blurredSentences, setBlurredSentences] = useState<number[]>([]);
  const [revealedSentence, setRevealedSentence] = useState<number | null>(null);

  useEffect(() => {
    // Get profile data and story responses from localStorage
    const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
    const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
    setProfileData(profile);

    // Generate story content based on responses
    const content = generateStoryContent(profile, responses);
    setStoryContent(content);

    // Set up blurred sentences (sentences 3 and 5)
    setBlurredSentences([2, 4]);

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

  const generateStoryContent = (profile: any, responses: any) => {
    const name = profile?.name || 'our loved one';
    const birthYear = profile?.birthYear ? ` born in ${profile.birthYear}` : '';
    
    return `${name}${birthYear} has lived a life rich with experiences and memories that deserve to be preserved. Growing up in a time when the world was different, their childhood was filled with moments that shaped who they would become. One of their proudest achievements stands as a testament to their character and determination. Life wasn't always easy, but they faced challenges with remarkable resilience. Family traditions have always held a special place in their heart. To future generations, they wish to pass on this wisdom that has guided them through life's journey.`;
  };

  const handleRevealSentence = (index: number) => {
    setRevealedSentence(index);
    setTimeout(() => setRevealedSentence(null), 5000);
  };

  const sentences = storyContent.split('. ').filter(s => s.length > 0);

  return (
    <PageTransition>
      {/* Wood grain background */}
      <div className="min-h-screen" style={{
        background: 'linear-gradient(45deg, #8B4513 0%, #A0522D 25%, #8B4513 50%, #A0522D 75%, #8B4513 100%)',
        backgroundSize: '20px 20px'
      }}>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <ProgressIndicator steps={steps} currentStep={5} />

          {/* Hero Book Frame */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative">
              {/* Book shadow */}
              <div className="absolute inset-0 bg-black/20 rounded-lg transform translate-x-2 translate-y-2 blur-sm"></div>
              
              {/* Main book */}
              <div className="relative bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden shadow-2xl border border-neutral-300"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f5f5f5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                   }}>
                
                {/* Chapter ribbon */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-2 rounded-bl-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-medium text-sm">Chapter 1 • Life & Legacy</span>
                  </div>
                </div>

                {/* Page content */}
                <div className="p-8 md:p-12">
                  {/* Opening pull quote */}
                  <div className="relative mb-8 text-center">
                    <svg className="absolute inset-0 w-full h-full text-neutral-200 -z-10" viewBox="0 0 100 100">
                      <text x="50" y="50" fontSize="60" textAnchor="middle" dominantBaseline="middle" fill="currentColor" opacity="0.1">"</text>
                    </svg>
                    <blockquote className="text-2xl font-serif italic text-neutral-700 relative z-10">
                      "I still remember the smell of mom's fresh bread..."
                    </blockquote>
                    
                    {/* Audio play button */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="mt-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, #8B5CF6, #7C3AED)',
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 12px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                    </button>
                  </div>

                  {/* Story content */}
                  <div className="prose max-w-none">
                    <h1 className="font-serif text-3xl font-bold text-neutral-800 mb-6">
                      {profileData?.name || "Their"} Life Story
                    </h1>
                    
                    {/* Polaroid photo */}
                    {profileData?.images?.[0] && (
                      <div className="float-right ml-6 mb-4 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                        <div className="bg-white p-3 shadow-lg" style={{ width: '200px' }}>
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

                    <div className="text-neutral-700 leading-relaxed space-y-4">
                      {sentences.map((sentence, index) => {
                        const isBlurred = blurredSentences.includes(index);
                        const isRevealed = revealedSentence === index;
                        
                        return (
                          <p key={index} className="text-base">
                            {index === 2 && (
                              <span className="inline-block bg-amber-100 px-2 py-1 rounded text-sm font-medium text-amber-800 mr-2">
                                1945
                              </span>
                            )}
                            <span
                              className={`transition-all duration-300 ${
                                isBlurred && !isRevealed 
                                  ? 'filter blur-sm cursor-pointer hover:blur-none' 
                                  : ''
                              }`}
                              onClick={() => isBlurred && handleRevealSentence(index)}
                              title={isBlurred ? "Tap to reveal" : ""}
                            >
                              {sentence}.
                            </span>
                          </p>
                        );
                      })}
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-8 flex justify-end">
                      <div className="bg-neutral-100 px-3 py-1 rounded-full text-sm text-neutral-600">
                        Preview 1 of 10 pages • 10%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Page curl effect */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-neutral-300 to-transparent opacity-50 rounded-tl-full transform rotate-180"></div>
              </div>
            </div>
          </div>

          {/* Social Proof Sidebar */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              {/* Conversion Footer */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h2 className="font-serif text-2xl font-bold text-center mb-2">
                  This is just the beginning
                  <span className="inline-block animate-pulse">...</span>
                </h2>
                <p className="text-neutral-600 text-center mb-8">
                  The complete storybook includes all chapters, photos, and audio recordings beautifully arranged.
                </p>

                {/* Locked chapters grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {lockedChapters.map((chapter) => (
                    <div key={chapter.id} className="relative bg-neutral-100 rounded-lg p-4 opacity-75">
                      <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                        <Lock size={24} className="text-neutral-500" />
                      </div>
                      <h3 className="font-medium text-sm mb-1">Chapter {chapter.id}</h3>
                      <p className="text-xs text-neutral-600">{chapter.title}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    to="/upgrade"
                    className="w-full md:w-auto px-8 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Unlock the Full Storybook – $29
                  </Button>
                  <p className="text-xs text-neutral-500">
                    30-day happiness guarantee • One-click gift option
                  </p>
                  
                  <div className="flex justify-center gap-4 pt-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Klarna_logo.svg" alt="Klarna" className="h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm font-medium mb-4">
                  124 families saved 8,700 memories last month.
                </p>

                {/* Testimonial carousel */}
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
                      <span>AI-Indexed</span>
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
        <div className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white p-4 shadow-lg z-50 transform transition-transform duration-300">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium">Unlock the Full Storybook</p>
              <p className="text-sm text-purple-200">All chapters, photos, and audio for just $29</p>
            </div>
            <Button
              variant="secondary"
              to="/upgrade"
              className="bg-white text-purple-600 hover:bg-neutral-100"
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