// controller/waitlist.js
import sheets from '../config/sheets.js';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const SHEETS = {
  USER: process.env.USER_SHEET_ID,
  AGENT: process.env.AGENT_SHEET_ID
};

// Add validation for sheet IDs
if (!SHEETS.USER || !SHEETS.AGENT) {
  logger.error('Missing sheet IDs in environment variables:', {
    USER_SHEET_ID: SHEETS.USER,
    AGENT_SHEET_ID: SHEETS.AGENT
  });
  throw new Error('Sheet IDs not properly configured');
}

const formatUserData = (data) => {
  const { fullName, mobile, email, satisfaction } = data;
  return [
    [
      new Date().toISOString(),
      fullName,
      `${mobile}`,
      email,
      satisfaction,
      'User Waitlist'
    ]
  ];
};

const formatAgentData = (data) => {
  const { fullName, company, mobile, email, satisfaction } = data;
  return [
    [
      new Date().toISOString(),
      fullName,
      company,
      `${mobile}`,
      email,
      satisfaction,
      'Agent Waitlist'
    ]
  ];
};

const appendToSheet = async (sheetId, range, values) => {
  try {
    logger.info('Attempting to append to sheet:', { sheetId, range });
    
    if (!sheetId) {
      throw new Error('Sheet ID is undefined');
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    logger.info('Successfully appended to sheet:', { 
      updatedRange: response.data.updates?.updatedRange,
      updatedRows: response.data.updates?.updatedRows
    });

    return response;
  } catch (error) {
    logger.error('Error appending to sheet:', {
      error: error.message,
      sheetId,
      range
    });
    throw error;
  }
};

export const addUserToWaitlist = async (req, res) => {
  try {
    logger.info('Received user waitlist submission:', {
      ...req.body,
      mobile: '***' // Hide sensitive data in logs
    });

    const values = formatUserData(req.body);
    await appendToSheet(SHEETS.USER, 'Sheet1!A:F', values);

    logger.info('User added to waitlist:', { email: req.body.email });
    
    res.status(200).json({ 
      success: true,
      message: 'Successfully added to user waitlist'
    });
  } catch (error) {
    logger.error('Failed to add user to waitlist:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to add to waitlist',
      details: error.message 
    });
  }
};

export const addAgentToWaitlist = async (req, res) => {
  try {
    logger.info('Received agent waitlist submission:', {
      ...req.body,
      mobile: '***' // Hide sensitive data in logs
    });

    const values = formatAgentData(req.body);
    await appendToSheet(SHEETS.AGENT, 'Sheet1!A:G', values);

    logger.info('Agent added to waitlist:', { email: req.body.email });
    
    res.status(200).json({ 
      success: true,
      message: 'Successfully added to agent waitlist'
    });
  } catch (error) {
    logger.error('Failed to add agent to waitlist:', {
      error: error.message,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      error: 'Failed to add to waitlist',
      details: error.message 
    });
  }
};