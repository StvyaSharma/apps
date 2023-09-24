import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // Find the absolute path of the JSON directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    
    // Read the JSON data file data.json
    const filePath = path.join(jsonDirectory, 'data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');

    // Parse the JSON content
    const jsonData = JSON.parse(fileContents);

    // Return the JSON data in the response
    res.status(200).json(jsonData);
  } catch (error) {
    // Handle errors, e.g., file not found or JSON parsing error
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
