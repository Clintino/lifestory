import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Thank You!
          </h1>
          
          <p className="text-neutral-600 mb-8">
            Your purchase was successful. We've sent you an email with your storybook link and a receipt for your purchase.
          </p>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-6 mb-8">
            <h2 className="font-medium text-lg mb-4">What's Next?</h2>
            
            <ul className="space-y-4 text-left">
              <li className="flex">
                <div className="mr-3 text-indigo-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-neutral-600">We've sent a confirmation to your email address.</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-3 text-indigo-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-medium">View your storybook</p>
                  <p className="text-sm text-neutral-600">Access your digital storybook anytime.</p>
                </div>
              </li>
              
              <li className="flex">
                <div className="mr-3 text-indigo-600">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="font-medium">Share with family</p>
                  <p className="text-sm text-neutral-600">Use the private link to share this precious story.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              size="lg"
              to="/storybook"
              className="w-full"
              icon={<ArrowRight size={16} />}
            >
              View Your Storybook
            </Button>
            
            <Button
              variant="outline"
              to="/"
              className="w-full"
            >
              Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ThankYouPage;