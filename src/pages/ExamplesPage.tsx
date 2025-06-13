import React, { useState } from 'react';
import { Play, Pause, Star, ArrowRight, Heart, Users, BookOpen, Clock, Volume2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const exampleStories = [
  {
    id: 1,
    quote: "He proposed with a potato because he couldn't afford a ring.",
    name: "Grandma Rose",
    age: 88,
    location: "Ohio",
    emoji: "🌻",
    followUp: "But I said yes… because it was mashed.",
    category: "Love & Romance"
  },
  {
    id: 2,
    quote: "I walked 12 miles to school every day, uphill both ways.",
    name: "Grandpa Joe",
    age: 92,
    location: "Montana",
    emoji: "⛰️",
    followUp: "And I was grateful for every step.",
    category: "Childhood"
  },
  {
    id: 3,
    quote: "The day you were born, I knew my purpose in life.",
    name: "Mom Sarah",
    age: 67,
    location: "California",
    emoji: "💕",
    followUp: "Everything before that was just practice.",
    category: "Family"
  },
  {
    id: 4,
    quote: "I kept every letter you wrote me from summer camp.",
    name: "Dad Michael",
    age: 71,
    location: "Texas",
    emoji: "📝",
    followUp: "Even the one where you misspelled 'homesick' as 'home-stick.'",
    category: "Memories"
  }
];

const specialStory = {
  title: "His Last Letter",
  quote: "We lost Dad last year. But hearing his voice, telling us how he met Mom at a dance, and how nervous he was to hold her hand... it gave my kids the grandfather they never got to meet.",
  author: "James, Seattle",
  emoji: "😢",
  audioLength: "2 min",
  hasLetter: true
};

const testimonials = [
  {
    quote: "We cried, then laughed, then cried again. My kids play Grandpa's stories like bedtime episodes.",
    author: "Michelle, daughter of David",
    rating: 5,
    emoji: "😭"
  },
  {
    quote: "I never knew my grandmother was so funny until I heard her stories. Now I understand where I get my sense of humor.",
    author: "Jake, grandson of Eleanor",
    rating: 5,
    emoji: "😂"
  },
  {
    quote: "This became our family's most treasured possession. We read it every Christmas.",
    author: "The Johnson Family",
    rating: 5,
    emoji: "🎄"
  },
  {
    quote: "Dad's voice telling his stories is the most precious gift he could have given us.",
    author: "Lisa, daughter of Robert",
    rating: 5,
    emoji: "🎁"
  }
];

const ExamplesPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [playingSpecialAudio, setPlayingSpecialAudio] = useState(false);

  const toggleSpecialAudio = () => {
    setPlayingSpecialAudio(!playingSpecialAudio);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
              Stories that moved us
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From belly laughs to life lessons, these digital stories are more than memories—they're gifts for generations.
            </p>
          </div>
        </section>

        {/* Special Featured Story - His Last Letter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-100">
                <div className="text-center mb-6">
                  <span className="text-3xl mb-4 block">{specialStory.emoji}</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-neutral-800 mb-4">
                    "{specialStory.title}"
                  </h2>
                </div>
                
                <blockquote className="text-lg md:text-xl text-neutral-700 text-center mb-6 leading-relaxed italic">
                  "{specialStory.quote}"
                </blockquote>
                
                <p className="text-center text-neutral-600 font-medium mb-8">
                  — {specialStory.author}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={toggleSpecialAudio}
                    className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    {playingSpecialAudio ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                    <span className="font-medium">
                      {playingSpecialAudio ? 'Pause' : 'Play'} the recorded memory ({specialStory.audioLength})
                    </span>
                  </button>
                  
                  <Button
                    variant="outline"
                    className="border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                    icon={<BookOpen size={18} />}
                  >
                    Read the letter he recorded
                  </Button>
                </div>

                {playingSpecialAudio && (
                  <div className="mt-6 bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Volume2 size={16} className="text-indigo-600" />
                      <span className="text-sm font-medium text-neutral-700">Playing: Dad's Dance Story</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* Emotional Impact Grid - All 4 Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-12">
              More Stories That Touch Hearts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {exampleStories.map((story) => (
                <Card key={story.id} className="p-6 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="h-full flex flex-col">
                    <blockquote className="text-lg font-medium text-neutral-800 mb-3 flex-grow">
                      "{story.quote}"
                    </blockquote>
                    <div className="flex items-center gap-2 text-neutral-600 mb-3">
                      <span className="text-xl">{story.emoji}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{story.name}, {story.age}</span>
                        <span className="text-xs text-neutral-500">{story.location}</span>
                      </div>
                    </div>
                    <p className="text-neutral-700 italic text-sm">"{story.followUp}"</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reactions Carousel */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-12">
              What families say after seeing the final book
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={20} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-xl text-neutral-700 mb-4 leading-relaxed">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl">{testimonial.emoji}</span>
                          <cite className="text-neutral-600 font-medium">— {testimonial.author}</cite>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Navigation */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-indigo-600' : 'bg-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Life Story in 60 Seconds */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-12">
              Life Story in 60 Seconds
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/8471012/pexels-photo-8471012.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Grandson reaction"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-neutral-700 mb-3">A grandson reacting to the moment his grandmother talks about meeting JFK</p>
                  <Button variant="text" size="sm" className="text-indigo-600">
                    Create your own for free →
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/8471010/pexels-photo-8471010.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Mom reaction"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-neutral-700 mb-3">A mom tearing up while watching her father describe her birth</p>
                  <Button variant="text" size="sm" className="text-indigo-600">
                    Create your own for free →
                  </Button>
                </div>
              </Card>

              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/8471013/pexels-photo-8471013.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Dad laughing"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Play size={32} className="text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-neutral-700 mb-3">A dad laughing out loud hearing his teenage poetry from 1972</p>
                  <Button variant="text" size="sm" className="text-indigo-600">
                    Create your own for free →
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Every family has a story worth saving.
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Create yours in 5 minutes—just voice or text.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                to="/choose-relationship"
                className="bg-white text-indigo-600 hover:bg-neutral-100"
                icon={<BookOpen size={20} />}
              >
                Start Your Story
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-indigo-600"
                icon={<Heart size={20} />}
              >
                See More Examples
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ExamplesPage;