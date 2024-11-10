// tests/test-connection.js
import sheets from '../config/sheets.js';
import dotenv from 'dotenv';

dotenv.config();

const testSheetAccess = async () => {
  try {
    // Test User Waitlist Sheet
    console.log('\nTesting User Waitlist Sheet...');
    const userTest = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.USER_SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[
          new Date().toISOString(),
          'Test User',
          '1234567890',
          'test@example.com',
          5,
          'TEST - Delete This Row'
        ]]
      }
    });
    console.log('✅ Successfully wrote to User Waitlist sheet');

    // Test Agent Waitlist Sheet
    console.log('\nTesting Agent Waitlist Sheet...');
    const agentTest = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.AGENT_SHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[
          new Date().toISOString(),
          'Test Agent',
          'Test Company',
          '1234567890',
          'test@example.com',
          5,
          'TEST - Delete This Row'
        ]]
      }
    });
    console.log('✅ Successfully wrote to Agent Waitlist sheet');

    console.log('\n🎉 All tests passed! Your sheets integration is working correctly!');
  } catch (error) {
    console.error('\n❌ Error testing sheet connection:', error.message);
    
    if (error.message.includes('permission')) {
      console.error('\nTroubleshooting steps:');
      console.error('1. Share both sheets with:', 'citu-early-access@citu-early-access.iam.gserviceaccount.com');
      console.error('2. Give Editor access when sharing');
      console.error('3. Verify your credentials.json file is properly formatted');
      console.error('4. Double-check the sheet IDs in your .env file');
    }
    
    process.exit(1);
  }
};

testSheetAccess();