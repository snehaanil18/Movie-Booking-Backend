import twilio from 'twilio'

const accountSid = process.env.acct_sid; 
const authToken = process.env.auth_token;

// Initialize Twilio client
const client = new twilio(accountSid, authToken);