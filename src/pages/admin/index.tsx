import { useState, useEffect, useRef } from 'react';
import { operateGemini } from '@/lib/gemini';
import { Mic } from 'lucide-react';
// Import components directly from the package
import * as React from "react";

// Declare global SpeechRecognition constructors on window
declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognition; prototype: SpeechRecognition };
    webkitSpeechRecognition?: { new (): SpeechRecognition; prototype: SpeechRecognition };
  }
  
  // Add SpeechRecognition interface
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
  
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }
}

// Get the SpeechRecognition constructor from window without using `any`
const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
// Use the constructor if available
const recognition = SpeechRecognitionCtor ? new SpeechRecognitionCtor() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

export default function AdminPanel() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('Welcome to the Gemini Admin Panel! Use the prompt to modify the dashboard.');
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(recognition);

  useEffect(() => {
    console.log('AdminPanel component rendered');
    const currentRecognition = recognitionRef.current;

    if (!currentRecognition) {
      console.warn('Speech Recognition API not supported in this browser.');
      return;
    }

    currentRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      setIsListening(false);
    };

    currentRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    currentRecognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (currentRecognition && isListening) {
        currentRecognition.stop();
      }
    };
  }, [isListening]);

  const handleRun = async () => {
    setError(null);
    setResponse('Processing...');
    try {
      const result = await operateGemini(prompt);
      setResponse(result);
    } catch (error: unknown) {
      console.error('Gemini operation error:', error);
      const message = error instanceof Error ? error.message : String(error);
      setError(message || 'An error occurred while processing your request. Please try again.');
      setResponse('');
    }
  };

  const handleVoiceInput = () => {
    const currentRecognition = recognitionRef.current;
    if (!currentRecognition) {
      setError('Speech Recognition API not supported in this browser.');
      return;
    }

    if (isListening) {
      currentRecognition.stop();
      setIsListening(false);
    } else {
      setPrompt('');
      setError(null);
      try {
        currentRecognition.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error starting speech recognition:", err);
        setError("Could not start voice recognition. Please try again.");
        setIsListening(false);
      }
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-black text-white">
      <h1 className="text-2xl font-playfair font-bold mb-4">🧠 Gemini Admin Panel</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Simple AI command interface</p>
        <a 
          href="/admin/dashboard"
          className="px-4 py-2 text-sm border rounded bg-background hover:bg-gray-50 text-gray-700"
        >
          Open Full Admin Dashboard
        </a>
      </div>
      
      <div className="relative w-full mb-4">
        <textarea
          className="w-full h-32 border p-4 rounded pr-12"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini to modify the site..."
        />
        {recognition && (
          <button
            onClick={handleVoiceInput}
            className={`absolute right-3 top-3 p-2 rounded-full ${
              isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-200 hover:bg-gray-300'
            } text-gray-600`}
            title={isListening ? "Stop Listening" : "Start Voice Input"}
          >
            <Mic size={18} />
          </button>
        )}
      </div>
      <button
        onClick={handleRun}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={!prompt || isListening}
      >
        Run Gemini Operator
      </button>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mt-6 p-4 bg-gray-100 rounded whitespace-pre-wrap min-h-[50px]">
        {response}
      </div>
    </div>
  );
}