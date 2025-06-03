import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { PageTransition } from '@/components/ui/PageTransition';

function StoryInputPage() {
  const navigate = useNavigate();
  const [storyText, setStoryText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the story submission logic here
    navigate('/preview-summary');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="story">Share your story</Label>
              <textarea
                id="story"
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows={10}
                placeholder="Start typing your story here..."
              />
            </div>
            <Button type="submit">Continue</Button>
          </form>
        </Card>
      </div>
    </PageTransition>
  );
}

export default StoryInputPage;