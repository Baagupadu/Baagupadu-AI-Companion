import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chatWithSahayamStream } from '@/lib/api';

describe('chatWithSahayamStream SSE Client', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should stream chunks incrementally and assemble final response', async () => {
    const mockSSEData = [
      'data: {"chunk": "Hello "}\n\n',
      'data: {"chunk": "student, "}\n\n',
      'data: {"chunk": "how can I support you?", "done": true}\n\n',
    ].join('');

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(mockSSEData));
        controller.close();
      },
    });

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      body: stream,
    });

    const receivedChunks: string[] = [];
    const onChunk = (chunk: string) => {
      receivedChunks.push(chunk);
    };

    const finalResult = await chatWithSahayamStream(
      'Hi Sahayam',
      'session-123',
      'test-token',
      false,
      onChunk
    );

    expect(receivedChunks).toEqual(['Hello ', 'student, ', 'how can I support you?']);
    expect(finalResult.done).toBe(true);
  });

  it('should throw an error when backend returns non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(
      chatWithSahayamStream('Hi', 'session-1', 'token', false, () => {})
    ).rejects.toThrow('Network response was not ok');
  });
});
