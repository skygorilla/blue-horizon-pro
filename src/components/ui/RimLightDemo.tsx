import React, { useState } from 'react';
import RimLight from '../ui/RimLight';

/**
 * A demonstration component showcasing the RimLight effect
 * with various configuration options
 */
const RimLightDemo: React.FC = () => {
  const [active, setActive] = useState(true);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [color, setColor] = useState('#00ffff');
  const [intensity, setIntensity] = useState(1);
  const [borderRadius, setBorderRadius] = useState(8);
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">RimLight Effect Demo</h2>
      
      <div className="flex flex-wrap gap-8">
        {/* Demo Cards */}
        <div className="flex-1 min-w-[280px]">
          <div className="flex flex-col gap-6">
            {/* Card with RimLight */}
            <div className="relative bg-slate-800 p-6 rounded-lg shadow-lg">
              <RimLight 
                active={active}
                color={color}
                glowIntensity={intensity}
                borderRadius={borderRadius}
                pulseEffect={pulseEffect}
              />
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">Futuristic Card</h3>
              <p className="text-slate-300">
                This card has a RimLight effect applied to it. The rimlight creates a 1px border
                that slowly rotates around the card, giving it a futuristic appearance.
              </p>
            </div>
            
            {/* Button with RimLight */}
            <button 
              className="relative bg-blue-900 text-cyan-100 py-3 px-6 rounded-md font-medium"
              onClick={() => setActive(!active)}
            >
              <RimLight 
                active={active}
                color={color}
                glowIntensity={intensity * 1.5}
                borderRadius={4}
                pulseEffect={pulseEffect}
              />
              Toggle RimLight Effect
            </button>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex-1 min-w-[280px] bg-slate-900 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Controls</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-8 w-12 bg-transparent"
                />
                <input 
                  type="text" 
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1 rounded"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Glow Intensity: {intensity.toFixed(1)}
              </label>
              <input 
                type="range" 
                min="0.1" 
                max="3" 
                step="0.1"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Border Radius: {borderRadius}px
              </label>
              <input 
                type="range" 
                min="0" 
                max="24" 
                step="1"
                value={borderRadius}
                onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-300">Pulse Effect</label>
              <input 
                type="checkbox" 
                checked={pulseEffect}
                onChange={(e) => setPulseEffect(e.target.checked)}
                className="w-4 h-4"
              />
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Usage Example:</h4>
            <pre className="bg-slate-800 p-3 rounded text-xs text-cyan-200 overflow-x-auto">
              {`<div className="relative ...">
  <RimLight 
    color="${color}"
    glowIntensity={${intensity}}
    borderRadius={${borderRadius}}
    pulseEffect={${pulseEffect}}
  />
  Your content here
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RimLightDemo;