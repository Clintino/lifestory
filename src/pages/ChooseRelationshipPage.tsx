import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Users, Smile } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const relationships = [
  { id: 'mom', label: 'Mom', icon: <Heart size={28} /> },
  { id: 'dad', label: 'Dad', icon: <Heart size={28} /> },
  { id: 'grandparent', label: 'Grandparent', icon: <Users size={28} /> },
  { id: 'spouse', label: 'Spouse', icon: <Heart size={28} /> },
  { id: 'sibling', label: 'Sibling', icon: <User size={28} /> },
  { id: 'other', label: 'Other', icon: <Smile size={28} /> },
];

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Select Questions' },
  { id: 4, label: 'Tell Story' },
  { id: 5, label: 'Preview' },
];

const ChooseRelationshipPage: React.FC = () => {
  const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);
  const [customRelationship, setCustomRelationship] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedRelationship) {
      // Save relationship data
      const relationshipData = {
        relationship: selectedRelationship,
        customRelationship: selectedRelationship === 'other' ? customRelationship : ''
      };
      localStorage.setItem('relationshipData', JSON.stringify(relationshipData));
      navigate('/create-profile');
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <ProgressIndicator steps={steps} currentStep={1} />

        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            Who is this story about?
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Choose the relationship you have with the person whose story you want to preserve.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {relationships.map((relationship) => (
              <Card 
                key={relationship.id}
                hoverable
                selected={selectedRelationship === relationship.id}
                onClick={() => setSelectedRelationship(relationship.id)}
                className="p-4 text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    selectedRelationship === relationship.id
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {relationship.icon}
                  </div>
                  <span className="font-medium">{relationship.label}</span>
                </div>
              </Card>
            ))}
          </div>

          {selectedRelationship === 'other' && (
            <div className="mb-8">
              <label htmlFor="customRelationship" className="block text-sm font-medium text-neutral-700 mb-1">
                Please specify your relationship:
              </label>
              <input
                type="text"
                id="customRelationship"
                value={customRelationship}
                onChange={(e) => setCustomRelationship(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Aunt, Friend, Mentor"
              />
            </div>
          )}

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              disabled={!selectedRelationship || (selectedRelationship === 'other' && !customRelationship)}
            >
              Next: Create Profile
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ChooseRelationshipPage;