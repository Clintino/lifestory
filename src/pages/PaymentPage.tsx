import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Lock } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/storybook');
    }, 1500);
  };

  const isFormComplete = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.cardNumber.trim() !== '' &&
      formData.expiry.trim() !== '' &&
      formData.cvc.trim() !== ''
    );
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto">
          <h1 className="font-serif text-3xl font-bold text-center mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            You're just one step away from unlocking Margaret's complete life story.
          </p>

          <Card className="mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-neutral-200">
                <div>
                  <h2 className="font-medium">Digital Storybook</h2>
                  <p className="text-sm text-neutral-600">Lifetime access</p>
                </div>
                <div className="font-bold">$29.00</div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                    Card Information
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CreditCard size={20} className="text-neutral-400" />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700 mb-1">
                      Expiration
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  
                  <div className="flex-1">
                    <label htmlFor="cvc" className="block text-sm font-medium text-neutral-700 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-neutral-600 pt-2">
                  <Lock size={14} className="mr-2" />
                  <span>Your payment information is secure</span>
                </div>
                
                <div className="pt-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !isFormComplete()}
                  >
                    {isSubmitting ? 'Processing...' : 'Unlock Storybook'}
                  </Button>
                </div>
              </form>
            </div>
          </Card>
          
          <div className="flex items-center justify-center text-neutral-600 text-sm">
            <Shield size={16} className="mr-2" />
            <span>We don't share your data with third parties</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentPage;