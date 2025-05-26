
import React from 'react';
import { Check } from 'lucide-react';

const FeatureList: React.FC = () => {
  return (
    <div className="bg-maritime-navy/40 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
      <h2 className="text-2xl font-semibold mb-4 font-playfair">Designed for Life at Sea</h2>
      <ul className="space-y-4">
        <li className="flex items-start">
          <div className="min-w-6 mr-2 text-maritime-teal">
            <Check size={18} />
          </div>
          <span>Optimized for tablets and touchscreens</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-6 mr-2 text-maritime-teal">
            <Check size={18} />
          </div>
          <span>Works offline while at sea</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-6 mr-2 text-maritime-teal">
            <Check size={18} />
          </div>
          <span>Role-based access for your entire crew</span>
        </li>
        <li className="flex items-start">
          <div className="min-w-6 mr-2 text-maritime-teal">
            <Check size={18} />
          </div>
          <span>Smart inventory and meal planning</span>
        </li>
      </ul>
      
      <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex items-center px-3 py-2 bg-white/10 rounded-full">
          <span className="text-maritime-gold mr-2">⚓</span>
          <span>Captain</span>
        </div>
        <div className="flex items-center px-3 py-2 bg-white/10 rounded-full">
          <span className="text-maritime-gold mr-2">👨‍🍳</span>
          <span>Chef</span>
        </div>
        <div className="flex items-center px-3 py-2 bg-white/10 rounded-full">
          <span className="text-maritime-gold mr-2">📋</span>
          <span>Hostess</span>
        </div>
        <div className="flex items-center px-3 py-2 bg-white/10 rounded-full">
          <span className="text-maritime-gold mr-2">⚓</span>
          <span>Crew</span>
        </div>
      </div>
    </div>
  );
};

export default FeatureList;
