import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Bookmark, Book, Printer, ArrowRight, Loader2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { generatePDF, type StoryData } from '../lib/pdfGenerator';

const StorybookDisplayPage: React.FC = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Get actual user data from localStorage
    const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
    const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
    setProfileData(profile);
  }, []);

  const chapters = [
    { 
      id: 1, 
      title: 'Childhood Memories', 
      preview: `${profileData?.name || 'They'} grew up in a time when life moved at a different pace, filled with simple joys and lasting memories...` 
    },
    { 
      id: 2, 
      title: 'Coming of Age', 
      preview: `During the formative years, ${profileData?.name || 'they'} discovered passions and developed the character that would define their journey...` 
    },
    { 
      id: 3, 
      title: 'Love and Family', 
      preview: `The story of love, partnership, and the beautiful family that ${profileData?.name || 'they'} built together...` 
    },
    { 
      id: 4, 
      title: 'Life\'s Work', 
      preview: `Through dedication and perseverance, ${profileData?.name || 'they'} found purpose and made meaningful contributions...` 
    },
    { 
      id: 5, 
      title: 'Wisdom & Legacy', 
      preview: `The lessons learned, wisdom gained, and the lasting legacy that ${profileData?.name || 'they'} leave behind...` 
    },
  ];

  const viewFullStorybook = () => {
    const storyId = profileData?.name ? 
      profileData.name.toLowerCase().replace(/\s+/g, '-') : 
      'life-story';
    navigate(`/digital-story/${storyId}`);
  };

  const handleDownloadPDF = async () => {
    if (!profileData) return;
    
    try {
      setIsGeneratingPDF(true);
      
      // Create sample story data for PDF generation
      const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
      const sampleStoryData: StoryData = {
        profile: {
          name: profileData.name || 'Life Story',
          birthYear: profileData.birthYear,
          location: profileData.location || 'Unknown',
          description: profileData.description || 'A life story worth preserving',
          coverImage: profileData.images?.[0]
        },
        chapters: chapters.map(chapter => ({
          id: chapter.id,
          title: chapter.title,
          description: chapter.preview,
          content: `This chapter contains the beautiful stories and memories about ${chapter.title.toLowerCase()}. ${chapter.preview}\n\nThe full content would include detailed narratives, personal anecdotes, and meaningful moments that shaped this person's life during this period.`,
          images: profileData.images ? [{
            url: profileData.images[0],
            caption: `${profileData.name} - ${chapter.title}`
          }] : []
        })),
        metadata: {
          wordCount: 2500,
          totalPages: 25,
          readingTime: '12-15 minutes',
          createdDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          dedicatedTo: `For the family of ${profileData.name} - may these stories live on forever`
        }
      };
      
      await generatePDF(sampleStoryData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              {profileData?.name || 'Life'} Story
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                icon={isGeneratingPDF ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </Button>
              
              <Button
                variant="outline"
                icon={<Share2 size={18} />}
                onClick={() => setShowShareModal(true)}
              >
                Share
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-1">
              <img
                src={profileData?.images?.[0] || "https://images.pexels.com/photos/7116213/pexels-photo-7116213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={profileData?.name || "Profile"}
                className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
              />
              
              <Card className="mb-4">
                <div className="p-4">
                  <h3 className="font-medium mb-2">About {profileData?.name || 'This Person'}</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    {profileData?.birthYear && `Born ${profileData.birthYear}`}
                    {profileData?.location && ` • ${profileData.location}`}
                    <br />
                    {profileData?.description || 'A life story worth preserving'}
                  </p>
                </div>
              </Card>
              
              <Card>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Table of Contents</h3>
                  <ul className="space-y-2">
                    {chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <button 
                          onClick={viewFullStorybook}
                          className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center w-full text-left"
                        >
                          <Book size={14} className="mr-2" />
                          Chapter {chapter.id}: {chapter.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="mb-8">
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-6 text-center">
                    Story Preview
                  </h2>
                  
                  {chapters.slice(0, 3).map((chapter) => (
                    <div key={chapter.id} className="mb-6 pb-6 border-b border-neutral-200 last:border-b-0">
                      <h3 className="font-serif text-xl font-semibold mb-3">
                        Chapter {chapter.id}: {chapter.title}
                      </h3>
                      <p className="text-neutral-700 leading-relaxed mb-3">
                        {chapter.preview}
                      </p>
                      <Button
                        variant="text"
                        size="sm"
                        onClick={viewFullStorybook}
                        icon={<ArrowRight size={14} />}
                        className="text-indigo-600"
                      >
                        Read Full Chapter
                      </Button>
                    </div>
                  ))}
                  
                  <div className="text-center mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={viewFullStorybook}
                      icon={<Book size={18} />}
                    >
                      Read Complete Story
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <Bookmark size={18} className="mr-2" />
                  Want a physical copy?
                </h3>
                <p className="text-amber-700 mb-4">
                  Order a premium hardcover printed book with all stories and photos.
                </p>
                <Button
                  variant="outline"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100"
                  icon={<Printer size={16} />}
                >
                  Order Printed Book – $49
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="font-medium text-lg mb-4">Share {profileData?.name || 'This'} Story</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Private Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={`https://lifestory.app/s/${(profileData?.name || 'story').toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`}
                  readOnly
                  className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-r-md">
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
              />
              <Button className="w-full">Send Story</Button>
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
    </PageTransition>
  );
};

export default StorybookDisplayPage;