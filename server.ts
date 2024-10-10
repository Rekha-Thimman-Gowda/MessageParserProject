// src/server.ts

import express, { Request, Response } from 'express';
import { parseMessage, ExtractedData, ErrorResponse } from './parser';

const app = express();
app.use(express.json());
const PORT = 3000;

// Mock database interaction
const mockDatabase: ExtractedData[] = [];

// API Endpoint
app.post('/process-message', (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' } as ErrorResponse);
  }

  const result = parseMessage(message);
  if ('error' in result) {
    return res.status(400).json(result);
  }

  // Simulate storing the result in a mock database
  mockDatabase.push(result as ExtractedData);
  return res.status(200).json(result);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
