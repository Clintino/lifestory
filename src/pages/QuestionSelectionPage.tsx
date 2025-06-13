import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Plus } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import ProgressIndicator from '../components/ui/ProgressIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { questionCategories, getQuestionsForCategory, type Question } from '../data/questions';

const steps = [
  { id: 1, label: 'Choose Relationship' },
  { id: 2, label: 'Create Profile' },
  { id: 3, label: 'Select Questions' },
  { id: 4, label: 'Tell Story' },
  { id: 5, label: 'Preview' },
];

const QuestionSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [relationship, setRelationship] = useState<string>('');

  useEffect(() => {
    // Get relationship from localStorage or context
    const relationshipData = localStorage.getItem('relationshipData');
    if (relationshipData) {
      const parsed = JSON.parse(relationshipData);
      setRelationship(parsed.relationship || '');
    }

    // Load previously selected questions
    const savedQuestions = localStorage.getItem('selectedQuestions');
    if (savedQuestions) {
      setSelectedQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const toggleQuestion = (question: Question) => {
    const isSelected = selectedQuestions.some(q => q.id === question.id);
    
    if (isSelected) {
      setSelectedQuestions(prev => prev.filter(q => q.id !== question.id));
    } else {
      setSelectedQuestions(prev => [...prev, question]);
    }
  };

  const addAllFromCategory = (categoryId: string) => {
    const categoryQuestions = getQuestionsForCategory(categoryId, relationship);
    const newQuestions = categoryQuestions.filter(
      q => !selectedQuestions.some(selected => selected.id === q.id)
    );
    setSelectedQuestions(prev => [...prev, ...newQuestions]);
  };

  const handleNext = () => {
    localStorage.setItem('selectedQuestions', JSON.stringify(selectedQuestions));
    navigate('/story-input');
  };

  const isQuestionSelected = (questionId: string) => {
    return selectedQuestions.some(q => q.id === questionId);
  };

  const getCategorySelectedCount = (categoryId: string) => {
    const categoryQuestions = getQuestionsForCategory(categoryId, relationship);
    return categoryQuestions.filter(q => isQuestionSelected(q.id)).length;
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 pt-24 pb-16">
        <ProgressIndicator steps={steps} currentStep={3} />

        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-2">
            Choose Questions to Explore
          </h1>
          <p className="text-neutral-600 text-center mb-8">
            Select the questions that will help tell their story. You can choose from different categories or add your own.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Categories */}
            <div className="md:col-span-2 space-y-4">
              {questionCategories.map((category) => {
                const selectedCount = getCategorySelectedCount(category.id);
                const totalQuestions = category.questions.length;
                const isExpanded = expandedCategory === category.id;

                return (
                  <Card key={category.id} className="overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="font-medium text-lg">{category.name}</h3>
                            <p className="text-sm text-neutral-600">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedCount > 0 && (
                            <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
                              {selectedCount}/{totalQuestions}
                            </span>
                          )}
                          <ChevronRight 
                            size={20} 
                            className={`text-neutral-400 transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-neutral-200">
                        <div className="p-4 bg-neutral-50 flex justify-between items-center">
                          <span className="text-sm text-neutral-600">
                            {totalQuestions} questions in this category
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addAllFromCategory(category.id)}
                            icon={<Plus size={14} />}
                          >
                            Add All
                          </Button>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          {getQuestionsForCategory(category.id, relationship).map((question) => (
                            <div
                              key={question.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                isQuestionSelected(question.id)
                                  ? 'border-indigo-300 bg-indigo-50'
                                  : 'border-neutral-200 hover:border-neutral-300'
                              }`}
                              onClick={() => toggleQuestion(question)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                  isQuestionSelected(question.id)
                                    ? 'border-indigo-500 bg-indigo-500'
                                    : 'border-neutral-300'
                                }`}>
                                  {isQuestionSelected(question.id) && (
                                    <Check size={12} className="text-white" />
                                  )}
                                </div>
                                <p className="text-sm leading-relaxed">{question.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            {/* Selected Questions Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-4">Selected Questions</h3>
                    
                    {selectedQuestions.length === 0 ? (
                      <p className="text-neutral-500 text-sm">
                        No questions selected yet. Choose from the categories to get started.
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-neutral-600 mb-4">
                          {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} selected
                        </p>
                        
                        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                          {selectedQuestions.map((question) => (
                            <div
                              key={question.id}
                              className="p-2 bg-indigo-50 rounded text-sm border border-indigo-200"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-indigo-800 leading-relaxed">{question.text}</p>
                                <button
                                  onClick={() => toggleQuestion(question)}
                                  className="text-indigo-600 hover:text-indigo-800 flex-shrink-0"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full"
                          onClick={handleNext}
                        >
                          Continue with {selectedQuestions.length} Question{selectedQuestions.length !== 1 ? 's' : ''}
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default QuestionSelectionPage;