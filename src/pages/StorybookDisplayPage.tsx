import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Bookmark, Book, Printer, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const chapters = [
  { id: 1, title: 'Childhood Memories', preview: 'Margaret grew up in a small town in rural Minnesota in the 1950s, where life moved at a slower pace...' },
  { id: 2, title: 'Coming of Age', preview: 'In her teenage years, Margaret developed a passion for literature and music...' },
  { id: 3, title: 'Love and Family', preview: 'Margaret met John at a community dance in the summer of 1968...' },
  { id: 4, title: 'Life\'s Work', preview: 'After raising her children, Margaret discovered new passions and purposes...' },
  { id: 5, title: 'Wisdom & Legacy', preview: 'At seventy-eight, Margaret reflects on a life well-lived...' },
];

const StorybookDisplayPage: React.FC = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  const viewFullStorybook = () => {
    navigate('/digital-story/margaret-johnson');
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              Margaret's Life Story
            </h1>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                icon={<Download size={18} />}
                onClick={() => {}}
              >
                Download PDF
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
                src="https://images.pexels.com/photos/7116213/pexels-photo-7116213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Margaret"
                className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
              />
              
              <Card className="mb-4">
                <div className="p-4">
                  <h3 className="font-medium mb-2">About Margaret</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Born 1945 • Minnesota
                    <br />
                    Beloved grandmother of 3
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
            <h3 className="font-medium text-lg mb-4">Share Margaret's Story</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Private Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value="https://lifestory.app/s/margaret-johnson-184fb2"
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