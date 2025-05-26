
import React from 'react';
import { motion } from 'framer-motion';
import AboutHeader from './AboutHeader';
import AboutOverview from './AboutOverview';
import AboutTerms from './AboutTerms';
import RolesSection from './RolesSection';
import OfflineSection from './OfflineSection';
import FeaturesSection from './FeaturesSection';
import PrivacySection from './PrivacySection';
import GettingStartedSection from './GettingStartedSection';
import AboutFooter from './AboutFooter';
import { containerVariants, itemVariants } from './aboutAnimations';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AboutContentProps {
  onClose?: () => void;
}

const AboutContent: React.FC<AboutContentProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="flex flex-col h-full leading-relaxed text-neutral-800"
    >
      {/* Header section */}
      <motion.div variants={itemVariants}>
        <AboutHeader />
      </motion.div>
      
      {/* Content Sections - Scrollable area */}
      <ScrollArea className="flex-1 px-1">
        <motion.div variants={itemVariants} className="space-y-8 px-6 py-6">
          <AboutOverview />
          <AboutTerms />
          <RolesSection />
          <OfflineSection />
          <FeaturesSection />
          <PrivacySection />
          <GettingStartedSection />
        </motion.div>
      </ScrollArea>
      
      {/* Footer with Back button */}
      <motion.div variants={itemVariants}>
        <AboutFooter onClose={onClose} />
      </motion.div>
    </motion.div>
  );
};

export default AboutContent;
