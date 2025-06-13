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

const impactStories = [
  {
    title: "Reconnected two sisters after 30 years apart",
    description: "When Maria shared her mother's story about family traditions, her estranged sister reached out after reading it. They're planning their first reunion this Christmas.",
    image: "https://images.pexels.com/photos/8471016/pexels-photo-8471016.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Read this storybook"
  },
  {
    title: "Helped a grandchild write their college essay",
    description: "Tommy used his grandfather's immigration story as inspiration for his college application. He got into his dream school and credits Grandpa's courage for showing him the way.",
    image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Read this storybook"
  },
  {
    title: "Became a digital will for a grandfather with Alzheimer's",
    description: "Before his memory faded, Frank recorded his life lessons and family history. Now his grandchildren can hear his wisdom whenever they need guidance.",
    image: "https://images.pexels.com/photos/8471011/pexels-photo-8471011.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Read this storybook"
  },
  {
    title: "Helped preserve a voice before someone passed",
    description: "Margaret's family created her story just months before she passed. Her great-grandchildren, born after she was gone, still get to hear her voice and know her love.",
    image: "https://images.pexels.com/photos/8471009/pexels-photo-8471009.jpeg?auto=compress&cs=tinysrgb&w=800",
    cta: "Read this storybook"
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

        {/* Emotional Impact Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-12">
              More Stories That Touch Hearts
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {exampleStories.map((story) => (
                <Card key={story.id} className="p-6 hover:shadow-xl transition-all duration-300">
                  <div className="mb-4">
                    <blockquote className="text-lg font-medium text-neutral-800 mb-2">
                      "{story.quote}"
                    </blockquote>
                    <div className="flex items-center gap-2 text-neutral-600 mb-3">
                      <span className="text-xl">{story.emoji}</span>
                      <span className="font-medium">{story.name}, {story.age}</span>
                      <span className="text-sm">– {story.location}</span>
                    </div>
                    <p className="text-neutral-700 italic">"{story.followUp}"</p>
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

        {/* Stories That Changed Lives */}
        <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                Stories That Changed Lives
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                These aren't just stories—they're healing tools, family reunions, time machines.
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {impactStories.map((story, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-8 lg:gap-12`}
                >
                  <div className="lg:w-1/2">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                  <div className="lg:w-1/2 space-y-6">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-neutral-800">
                      {story.title}
                    </h3>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                      {story.description}
                    </p>
                    <Button
                      variant="outline"
                      className="border-indigo-500 text-indigo-600 hover:bg-indigo-50"
                    >
                      {story.cta} →
                    </Button>
                  </div>
                </div>
              ))}
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