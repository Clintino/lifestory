import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Share2, BookOpen } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const features = [
  {
    icon: <BookOpen size={20} />,
    title: 'Full AI-crafted storybook',
    description: 'Complete narrative across multiple chapters, beautifully written',
  },
  {
    icon: <Download size={20} />,
    title: 'All audio recordings',
    description: 'Every voice recording preserved in high quality',
  },
  {
    icon: <Share2 size={20} />,
    title: 'Sharable private link',
    description: 'Easy to share with family members anywhere',
  },
];

const PremiumUpgradePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            Make it a keepsake your family will treasure
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Transform Margaret's stories into a beautiful digital storybook for generations to come.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <Card className="h-full">
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-4">
                    What's included:
                  </h2>
                  
                  <ul className="space-y-4">
                    {features.map((feature, index) => (
                      <li key={index} className="flex">
                        <div className="mr-3 text-indigo-600">
                          <CheckCircle size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium">{feature.title}</h3>
                          <p className="text-sm text-neutral-600">{feature.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-neutral-200">
                    <blockquote className="text-neutral-700 italic">
                      "It felt like Mom was writing a letter to my kids. This is something we'll cherish forever."
                    </blockquote>
                    <p className="text-sm text-neutral-600 mt-2">— Jennifer K., Boston</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                  Best Value
                </div>
                
                <div className="p-6">
                  <h2 className="font-serif text-2xl font-semibold mb-2">
                    Digital Storybook
                  </h2>
                  <div className="flex items-baseline mb-6">
                    <span className="text-3xl font-bold">$29</span>
                    <span className="text-neutral-600 ml-2">one-time payment</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>PDF download with all chapters</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Audio recordings included</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Private sharing link</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Unlimited access</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle size={16} className="text-green-500 mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    to="/payment"
                  >
                    Buy Digital Storybook
                  </Button>
                  
                  <p className="text-xs text-center text-neutral-500 mt-4">
                    Secure payment processing by Stripe
                  </p>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="text-center">
            <Button
              variant="outline"
              to="/preview"
            >
              Return to Preview
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PremiumUpgradePage;