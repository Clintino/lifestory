import React from 'react';
import { Heart, Mic, BookOpen, Share2 } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import GradientCard from '../components/ui/GradientCard';
import FeatureCard from '../components/ui/FeatureCard';
import RotatingHeadline from '../components/ui/RotatingHeadline';

const HomePage: React.FC = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <RotatingHeadline />
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Turn memories into beautiful digital stories they'll keep forever—with just a few questions and your voice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="primary" 
                size="lg" 
                to="/choose-relationship"
                className="text-black"
              >
                Start your story
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                to="/examples"
              >
                See examples
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradientCard gradient="yellow">
                <h3 className="text-2xl font-medium mb-2">Record</h3>
                <p className="text-white/80">Share memories through voice or text</p>
              </GradientCard>
              
              <GradientCard gradient="blue">
                <h3 className="text-2xl font-medium mb-2">Transform</h3>
                <p className="text-white/80">AI crafts beautiful narratives</p>
              </GradientCard>
              
              <GradientCard gradient="orange">
                <h3 className="text-2xl font-medium mb-2">Share</h3>
                <p className="text-white/80">Give your family a digital treasure</p>
              </GradientCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-center mb-16">
              The way family stories{' '}
              <span className="italic">should've</span>{' '}
              been preserved
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Mic size={32} />}
                title="Voice Recording"
                description="Capture authentic stories in their own voice"
                gradient="bg-gradient-to-br from-purple-400 to-purple-600"
              />
              <FeatureCard
                icon={<BookOpen size={32} />}
                title="AI Storytelling"
                description="Transform memories into engaging narratives"
                gradient="bg-gradient-to-br from-blue-400 to-blue-600"
              />
              <FeatureCard
                icon={<Heart size={32} />}
                title="Photo Integration"
                description="Bring stories to life with cherished photos"
                gradient="bg-gradient-to-br from-pink-400 to-pink-600"
              />
              <FeatureCard
                icon={<Share2 size={32} />}
                title="Easy Sharing"
                description="Share securely with family anywhere"
                gradient="bg-gradient-to-br from-orange-400 to-orange-600"
              />
            </div>

            {/* Tweet Testimonial */}
            <div className="mt-16 max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">Sahil Bloom</p>
                  <p className="text-neutral-600 mb-4">@SahilBloom</p>
                  <p className="text-lg leading-relaxed mb-4">
                    Life Hack: Record a video interview with your parents. Ask questions about their childhood, adventures, hopes, dreams, and fears. Our time with them is finite, but we fail to recognize it until it's too late. The recordings will last forever. Everyone should do this.
                  </p>
                  <div className="flex items-center gap-4 text-neutral-600">
                    <span>5.9K Likes</span>
                    <span>726 Retweets</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Start preserving your family's legacy today
            </h2>
            <p className="text-white/90 text-xl mb-8">
              Don't wait to capture the stories that make your family unique.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              to="/choose-relationship"
              className="text-black"
            >
              Begin your story
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;