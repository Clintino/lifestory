import React from 'react';
import { Check } from 'lucide-react';

type Step = {
  id: number;
  label: string;
};

type ProgressIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-0.5 bg-neutral-200">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCompleted
                          ? 'bg-indigo-600 text-white'
                          : isCurrent
                          ? 'bg-white border-2 border-indigo-600 text-indigo-600'
                          : 'bg-white border-2 border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={16} />
                      ) : (
                        <span className="text-sm">{step.id}</span>
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs whitespace-nowrap ${
                        isCompleted || isCurrent
                          ? 'text-indigo-600 font-medium'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;