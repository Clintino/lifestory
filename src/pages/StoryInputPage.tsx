import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, User, Mail, PencilLine, Loader2 } from 'lucide-react';
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
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [email, setEmail] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const savedResponses = localStorage.getItem('storyResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsTranscribing(true);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/transcribe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await response.json();
      
      const newResponses = {
        ...responses,
        [prompts[currentPromptIndex].id]: text,
      };
      setResponses(newResponses);
      localStorage.setItem('storyResponses', JSON.stringify(newResponses));
    } catch (error) {
      console.error('Transcription error:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

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

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('storyResponses', JSON.stringify(responses));
    navigate('/preview');
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
        
      case 'audio':
        return (
          <div className="space-y-6 text-center">
            <div className="bg-indigo-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-xl">{currentPrompt.question}</p>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-lg p-8 flex flex-col items-center">
              <button
                onClick={toggleRecording}
                disabled={isTranscribing}
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  isRecording
                    ? 'bg-red-100 text-red-500 animate-pulse'
                    : isTranscribing
                    ? 'bg-neutral-100 text-neutral-500'
                    : 'bg-indigo-100 text-indigo-600'
                }`}
              >
                {isTranscribing ? (
                  <Loader2 size={32} className="animate-spin" />
                ) : isRecording ? (
                  <MicOff size={32} />
                ) : (
                  <Mic size={32} />
                )}
              </button>
              
              <p className="font-medium">
                {isTranscribing
                  ? 'Transcribing...'
                  : isRecording
                  ? 'Recording... Click to stop'
                  : 'Click to start recording'}
              </p>
              
              <p className="text-sm text-neutral-500 mt-2">
                {isTranscribing
                  ? 'Please wait while we process your recording'
                  : isRecording
                  ? 'Speak clearly and take your time'
                  : 'You can re-record as many times as needed'}
              </p>

              {currentResponse && (
                <div className="mt-8 w-full">
                  <p className="text-left font-medium mb-2">Transcription:</p>
                  <textarea
                    value={currentResponse}
                    onChange={handleTextChange}
                    className="w-full p-4 border border-neutral-300 rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your transcribed text will appear here..."
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevPrompt}
                disabled={currentPromptIndex === 0 || isRecording || isTranscribing}
              >
                Previous Question
              </Button>
              
              {currentPromptIndex < prompts.length - 1 ? (
                <Button 
                  onClick={handleNextPrompt}
                  disabled={isRecording || isTranscribing}
                >
                  Next Question
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isRecording || isTranscribing}
                >
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
              >
                Send Invitation
              </Button>
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
                  activeTab === 'audio'
                    ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
                onClick={() => setActiveTab('audio')}
              >
                <div className="flex justify-center items-center">
                  <Mic size={18} className="mr-2" />
                  Record Audio
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