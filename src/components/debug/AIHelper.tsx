import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState } from 'react';

// Initialize the Google Generative AI SDK with your API key
// You'll need to add your API key to your environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

interface AIHelperProps {
  initialPrompt?: string;
  contextDescription?: string;
  onSuggestionAccepted?: (suggestion: string) => void;
}

/**
 * AI Developer Helper component - Similar to Lovable 2.0's AI assistance
 * Provides code suggestions, documentation help and debugging assistance
 */
const AIHelper: React.FC<AIHelperProps> = ({
  initialPrompt = '',
  contextDescription = '',
  onSuggestionAccepted
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateAIResponse = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      // Add context to the prompt if available
      const fullPrompt = contextDescription 
        ? `Context: ${contextDescription}\n\nTask: ${prompt}`
        : prompt;
      
      // Generate content
      const result = await model.generateContent(fullPrompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('AI generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (onSuggestionAccepted && response) {
      onSuggestionAccepted(response);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3">AI Development Assistant</h3>
      
      <div className="mb-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          What do you need help with?
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maritime-teal focus:border-maritime-teal"
          rows={3}
          placeholder="E.g., Create a function to validate email addresses"
        />
      </div>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={generateAIResponse}
          disabled={isLoading || !prompt.trim()}
          className="px-4 py-2 bg-maritime-teal text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Suggestion'}
        </button>
        
        {response && (
          <button
            onClick={handleAcceptSuggestion}
            className="px-4 py-2 border border-maritime-teal text-maritime-teal rounded-md"
          >
            Accept Suggestion
          </button>
        )}
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">AI Suggestion:</h4>
          <pre className="bg-gray-50 p-3 rounded-md overflow-auto text-sm">
            {response}
          </pre>
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-500">
        Powered by Google Gemini AI • Similar to Lovable 2.0's AI coding assistant
      </div>
    </div>
  );
};

export default AIHelper;