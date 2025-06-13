import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, Bookmark, Play, Pause, Book, Printer, Heart, Star, Clock, Volume2, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { generateFullStorybook } from '../lib/openai';

// Sample complete storybook data - this would come from the database in production
const sampleStorybook = {
  profile: {
    name: "Margaret Rose Johnson",
    birthYear: 1945,
    location: "Minnesota",
    description: "Beloved grandmother of 3, master gardener, and keeper of family traditions",
    coverImage: "https://images.pexels.com/photos/7116213/pexels-photo-7116213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  chapters: [
    {
      id: 1,
      title: "Roots in Minnesota Soil",
      subtitle: "Early Years (1945-1963)",
      content: `Margaret Rose was born on a crisp October morning in 1945, when the leaves in rural Minnesota painted the world in shades of amber and gold. The daughter of a schoolteacher and a carpenter, she learned early that education and craftsmanship were the twin pillars of a meaningful life.

The Johnson farmhouse sat on forty acres of rolling hills, where Margaret spent her childhood summers catching fireflies in mason jars and learning to swim in the cool, clear waters of Lake Minnetonka. Her mother, Eleanor, would call her in for supper with a bell that could be heard across three counties, and Margaret would come running, her bare feet knowing every stone and root on the path home.

"We didn't have much money," Margaret recalls, "but we were rich in the ways that mattered. Sunday dinners that lasted until dark, stories told by the fire, and the kind of laughter that made your belly ache." Her father, Harold, taught her to whittle on the front porch, his weathered hands guiding hers as wood shavings curled at their feet like tiny prayers.

The one-room schoolhouse where her mother taught became Margaret's second home. She would arrive early to help clean the blackboard and stay late to organize the books, absorbing lessons not just in arithmetic and reading, but in patience, kindness, and the profound impact one person could have on a community.

Winter evenings were spent around the radio, the family gathered close as snow piled against the windows. Margaret learned to knit from her grandmother's patient hands, each stitch a meditation, each completed project a small victory against the long Minnesota cold.`,
      images: [
        {
          url: "https://images.pexels.com/photos/7116214/pexels-photo-7116214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "Margaret at the family lake house, summer 1952"
        }
      ],
      audioUrl: "/audio/chapter1.mp3",
      duration: "4:32"
    },
    {
      id: 2,
      title: "The Dance That Changed Everything",
      subtitle: "Love & Romance (1963-1968)",
      content: `The summer of 1963 shimmered with possibility. Margaret, now eighteen and fresh from high school graduation, had taken a job at the local diner to save money for teacher's college. It was there, on a humid July evening, that her life took an unexpected turn.

The Midsummer Community Dance was held in the old barn behind the Methodist church, strung with lights that twinkled like earthbound stars. Margaret had almost stayed home—her best dress had a small tear, and she felt more comfortable with a book than on a dance floor. But her friend Betty wouldn't hear of it.

"You can't hide behind those books forever, Maggie," Betty had said, using the nickname that only her closest friends were allowed. "Besides, I heard there's a new boy in town."

That new boy was John William Thompson, recently returned from two years in the Army and looking for a fresh start. He was tall and quiet, with kind eyes and a smile that seemed to hold secrets. When he asked Margaret to dance, her heart performed a little skip that had nothing to do with the music.

"I stepped on his feet at least three times," Margaret laughs, remembering. "But he just smiled and said, 'Good thing I wore my Army boots.' That's when I knew he was different."

They talked until the last song played, sharing stories under the summer stars. John told her about his dreams of becoming a teacher, about the places he'd seen and the home he wanted to build. Margaret found herself opening up in ways she never had before, her usual shyness melting away like morning frost.

Their courtship unfolded over long walks by the lake, picnics in meadows dotted with wildflowers, and letters exchanged when John returned to finish his teaching degree in Minneapolis. Each envelope that arrived was a small treasure, filled with his careful handwriting and pressed flowers from the campus quad.

The proposal came on Christmas Eve, 1967, in the same barn where they'd first danced. John had convinced the pastor to let him string up those same twinkling lights, and when Margaret arrived, thinking she was helping with the church pageant, she found him waiting with a ring he'd saved six months to buy.

"It wasn't a diamond," Margaret says, her eyes still bright with the memory. "It was a simple gold band with a tiny pearl. But when he got down on one knee and said, 'Margaret Rose, will you build a life with me?' I knew I'd found my forever."`,
      images: [
        {
          url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "Margaret and John's engagement photo, December 1967"
        }
      ],
      audioUrl: "/audio/chapter2.mp3",
      duration: "6:18"
    },
    {
      id: 3,
      title: "Building a Home, Growing a Family",
      subtitle: "Marriage & Motherhood (1968-1985)",
      content: `Margaret and John's wedding day dawned bright and clear on June 15th, 1968. The ceremony was held in the same Methodist church where they'd met, with Margaret's mother's roses adorning every pew and the scent of her grandmother's apple pies wafting from the fellowship hall.

"I made my own dress," Margaret remembers with pride. "Spent three months on it, working by lamplight after my shifts at the diner. It wasn't fancy, but it was mine, and when I walked down that aisle and saw John's face, I felt like the most beautiful woman in the world."

Their first home was a tiny two-bedroom house on Elm Street, with a kitchen barely big enough for two people and a garden plot that would become Margaret's sanctuary. John taught at the local elementary school while Margaret worked part-time at the library, both of them saving every penny for the family they dreamed of starting.

The babies came in quick succession—first Sarah in 1970, then Michael in 1972, and finally little David in 1975. The house that had once felt cozy now burst at the seams with laughter, tears, and the beautiful chaos of family life.

"Those early years were a blur of diapers and sleepless nights," Margaret recalls. "But they were also filled with first words and first steps, bedtime stories and Sunday morning pancakes. John would get up with the babies so I could sleep in on Saturdays—just until seven, mind you, but it felt like luxury."

Margaret's garden became legendary in the neighborhood. What started as a few tomato plants grew into a half-acre paradise of vegetables, herbs, and flowers. She taught the children to plant seeds and tend the soil, lessons that went far deeper than gardening.

"I wanted them to understand that good things take time," she explains. "That you have to nurture what you want to grow, whether it's carrots or character."

The kitchen table became the heart of their home, where homework was completed, problems were solved, and dreams were shared over Margaret's famous apple pie. Sunday dinners grew to include neighbors, friends, and anyone who needed a place to belong.

"Our door was always open," Margaret says. "John used to joke that we should install a revolving door, but I think he was proud that our home was a place where people felt welcome."

Through it all, Margaret and John's love deepened and matured. They learned to navigate the challenges of raising three children on a teacher's salary, to support each other through difficult times, and to find joy in the simple moments that make up a life well-lived.`,
      images: [
        {
          url: "https://images.pexels.com/photos/8471012/pexels-photo-8471012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "The Thompson family Christmas morning, 1978"
        },
        {
          url: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "Margaret's prize-winning garden, summer 1982"
        }
      ],
      audioUrl: "/audio/chapter3.mp3",
      duration: "7:45"
    },
    {
      id: 4,
      title: "Seasons of Change",
      subtitle: "Empty Nest & New Adventures (1985-2010)",
      content: `The house felt impossibly quiet after David left for college in 1993. Margaret stood in his empty bedroom, still smelling faintly of teenage boy and dreams, and wondered what came next. For twenty-three years, her identity had been wrapped up in being a mother, and now her children were writing their own stories.

"I cried for a week," Margaret admits. "Then John came home with a stack of travel brochures and said, 'Margaret Rose, it's time for our second act.'"

Their first adventure was a cross-country road trip in their old Buick, visiting national parks and small towns, staying in motor lodges and eating at diners that reminded them of their younger days. Margaret kept a detailed journal of their travels, filling pages with pressed flowers, ticket stubs, and observations about the kindness of strangers.

"We discovered that we still liked each other," she laughs. "After all those years of talking about the kids and the house and the bills, we remembered how to talk about dreams and ideas and the things that made us laugh."

Back home, Margaret threw herself into community service with the same passion she'd once reserved for raising children. She volunteered at the library's literacy program, taught Sunday school, and organized the annual church bazaar that became a town tradition.

Her garden evolved too, becoming a teaching space where she shared her knowledge with young mothers and new gardeners. "Plants don't care about your mistakes," she would tell them. "They just want you to try again next season."

The grandchildren began arriving in the late 1990s—first Sarah's twins, Emma and Ethan, then Michael's daughter Lily, and finally David's son James. Margaret embraced her new role as grandmother with the same wholehearted devotion she'd brought to everything else.

"Being a grandmother is like being a mother, but with better perspective," she explains. "You get to love them fiercely and spoil them just enough, then send them home to their parents."

The new millennium brought changes and challenges. John's retirement in 2005 meant more time together but also adjustments to their rhythm. Margaret's arthritis began to slow her down, forcing her to accept help in the garden she'd tended alone for decades.

"Getting older isn't for the faint of heart," she says with characteristic honesty. "But it's also a privilege denied to many. Every morning I wake up is a gift, and I try to unwrap it with gratitude."`,
      images: [
        {
          url: "https://images.pexels.com/photos/8471010/pexels-photo-8471010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "Margaret and John on their 40th anniversary trip to Yellowstone, 2008"
        }
      ],
      audioUrl: "/audio/chapter4.mp3",
      duration: "5:52"
    },
    {
      id: 5,
      title: "Wisdom in the Twilight",
      subtitle: "Legacy & Reflections (2010-Present)",
      content: `At seventy-eight, Margaret moves through her days with the measured grace of someone who has learned to savor rather than rush. The house on Elm Street, now paid off and filled with decades of memories, remains the gathering place for a family that has grown to include spouses, grandchildren, and great-grandchildren.

"I look around this table on Sundays," she says, "and I see John's eyes in our grandson James, my mother's stubborn chin in little Emma, and my father's gentle hands in David. We're all connected, like links in a chain that stretches back to people we never met and forward to children not yet born."

The garden, though smaller now, still produces enough tomatoes to share with the entire neighborhood. Margaret has trained her granddaughter Lily to take over the more demanding tasks, passing down not just techniques but the deeper wisdom of patience, persistence, and faith in tomorrow's harvest.

"Every seed is an act of hope," she tells Lily as they work side by side. "You plant it not knowing what the weather will bring, but trusting that if you tend it well, something beautiful will grow."

Margaret's recipe box has become a family treasure, filled with handwritten cards stained with decades of use. Each recipe tells a story—the chocolate chip cookies that could cure any childhood disappointment, the pot roast that welcomed new family members, the apple pie that won the county fair three years running.

"Food is love made visible," she explains. "When I cook for my family, I'm not just feeding their bodies. I'm nourishing their souls with all the care and tradition that came before them."

The loss of old friends has taught Margaret about the preciousness of time and the importance of saying what matters while you can. She writes letters now—real letters, with pen and paper—to her children and grandchildren, sharing memories and wisdom she wants them to carry forward.

"I won't be here forever," she says matter-of-factly. "But the love I've poured into this family, the traditions we've built, the values we've shared—those will outlive me. That's the only immortality any of us really have."

When asked what she's most proud of, Margaret doesn't hesitate. "The family John and I built together. Not just the children we raised, but the home we created where love could flourish. We didn't have much money, but we were rich in the ways that mattered."

Her advice for future generations is simple but profound: "Love deeply, forgive quickly, and never underestimate the power of a home-cooked meal and an open door. The world can be a hard place, but families—real families built on love and commitment—can be sanctuaries where souls are restored and hope is renewed."

As the sun sets on another day in the house on Elm Street, Margaret sits in her favorite chair by the window, watching the light fade over the garden she's tended for more than fifty years. Tomorrow will bring new challenges and new joys, but tonight, surrounded by the echoes of laughter and love that fill every corner of her home, she is content.

"This has been a good life," she whispers to the gathering dusk. "A very good life indeed."`,
      images: [
        {
          url: "https://images.pexels.com/photos/8471013/pexels-photo-8471013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          caption: "Margaret in her garden with great-granddaughter Sophie, 2023"
        }
      ],
      audioUrl: "/audio/chapter5.mp3",
      duration: "8:15"
    }
  ],
  metadata: {
    totalPages: 47,
    wordCount: 3247,
    readingTime: "12-15 minutes",
    audioLength: "32 minutes",
    createdDate: "December 2024",
    familyMembers: ["Sarah Thompson-Miller", "Michael Thompson", "David Thompson"],
    dedicatedTo: "For Emma, Ethan, Lily, James, and Sophie - may you always know where you came from"
  }
};

const DigitalStorybookPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Simulate reading progress
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentChapterData = sampleStorybook.chapters.find(ch => ch.id === currentChapter);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextChapter = () => {
    if (currentChapter < sampleStorybook.chapters.length) {
      setCurrentChapter(currentChapter + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div 
            className="h-1 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <header className="sticky top-1 z-40 bg-white/90 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
                  icon={<Home size={16} />}
                >
                  Home
                </Button>
                <div>
                  <h1 className="font-serif text-xl font-bold text-neutral-800">
                    {sampleStorybook.profile.name}'s Life Story
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Chapter {currentChapter} of {sampleStorybook.chapters.length} • {currentChapterData?.title}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Download size={16} />}
                >
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Share2 size={16} />}
                  onClick={() => setShowShareModal(true)}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  
                  {/* Profile Card */}
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={sampleStorybook.profile.coverImage}
                        alt={sampleStorybook.profile.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="font-serif text-lg font-bold">{sampleStorybook.profile.name}</h2>
                        <p className="text-sm opacity-90">{sampleStorybook.profile.birthYear} • {sampleStorybook.profile.location}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-neutral-600 mb-4">{sampleStorybook.profile.description}</p>
                      
                      {/* Audio Player */}
                      <div className="border-t border-neutral-200 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Audio Narration</span>
                          <span className="text-xs text-neutral-500">{currentChapterData?.duration}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={togglePlayPause}
                          icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        >
                          {isPlaying ? 'Pause Audio' : 'Play Audio'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                  
                  {/* Table of Contents */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-medium mb-4 flex items-center">
                        <Book size={16} className="mr-2" />
                        Table of Contents
                      </h3>
                      <ul className="space-y-2">
                        {sampleStorybook.chapters.map((chapter) => (
                          <li key={chapter.id}>
                            <button
                              onClick={() => setCurrentChapter(chapter.id)}
                              className={`text-left w-full p-2 rounded text-sm transition-colors ${
                                chapter.id === currentChapter
                                  ? 'bg-amber-100 text-amber-800 font-medium'
                                  : 'text-neutral-600 hover:bg-neutral-50'
                              }`}
                            >
                              <div className="font-medium">{chapter.title}</div>
                              <div className="text-xs opacity-75">{chapter.subtitle}</div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>

                  {/* Story Stats */}
                  <Card>
                    <div className="p-4">
                      <h3 className="font-medium mb-4">Story Details</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Total Pages:</span>
                          <span className="font-medium">{sampleStorybook.metadata.totalPages}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Word Count:</span>
                          <span className="font-medium">{sampleStorybook.metadata.wordCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Reading Time:</span>
                          <span className="font-medium">{sampleStorybook.metadata.readingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Audio Length:</span>
                          <span className="font-medium">{sampleStorybook.metadata.audioLength}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card className="mb-8">
                  <div className="p-8 md:p-12">
                    
                    {/* Chapter Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                        Chapter {currentChapter}
                      </div>
                      <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 mb-2">
                        {currentChapterData?.title}
                      </h1>
                      <p className="text-lg text-neutral-600">{currentChapterData?.subtitle}</p>
                    </div>

                    {/* Chapter Content */}
                    <div className="prose prose-lg max-w-none">
                      {currentChapterData?.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Chapter Images */}
                    {currentChapterData?.images && currentChapterData.images.length > 0 && (
                      <div className="my-8 space-y-6">
                        {currentChapterData.images.map((image, index) => (
                          <div key={index} className="text-center">
                            <div className="inline-block transform rotate-1 hover:rotate-0 transition-transform duration-300">
                              <div className="bg-white p-4 shadow-lg border border-neutral-200 max-w-md">
                                <img
                                  src={image.url}
                                  alt={image.caption}
                                  className="w-full h-64 object-cover mb-3"
                                />
                                <p className="text-sm text-neutral-600 font-handwriting">
                                  {image.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Chapter Navigation */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-neutral-200">
                      <Button
                        variant="outline"
                        onClick={prevChapter}
                        disabled={currentChapter === 1}
                        icon={<ChevronLeft size={16} />}
                      >
                        Previous Chapter
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-neutral-600">
                          Page {currentChapter} of {sampleStorybook.chapters.length}
                        </p>
                      </div>
                      
                      <Button
                        variant="primary"
                        onClick={nextChapter}
                        disabled={currentChapter === sampleStorybook.chapters.length}
                        icon={<ChevronRight size={16} />}
                      >
                        Next Chapter
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* End of Story */}
                {currentChapter === sampleStorybook.chapters.length && (
                  <Card className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                    <div className="max-w-2xl mx-auto">
                      <Heart size={32} className="text-amber-600 mx-auto mb-4" />
                      <h2 className="font-serif text-2xl font-bold text-neutral-800 mb-4">
                        The End of This Beautiful Story
                      </h2>
                      <p className="text-neutral-700 mb-6 leading-relaxed">
                        "{sampleStorybook.metadata.dedicatedTo}"
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          variant="primary"
                          icon={<Download size={16} />}
                        >
                          Download Complete Story
                        </Button>
                        <Button
                          variant="outline"
                          icon={<Printer size={16} />}
                        >
                          Order Printed Book
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Family Testimonial */}
                <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
                        alt="Sarah"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-neutral-700 mb-2">
                          "Reading Mom's story brought tears to my eyes. The AI captured her voice so perfectly - it's like she's sitting right here telling us these stories herself. This will be treasured by our family for generations."
                        </blockquote>
                        <cite className="text-sm text-neutral-600 font-medium">
                          — Sarah Thompson-Miller, Daughter
                        </cite>
                      </div>
                    </div>
                  </div>
                </Card>
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
                  className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-600 text-white px-3 py-2 rounded-r-md hover:bg-amber-700">
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
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
              />
              <Button className="w-full bg-amber-600 hover:bg-amber-700">Send Story</Button>
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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
        .font-handwriting {
          font-family: 'Kalam', cursive;
        }
      `}</style>
    </PageTransition>
  );
};

export default DigitalStorybookPage;