import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, PencilLine, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';
import type { Question } from '../data/questions';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Select Questions' },
  { id: 4, label: 'Tell Story' },
  { id: 5, label: 'Preview' },
];

const StoryInputPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('text');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [email, setEmail] = useState('');
  const [isInvitationSent, setIsInvitationSent] = useState(false);
  const [isSendingInvitation, setIsSendingInvitation] = useState(false);
  const [invitationError, setInvitationError] = useState('');

  useEffect(() => {
    // Load selected questions
    const savedQuestions = localStorage.getItem('selectedQuestions');
    if (savedQuestions) {
      setSelectedQuestions(JSON.parse(savedQuestions));
    } else {
      // If no questions selected, redirect back to question selection
      navigate('/question-selection');
      return;
    }

    // Load saved responses
    const savedResponses = localStorage.getItem('storyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, [navigate]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedQuestions.length === 0) return;
    
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const newResponses = {
      ...responses,
      [currentQuestion.id]: e.target.value
    };
    setResponses(newResponses);
    localStorage.setItem('storyResponses', JSON.stringify(newResponses));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('storyResponses', JSON.stringify(responses));
    navigate('/preview');
  };

  const handleSendInvitation = async () => {
    setIsSendingInvitation(true);
    setInvitationError('');

    try {
      const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
      
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-invitation`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          profileName: profileData.name || 'your loved one',
          senderName: 'A family member',
          questions: selectedQuestions
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to send invitation');
      }

      const result = await response.json();
      setIsInvitationSent(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsInvitationSent(false);
        setEmail('');
      }, 5000);

    } catch (error) {
      console.error('Error sending invitation:', error);
      setInvitationError(error instanceof Error ? error.message : 'Failed to send invitation');
    } finally {
      setIsSendingInvitation(false);
    }
  };

  if (selectedQuestions.length === 0) {
    return null; // Will redirect in useEffect
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const currentResponse = responses[currentQuestion.id] || '';
  const answeredCount = selectedQuestions.filter(q => responses[q.id]?.trim()).length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-indigo-600 font-medium">
                  Question {currentQuestionIndex + 1} of {selectedQuestions.length}
                </span>
                <span className="text-sm text-indigo-600">
                  {answeredCount} answered
                </span>
              </div>
              <p className="font-medium text-xl text-center">{currentQuestion.text}</p>
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
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                icon={<ArrowLeft size={16} />}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < selectedQuestions.length - 1 ? (
                <Button 
                  onClick={handleNextQuestion}
                  icon={<ArrowRight size={16} />}
                >
                  Next Question
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Generate Life Story
                </Button>
              )}
            </div>
            
            {/* Question navigation dots */}
            <div className="flex justify-center gap-2 pt-4 flex-wrap">
              {selectedQuestions.map((question, index) => (
                <button
                  key={question.id}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-indigo-600'
                      : responses[question.id]?.trim()
                      ? 'bg-indigo-300'
                      : 'bg-neutral-300'
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                  title={`Question ${index + 1}: ${question.text.substring(0, 50)}...`}
                />
              ))}
            </div>
            
            {/* Progress summary */}
            <div className="text-center text-sm text-neutral-600">
              <p>
                {answeredCount} of {selectedQuestions.length} questions answered
                {answeredCount > 0 && (
                  <span className="ml-2 text-indigo-600">
                    ({Math.round((answeredCount / selectedQuestions.length) * 100)}% complete)
                  </span>
                )}
              </p>
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
                We'll send them a personalized email with the {selectedQuestions.length} questions you've selected.
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
                disabled={isSendingInvitation}
              />
              
              <h4 className="font-medium mb-2 text-sm text-neutral-700">
                Selected Questions ({selectedQuestions.length}):
              </h4>
              <div className="max-h-40 overflow-y-auto mb-4 space-y-1">
                {selectedQuestions.map((question, index) => (
                  <div key={question.id} className="text-sm text-neutral-600 flex items-start">
                    <span className="mr-2 mt-0.5 text-indigo-500 font-medium">{index + 1}.</span>
                    <span>{question.text}</span>
                  </div>
                ))}
              </div>
              
              <Button
                className="w-full"
                disabled={!email || !/\S+@\S+\.\S+/.test(email) || isSendingInvitation}
                onClick={handleSendInvitation}
                icon={isSendingInvitation ? <Loader2 size={16} className="animate-spin" /> : undefined}
              >
                {isSendingInvitation ? 'Sending...' : isInvitationSent ? 'Invitation Sent!' : 'Send Invitation'}
              </Button>
              
              {isInvitationSent && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700 text-sm text-center">
                    ✓ Invitation sent to {email}! They'll receive an email with a personalized link to answer the {selectedQuestions.length} questions you selected.
                  </p>
                </div>
              )}

              {invitationError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm text-center">
                    ✗ {invitationError}
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
        <ProgressIndicator steps={steps} currentStep={4} />

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold">
              Tell us their story
            </h1>
            <Button
              variant="outline"
              size="sm"
              to="/question-selection"
              icon={<ArrowLeft size={16} />}
            >
              Edit Questions
            </Button>
          </div>
          
          <p className="text-neutral-600 text-center mb-8">
            Answer the {selectedQuestions.length} questions you've selected, or invite them to answer directly.
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
                  Answer Questions
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
                  Send Invitation
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