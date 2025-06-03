import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Edit } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Tell Story' },
  { id: 4, label: 'Preview' },
];

const PreviewSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [storyContent, setStoryContent] = useState('');
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    // Get profile data and story responses from localStorage
    const profile = JSON.parse(localStorage.getItem('profileData') || '{}');
    const responses = JSON.parse(localStorage.getItem('storyResponses') || '{}');
    setProfileData(profile);

    // Generate story content based on responses
    const content = generateStoryContent(profile, responses);
    setStoryContent(content);
  }, []);

  const generateStoryContent = (profile: any, responses: any) => {
    // This is where we would normally call an AI service
    // For now, we'll create a more engaging narrative from the responses
    const name = profile?.name || 'our loved one';
    const birthYear = profile?.birthYear ? ` born in ${profile.birthYear}` : '';
    
    return `${name}${birthYear} has lived a life rich with experiences and memories that deserve to be preserved. Growing up in a time when the world was different, their childhood was filled with moments that shaped who they would become.

${responses?.childhood || ''} 

One of their proudest achievements stands as a testament to their character and determination. ${responses?.achievement || ''} 

Life wasn't always easy, but they faced challenges with remarkable resilience. ${responses?.challenge || ''} 

Family traditions have always held a special place in their heart. ${responses?.traditions || ''} 

To future generations, they wish to pass on this wisdom: ${responses?.wisdom || ''} 

These stories and memories are more than just tales from the past - they are the threads that weave together our family's tapestry, connecting generations through shared experiences and values.`;
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <ProgressIndicator steps={steps} currentStep={4} />

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            We've created the first chapter of {profileData?.name || "their"} story
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            This is a preview of what your complete life story will look like.
          </p>

          <Card className="mb-8 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="font-serif text-2xl font-semibold mb-2">
                Chapter 1: Life & Legacy
              </h2>
              {profileData?.images?.[0] && (
                <div className="flex items-center gap-4">
                  <img
                    src={profileData.images[0]}
                    alt={profileData?.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            
            <div className="p-6 bg-white">
              <div className="prose max-w-none">
                {storyContent.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-700 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="border-t border-neutral-200 mt-6 pt-6 text-center">
                <p className="text-neutral-500 mb-2">This is just the beginning...</p>
                <p className="text-sm text-neutral-500">
                  The full storybook includes more chapters with all your stories and photos beautifully arranged.
                </p>
              </div>
            </div>
          </Card>
          
          <div className="text-center space-y-4">
            <Button
              variant="secondary"
              size="lg"
              to="/upgrade"
              className="w-full md:w-auto px-8"
            >
              Get the Full Digital Storybook – $29
            </Button>
            
            <Button
              variant="outline"
              to="/story-input"
              icon={<Edit size={16} />}
              className="w-full md:w-auto"
            >
              Edit answers or upload more memories
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PreviewSummaryPage;