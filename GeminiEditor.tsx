import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import MarkdownIt from 'markdown-it';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
const md = new MarkdownIt();

export default function GeminiEditor() {
  const [prompt, setPrompt] = useState('');
  const [outputHtml, setOutputHtml] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOutputHtml('<p>Thinking…</p>');
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setOutputHtml(md.render(text));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setOutputHtml(`<p style="color:red">Error: ${message}</p>`);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={4}
          placeholder={`Give me instructions (e.g. "Rewrite the About section to emphasize crew efficiency")`}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Run Gemini
        </button>
      </form>
      <div
        className="mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: outputHtml }}
      />
    </div>
  );
}