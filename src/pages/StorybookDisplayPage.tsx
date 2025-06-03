import React, { useState } from 'react';
import { Download, Share2, Bookmark, Play, Pause, Book, Printer } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const chapters = [
  { id: 1, title: 'Childhood Memories', content: 'Margaret grew up in a small town in rural Minnesota in the 1950s, where life moved at a slower pace. The daughter of a schoolteacher and a carpenter, she learned the value of education and craftsmanship from an early age. Summers were spent at the lake with her three siblings, catching fireflies and learning to swim in the cool, clear water...' },
  { id: 2, title: 'Coming of Age', content: 'In her teenage years, Margaret developed a passion for literature and music. She joined the school choir and discovered her beautiful singing voice, a talent that would bring joy to many throughout her life. Her English teacher, Mrs. Peterson, recognized her gift for writing and encouraged her to keep a journal...' },
  { id: 3, title: 'Love and Family', content: 'Margaret met John at a community dance in the summer of 1968. His quiet confidence and kind smile caught her attention immediately. They were married within a year, beginning a partnership that would span five decades. Together they built a home filled with laughter, music, and the delicious aroma of Margaret\'s famous apple pies...' },
];

const StorybookDisplayPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
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
                  
                  <div className="border-t border-neutral-200 pt-4">
                    <button
                      className="flex items-center justify-center w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 py-2 rounded-md transition-colors"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={16} className="mr-2" />
                          Pause Audio
                        </>
                      ) : (
                        <>
                          <Play size={16} className="mr-2" />
                          Play Audio
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Card>
              
              <Card>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Table of Contents</h3>
                  <ul className="space-y-2">
                    {chapters.map((chapter) => (
                      <li key={chapter.id}>
                        <a 
                          href={`#chapter-${chapter.id}`}
                          className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                        >
                          <Book size={14} className="mr-2" />
                          Chapter {chapter.id}: {chapter.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="mb-8">
                <div className="p-6">
                  {chapters.map((chapter) => (
                    <div key={chapter.id} id={`chapter-${chapter.id}`} className="mb-8">
                      <h2 className="font-serif text-2xl font-semibold mb-4">
                        Chapter {chapter.id}: {chapter.title}
                      </h2>
                      <p className="text-neutral-700 leading-relaxed">
                        {chapter.content}
                      </p>
                      
                      {chapter.id === 1 && (
                        <div className="my-4 border rounded-lg overflow-hidden">
                          <img
                            src="https://images.pexels.com/photos/7116214/pexels-photo-7116214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Margaret as a child"
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-2 bg-neutral-50 text-sm text-neutral-600 text-center">
                            Margaret at her family's lake house, 1952
                          </div>
                        </div>
                      )}
                      
                      {chapter.id !== chapters.length && (
                        <div className="border-b border-neutral-200 mt-8"></div>
                      )}
                    </div>
                  ))}
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