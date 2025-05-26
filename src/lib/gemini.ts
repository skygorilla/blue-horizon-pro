// Ask Gemini via backend
export const askGemini = async (prompt: string): Promise<string> => {
  const response = await fetch('/api/gemini/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const raw = await response.text();
  console.log('askGemini raw response:', raw);
  // Define expected response shape
  type AskResponse = { text?: string; error?: string };
  let data: AskResponse;
  try {
    data = JSON.parse(raw) as AskResponse;
  } catch {
    throw new Error('Invalid JSON from ask endpoint: ' + raw);
  }
  if (!response.ok) {
    throw new Error(data.error ?? raw);
  }
  return data.text ?? '';
};

// Operate via Gemini through backend
export const operateGemini = async (prompt: string): Promise<string> => {
  console.log('Sending payload to /api/gemini/operate:', JSON.stringify({ prompt })); // Log the request payload
  const response = await fetch('/api/gemini/operate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const raw = await response.text();
  console.log('operateGemini raw response:', raw);
  // Define expected response shape
  type OperateResponse = { message?: string; error?: string };
  let data: OperateResponse;
  try {
    data = JSON.parse(raw) as OperateResponse;
  } catch (parseError) { // Catch parsing error specifically
    console.error('Error parsing JSON from operate endpoint:', parseError);
    // Throw a more informative error, including the raw response
    throw new Error(`Invalid JSON from operate endpoint: ${raw}`);
  }
  if (!response.ok) {
    throw new Error(data.error ?? raw);
  }
  return data.message ?? '';
};