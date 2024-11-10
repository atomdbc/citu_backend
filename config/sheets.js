import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

let sheets;

try {
  if (!process.env.GOOGLE_CREDENTIALS) {
    throw new Error('GOOGLE_CREDENTIALS environment variable is not set');
  }

  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString()
  );

  // Create auth client directly from credentials object
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  // Initialize sheets API
  sheets = google.sheets({ version: 'v4', auth });

} catch (error) {
  console.error('Error initializing Google Sheets:', error);
  throw new Error('Failed to initialize Google Sheets client: ' + error.message);
}

export default sheets;