import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FuturisticLoginFormProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSubmit: (username: string, password: string) => void;
  loading: boolean;
  error: string;
  title?: string;
  rememberMe: boolean;
  onRememberMeChange: (value: boolean) => void;
}

const FuturisticLoginForm: React.FC<FuturisticLoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  loading,
  error,
  title = "Founder Access Portal",
  rememberMe,
  onRememberMeChange
}) => {
  const [hexagons, setHexagons] = useState<{x: number, y: number, delay: number, size: number}[]>([]);
  
  // Create hexagon grid background
  useEffect(() => {
    const newHexagons = [];
    for (let i = 0; i < 50; i++) {
      newHexagons.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        size: 30 + Math.random() * 50
      });
    }
    setHexagons(newHexagons);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(username, password);
  };

  return (
    <div className="founder-login-container min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-[#000000] to-[#0a0a0a]">
      {/* Animated Hexagonal Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {hexagons.map((hex, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${hex.x}%`,
              top: `${hex.y}%`,
              width: `${hex.size}px`,
              height: `${hex.size}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              delay: hex.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(45deg, rgba(0,150,255,0.1), rgba(0,255,240,0.3))",
                border: "1px solid rgba(0,200,255,0.15)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 bg-[rgba(0,20,40,0.7)] backdrop-blur-md p-8 rounded-lg border border-[rgba(0,180,255,0.2)] shadow-[0_0_30px_rgba(0,150,255,0.15)] max-w-md w-full"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-bold text-2xl text-gradient bg-gradient-to-r from-[#00abff] to-[#00ffe1] bg-clip-text text-transparent mb-1">
              {title}
            </div>
            <div className="text-[#00b8d4] text-sm font-medium mb-4">
              Exclusive Access for Founders
            </div>
          </motion.div>

          {/* Restricted Access Warning */}
          <div className="mb-6 text-amber-400 text-xs py-2 px-3 bg-amber-950/30 border border-amber-800/40 rounded">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 inline-block mr-1 mb-0.5" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            This is a restricted administrative area for founders only.
          </div>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-5">
            <div>
              <div className="text-xs text-[#00ccff] mb-1.5 font-medium ml-1">Founder ID</div>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-[rgba(0,30,60,0.4)] border border-[rgba(0,150,255,0.2)] text-[#e0f7ff] placeholder-[#4299bf] focus:outline-none focus:ring-1 focus:ring-[#00a0e4] transition-all duration-200"
                  placeholder="Enter your founder ID"
                  required
                />
                <div className="absolute inset-0 rounded pointer-events-none border border-[rgba(0,150,255,0.1)] shadow-[0_0_10px_rgba(0,150,255,0.05)]"></div>
              </div>
            </div>
            
            <div>
              <div className="text-xs text-[#00ccff] mb-1.5 font-medium ml-1">Access Code</div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded bg-[rgba(0,30,60,0.4)] border border-[rgba(0,150,255,0.2)] text-[#e0f7ff] placeholder-[#4299bf] focus:outline-none focus:ring-1 focus:ring-[#00a0e4] transition-all duration-200"
                  placeholder="Enter your access code"
                  required
                />
                <div className="absolute inset-0 rounded pointer-events-none border border-[rgba(0,150,255,0.1)] shadow-[0_0_10px_rgba(0,150,255,0.05)]"></div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => onRememberMeChange(e.target.checked)}
                className="w-4 h-4 text-[#0084ff] bg-[rgba(0,30,60,0.4)] border-[rgba(0,150,255,0.3)] rounded focus:ring-[#00a0e4] focus:ring-1"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-[#9ccfee]">
                Remember this device for 7 days
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 bg-red-900/20 border border-red-800/30 text-sm p-3 rounded"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded bg-gradient-to-r from-[#0070d8] to-[#00b8d4] text-white font-medium relative overflow-hidden ${
                loading ? 'opacity-80' : 'hover:shadow-[0_0_15px_rgba(0,180,255,0.5)]'
              } transition-all duration-200`}
            >
              <div className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Access Dashboard
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,180,255,0.2)] to-[rgba(0,240,255,0.2)] opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-[#5a8bab]">
          <p>Blue Horizon Founder Portal • {new Date().getFullYear()}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default FuturisticLoginForm;