import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ExamplesPage from './pages/ExamplesPage';
import ChooseRelationshipPage from './pages/ChooseRelationshipPage';
import CreateProfilePage from './pages/CreateProfilePage';
import QuestionSelectionPage from './pages/QuestionSelectionPage';
import StoryInputPage from './pages/StoryInputPage';
import PreviewSummaryPage from './pages/PreviewSummaryPage';
import PremiumUpgradePage from './pages/PremiumUpgradePage';
import PaymentPage from './pages/PaymentPage';
import StorybookDisplayPage from './pages/StorybookDisplayPage';
import DigitalStorybookPage from './pages/DigitalStorybookPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="examples" element={<ExamplesPage />} />
          <Route path="choose-relationship" element={<ChooseRelationshipPage />} />
          <Route path="create-profile" element={<CreateProfilePage />} />
          <Route path="question-selection" element={<QuestionSelectionPage />} />
          <Route path="story-input" element={<StoryInputPage />} />
          <Route path="preview" element={<PreviewSummaryPage />} />
          <Route path="upgrade" element={<PremiumUpgradePage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="storybook" element={<StorybookDisplayPage />} />
          <Route path="digital-story/:id" element={<DigitalStorybookPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;