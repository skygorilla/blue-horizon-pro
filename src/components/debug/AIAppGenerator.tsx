import { askGemini } from '@/lib/gemini';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GenerationResult {
  status: 'idle' | 'generating' | 'success' | 'error';
  files: Array<{
    path: string;
    content: string;
    type: 'created' | 'modified';
  }>;
  message?: string;
  error?: string;
}

/**
 * AIAppGenerator - Advanced component generator that creates entire features from text descriptions
 * This provides functionality similar to Lovable 2.0's complete app generation capability
 */
const AIAppGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [generationType, setGenerationType] = useState<'component' | 'page' | 'feature'>('component');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<GenerationResult>({
    status: 'idle',
    files: []
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const generateComponent = async () => {
    if (!description.trim()) return;
    
    setResult({
      status: 'generating',
      files: []
    });

    try {
      // Step 1: Generate a plan for the component/feature
      const planPrompt = `
Create a detailed plan for ${generationType === 'feature' ? 'implementing a full feature' : 
                            generationType === 'page' ? 'creating a complete page' : 
                            'building a React component'} based on this description:
"${description}"

The code should follow these standards:
- TypeScript with strong typing
- React functional components with hooks
- Tailwind CSS for styling
- Proper error handling and loading states
- Clean code practices and comments

Location for this ${generationType}: ${location || 'to be determined'}

Return a JSON object with:
1. A list of files to create/modify
2. Brief description of each file's purpose
3. Dependencies needed
`;

      const planResponse = await askGemini(planPrompt);
      
      // Parse the plan (assuming it returns JSON)
      let plan;
      try {
        // Extract JSON if it's wrapped in code blocks
        const jsonContent = planResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                           planResponse.match(/\{[\s\S]*\}/);
        
        const jsonStr = jsonContent ? jsonContent[1] || jsonContent[0] : planResponse;
        plan = JSON.parse(jsonStr);
      } catch (error) {
        console.error("Failed to parse plan JSON:", error);
        throw new Error("Could not parse the generation plan");
      }

      // Step 2: Generate each file based on the plan
      const generatedFiles = [];
      
      for (const file of plan.files || []) {
        const filePrompt = `
Generate the complete code for ${file.path || 'the requested file'} as part of the ${generationType} described as: "${description}".

File purpose: ${file.description || 'Not specified'}
Dependencies: ${plan.dependencies?.join(', ') || 'Standard project dependencies'}
Styling: Use Tailwind CSS classes

Return ONLY the complete code file with proper TypeScript types, imports, and implementation.
`;

        const fileContent = await askGemini(filePrompt);
        // Clean the response to get just the code
        const cleanedContent = fileContent.replace(/```tsx?|```javascript|```jsx|```\s*$/g, '').trim();
        
        generatedFiles.push({
          path: file.path,
          content: cleanedContent,
          type: 'created'
        });
      }

      setResult({
        status: 'success',
        files: generatedFiles,
        message: `Successfully generated ${generatedFiles.length} files for your ${generationType}.`
      });
      
    } catch (error) {
      console.error("Generation error:", error);
      setResult({
        status: 'error',
        files: [],
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  const applyChanges = async () => {
    if (result.status !== 'success') return;
    
    try {
      // For each file, make an API call to create/modify it
      for (const file of result.files) {
        await fetch('/api/edit-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filePath: file.path,
            content: file.content
          })
        });
      }
      
      // After successful application, redirect to the first file
      if (result.files.length > 0) {
        // You could implement a more sophisticated redirection based on file type
        const firstFile = result.files[0].path;
        // Optional: Navigate to the new component in your app
        // navigate(`/editor?file=${encodeURIComponent(firstFile)}`);
        
        // Reset the form and show success message
        setDescription('');
        setResult({
          status: 'idle',
          files: [],
          message: 'Changes applied successfully! Files have been created/modified.'
        });
      }
    } catch (error) {
      console.error("Failed to apply changes:", error);
      setResult({
        ...result,
        error: error instanceof Error ? error.message : 'Failed to apply the generated code'
      });
    }
  };

  const togglePreview = () => {
    setPreviewOpen(!previewOpen);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-maritime-teal">AI-Powered App Generator</h1>
      <p className="mb-6 text-gray-600">
        Describe what you want to build and let AI generate the code for you. Similar to Lovable 2.0's
        complete app generation feature.
      </p>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What do you want to create?
        </label>
        <select
          value={generationType}
          onChange={(e) => setGenerationType(e.target.value as 'component' | 'page' | 'feature')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maritime-teal focus:border-maritime-teal"
        >
          <option value="component">UI Component</option>
          <option value="page">Complete Page</option>
          <option value="feature">Full Feature (Multiple Files)</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Where should it be created? (folder path)
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., src/components/myFeature"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maritime-teal focus:border-maritime-teal"
        />
        <p className="mt-1 text-xs text-gray-500">
          Leave blank for a suggestion based on project structure
        </p>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe what you want to create in detail
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          placeholder="E.g., Create a meal planner component that allows users to drag and drop recipes into a weekly calendar view, showing nutritional totals and costs. Include a filter for dietary restrictions."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-maritime-teal focus:border-maritime-teal"
        />
      </div>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={generateComponent}
          disabled={!description.trim() || result.status === 'generating'}
          className="px-4 py-2 bg-maritime-teal text-white rounded-md disabled:opacity-50 hover:bg-opacity-90 transition-all"
        >
          {result.status === 'generating' ? 'Generating...' : 'Generate Code'}
        </button>
        
        {result.status === 'success' && (
          <button
            onClick={applyChanges}
            className="px-4 py-2 border border-maritime-teal text-maritime-teal rounded-md hover:bg-maritime-teal hover:text-white transition-all"
          >
            Apply Changes
          </button>
        )}
        
        {result.status === 'success' && (
          <button
            onClick={togglePreview}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-all"
          >
            {previewOpen ? 'Hide Preview' : 'Show Preview'}
          </button>
        )}
      </div>
      
      {/* Status messages */}
      {result.message && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
          {result.message}
        </div>
      )}
      
      {result.error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {result.error}
        </div>
      )}
      
      {/* Preview panel */}
      {result.status === 'success' && previewOpen && (
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 border-b flex justify-between items-center">
            <h3 className="font-medium">Generated Files</h3>
            <span className="text-sm text-gray-500">{result.files.length} file(s)</span>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {result.files.map((file, index) => (
              <div key={index} className="border-b last:border-b-0">
                <div className="bg-gray-50 p-2 border-b font-mono text-sm">
                  {file.path} <span className="ml-2 text-xs text-blue-500">{file.type}</span>
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  {file.content}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAppGenerator;