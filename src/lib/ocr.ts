import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient({
  credentials: { private_key: import.meta.env.VITE_GOOGLE_CLOUD_VISION_API_KEY }
});

export async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    return detections?.[0]?.description || '';
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error('Failed to extract text from image');
  }
}