import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, Bookmark, Book, Printer, Heart, Star, ChevronLeft, ChevronRight, Home, Loader2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { generateFullStorybook } from '../lib/openai';
import { generatePDF, type StoryData } from '../lib/pdfGenerator';

const DigitalStorybookPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [storybook, setStorybook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const generateStorybook = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Get user data from localStorage
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
        const relationshipData = JSON.parse(localStorage.getItem('relationshipData') || '{}');
        const selectedQuestions = JSON.parse(localStorage.getItem('selectedQuestions') || '[]');

        console.log('Profile Data:', profileData); // Debug log
        console.log('Responses:', responses); // Debug log

        if (!profileData.name || Object.keys(responses).length === 0) {
          throw new Error('No story data found. Please complete the story creation process first.');
        }

        // Generate the full storybook using OpenAI
        const generatedStorybook = await generateFullStorybook(responses, profileData, {
          relationship: relationshipData.relationship,
          selectedQuestions: selectedQuestions
        });

        // Structure the storybook data using ACTUAL user data
        const storybookData = {
          profile: {
            name: profileData.name, // Use actual user's name
            birthYear: profileData.birthYear,
            location: profileData.location || 'Unknown',
            description: profileData.description || `${profileData.name}'s life story - a legacy worth preserving`,
            coverImage: profileData.images?.[0] || 'https://images.pexels.com/photos/7116213/pexels-photo-7116213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          },
          chapters: generatedStorybook.chapters.map((chapter: any, index: number) => ({
            ...chapter,
            images: profileData.images ? profileData.images.slice(index, index + 1).map((url: string, imgIndex: number) => ({
              url,
              caption: `${profileData.name} - ${chapter.title}`
            })) : []
          })),
          metadata: {
            ...generatedStorybook.metadata,
            totalPages: generatedStorybook.chapters.length * 8, // Estimate 8 pages per chapter
            readingTime: `${Math.ceil(generatedStorybook.metadata.wordCount / 200)}-${Math.ceil(generatedStorybook.metadata.wordCount / 150)} minutes`,
            createdDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            dedicatedTo: `For the family of ${profileData.name} - may these stories live on forever`
          }
        };

        console.log('Final Storybook Data:', storybookData); // Debug log
        setStorybook(storybookData);
      } catch (error) {
        console.error('Error generating storybook:', error);
        setError(error instanceof Error ? error.message : 'Failed to generate storybook');
      } finally {
        setIsLoading(false);
      }
    };

    generateStorybook();
  }, [id]);

  useEffect(() => {
    // Simulate reading progress
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadPDF = async () => {
    if (!storybook) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Convert storybook data to the format expected by PDF generator
      const pdfData: StoryData = {
        profile: storybook.profile,
        chapters: storybook.chapters,
        metadata: storybook.metadata
      };
      
      await generatePDF(pdfData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 size={48} className="animate-spin text-amber-600 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-neutral-800 mb-2">
              Creating Your Digital Storybook
            </h2>
            <p className="text-neutral-600">
              Weaving together memories into a beautiful narrative...
            </p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error || !storybook) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book size={32} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-neutral-800 mb-2">
              Story Not Found
            </h2>
            <p className="text-neutral-600 mb-6">
              {error || 'We couldn\'t find the story data. Please complete the story creation process first.'}
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/choose-relationship')}
            >
              Create a New Story
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentChapterData = storybook.chapters.find((ch: any) => ch.id === currentChapter);

  const nextChapter = () => {
    if (currentChapter < storybook.chapters.length) {
      setCurrentChapter(currentChapter + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div 
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <header className="sticky top-1 z-40 bg-white/90 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
                  icon={<Home size={16} />}
                >
                  Home
                </Button>
                <div>
                  <h1 className="font-serif text-xl font-bold text-neutral-800">
                    {storybook.profile.name}'s Life Story
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Chapter {currentChapter} of {storybook.chapters.length} • {currentChapterData?.title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={isGeneratingPDF ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                >
                  {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Share2 size={16} />}
                  onClick={() => setShowShareModal(true)}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Profile Card */}
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={storybook.profile.coverImage}
                        alt={storybook.profile.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="font-serif text-lg font-bold">{storybook.profile.name}</h2>
                        <p className="text-sm opacity-90">
                          {storybook.profile.birthYear && `${storybook.profile.birthYear} • `}
                          {storybook.profile.location}
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-neutral-600">{storybook.profile.description}</p>
                    </div>
                  </Card>
                  
                  {/* Table of Contents */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Book size={16} className="mr-2" />
                        Table of Contents
                      </h3>
                      <ul className="space-y-2">
                        {storybook.chapters.map((chapter: any) => (
                          <li key={chapter.id}>
                            <button
                              onClick={() => setCurrentChapter(chapter.id)}
                              className={`text-left w-full p-2 rounded text-sm transition-colors ${
                                chapter.id === currentChapter
                                  ? 'bg-amber-100 text-amber-800 font-medium'
                                  : 'text-neutral-600 hover:bg-neutral-50'
                              }`}
                            >
                              <div className="font-medium">{chapter.title}</div>
                              {chapter.description && (
                                <div className="text-xs opacity-75">{chapter.description}</div>
                              )}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>

                  {/* Story Stats */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Story Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Total Pages:</span>
                          <span className="font-medium">{storybook.metadata.totalPages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Word Count:</span>
                          <span className="font-medium">{storybook.metadata.wordCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Reading Time:</span>
                          <span className="font-medium">{storybook.metadata.readingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Created:</span>
                          <span className="font-medium">{storybook.metadata.createdDate}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="mb-8" id="storybook-content">
                  <div className="p-8 md:p-12">
                    
                    {/* Chapter Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        Chapter {currentChapter}
                      </div>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                        {currentChapterData?.title}
                      </h1>
                      {currentChapterData?.description && (
                        <p className="text-lg text-neutral-600">{currentChapterData.description}</p>
                      )}
                    </div>

                    {/* Chapter Content */}
                    <div className="prose prose-lg max-w-none">
                      {currentChapterData?.content.split('\n\n').map((paragraph: string, index: number) => (
                        <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Chapter Images - User's uploaded images */}
                    {currentChapterData?.images && currentChapterData.images.length > 0 && (
                      <div className="my-8 space-y-6">
                        {currentChapterData.images.map((image: any, index: number) => (
                          <div key={index} className="text-center">
                            <div className="inline-block transform rotate-1 hover:rotate-0 transition-transform duration-300">
                              <div className="bg-white p-4 shadow-lg border border-neutral-200 max-w-md">
                                <img
                                  src={image.url}
                                  alt={image.caption}
                                  className="w-full h-64 object-cover mb-3"
                                />
                                <p className="text-sm text-neutral-600 font-handwriting">
                                  {image.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Chapter Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-neutral-200">
                      <Button
                        variant="outline"
                        onClick={prevChapter}
                        disabled={currentChapter === 1}
                        icon={<ChevronLeft size={16} />}
                      >
                        Previous Chapter
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-neutral-600">
                          Chapter {currentChapter} of {storybook.chapters.length}
                        </p>
                      </div>
                      
                      <Button
                        variant="primary"
                        onClick={nextChapter}
                        disabled={currentChapter === storybook.chapters.length}
                        icon={<ChevronRight size={16} />}
                      >
                        Next Chapter
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* End of Story */}
                {currentChapter === storybook.chapters.length && (
                  <Card className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                    <div className="max-w-2xl mx-auto">
                      <Heart size={32} className="text-amber-600 mx-auto mb-4" />
                      <h2 className="font-serif text-2xl font-bold text-neutral-800 mb-4">
                        The End of This Beautiful Story
                      </h2>
                      <p className="text-neutral-700 mb-6 leading-relaxed italic">
                        "{storybook.metadata.dedicatedTo}"
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          variant="primary"
                          icon={isGeneratingPDF ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                          onClick={handleDownloadPDF}
                          disabled={isGeneratingPDF}
                        >
                          {isGeneratingPDF ? 'Generating PDF...' : 'Download Complete Story'}
                        </Button>
                        <Button
                          variant="outline"
                          icon={<Printer size={16} />}
                        >
                          Order Printed Book
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Family Testimonial */}
                <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                        alt="Family member"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-neutral-700 mb-2">
                          "This digital storybook captured {storybook.profile.name}'s voice so perfectly. It's like having them right here telling us these stories. This will be treasured by our family for generations."
                        </blockquote>
                        <cite className="text-sm text-neutral-600 font-medium">
                          — A loving family member
                        </cite>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="font-medium text-lg mb-4">Share {storybook.profile.name}'s Story</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Private Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={`https://lifestory.app/s/${storybook.profile.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`}
                  readOnly
                  className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-600 text-white px-3 py-2 rounded-r-md hover:bg-amber-700">
                  Copy
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Only people with this link can view the story.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Send via Email
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
              />
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Send Story</Button>
            </div>
            
            <div className="flex justify-end">
              <button
                className="text-neutral-600 hover:text-neutral-800"
                onClick={() => setShowShareModal(false)}
              >
                Close
              </button>
            </div>
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

export default DigitalStorybookPage;