import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProfile = async (token: string) => {
  const response = await api.get('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteUserAccount = async (token: string) => {
  const response = await api.delete('/api/user', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const chatWithSahayamStream = async (
  message: string,
  sessionId: string,
  token: string,
  isVoiceSession = false,
  onChunk: (text: string) => void
) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  
  const response = await fetch(`${backendUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message, session_id: sessionId, is_voice_session: isVoiceSession }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error('No readable stream');
  
  const decoder = new TextDecoder('utf-8');
  let done = false;
  let finalData: any = {};
  let buffer = '';

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    if (value) {
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last incomplete line in the buffer
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.substring(6).trim();
          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);
              if (data.chunk) {
                onChunk(data.chunk);
              }
              if (data.done) {
                finalData = data;
              }
            } catch (e) {
              console.error("Error parsing JSON chunk", e);
            }
          }
        }
      }
    }
  }

  return finalData;
};
export const resetSahayamChat = async (token: string) => {
  const response = await api.post(
    '/api/reset',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
export const updateDemographics = async (data: Record<string, unknown>, token: string) => {
  const response = await api.post(
    '/api/profile/demographics',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default api;
