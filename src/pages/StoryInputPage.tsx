import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, PencilLine } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Tell Story' },
  { id: 4, label: 'Preview' },
];

const prompts = [
  { id: 'childhood', question: 'What was their childhood like?' },
  { id: 'achievement', question: 'What is their proudest achievement?' },
  { id: 'challenge', question: 'What is a challenge they overcame?' },
  { id: 'traditions', question: 'What are some traditions they value?' },
  { id: 'wisdom', question: 'What wisdom would they like to pass on?' },
];

const StoryInputPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('text');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [email, setEmail] = useState('');
  const [isInvitationSent, setIsInvitationSent] = useState(false);

  useEffect(() => {
    const savedResponses = localStorage.getItem('storyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResponses = {
      ...responses,
      [prompts[currentPromptIndex].id]: e.target.value
    };
    setResponses(newResponses);
    localStorage.setItem('storyResponses', JSON.stringify(newResponses));
  };

  const handleNextPrompt = () => {
    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    }
  };

  const handlePrevPrompt = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('storyResponses', JSON.stringify(responses));
    navigate('/preview');
  };

  const handleSendInvitation = () => {
    // Simulate sending invitation
    setIsInvitationSent(true);
    setTimeout(() => {
      setIsInvitationSent(false);
    }, 3000);
  };

  const currentPrompt = prompts[currentPromptIndex];
  const currentResponse = responses[currentPrompt.id] || '';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-xl text-center">{currentPrompt.question}</p>
            </div>
            
            <textarea
              value={currentResponse}
              onChange={handleTextChange}
              className="w-full p-4 border border-neutral-300 rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type your answer here..."
            />
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevPrompt}
                disabled={currentPromptIndex === 0}
              >
                Previous Question
              </Button>
              
              {currentPromptIndex < prompts.length - 1 ? (
                <Button onClick={handleNextPrompt}>
                  Next Question
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Generate Life Story
                </Button>
              )}
            </div>
            
            <div className="flex justify-center gap-2 pt-4">
              {prompts.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentPromptIndex
                      ? 'bg-indigo-600'
                      : responses[prompts[index].id]
                      ? 'bg-indigo-300'
                      : 'bg-neutral-300'
                  }`}
                  onClick={() => setCurrentPromptIndex(index)}
                />
              ))}
            </div>
          </div>
        );
        
      case 'invite':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg mb-4 text-center">
              <h3 className="font-medium text-xl mb-2">
                Invite your loved one to tell their own story
              </h3>
              <p className="text-neutral-600">
                We'll send them a link with prompts they can answer directly.
              </p>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-6">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                placeholder="grandma@example.com"
                required
              />
              
              <h4 className="font-medium mb-2 text-sm text-neutral-700">Preview of Questions:</h4>
              <ul className="space-y-2 mb-4">
                {prompts.map((prompt, index) => (
                  <li key={index} className="text-sm text-neutral-600 flex items-start">
                    <span className="mr-2 mt-0.5">•</span>
                    <span>{prompt.question}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                disabled={!email || !/\S+@\S+\.\S+/.test(email)}
                onClick={handleSendInvitation}
              >
                {isInvitationSent ? 'Invitation Sent!' : 'Send Invitation'}
              </Button>
              
              {isInvitationSent && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700 text-sm text-center">
                    ✓ Invitation sent to {email}! They'll receive an email with a link to answer the questions.
                  </p>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Button variant="outline" onClick={handleSubmit}>
                Skip & Generate Story from My Input
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <ProgressIndicator steps={steps} currentStep={3} />

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            Tell us their story
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Choose how you'd like to capture this story.
          </p>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === 'text'
                    ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
                onClick={() => setActiveTab('text')}
              >
                <div className="flex justify-center items-center">
                  <PencilLine size={18} className="mr-2" />
                  Answer Prompts
                </div>
              </button>
              
              <button
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === 'invite'
                    ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
                onClick={() => setActiveTab('invite')}
              >
                <div className="flex justify-center items-center">
                  <Mail size={18} className="mr-2" />
                  Send Link
                </div>
              </button>
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StoryInputPage;