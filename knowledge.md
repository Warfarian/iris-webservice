# Iris Webservice

Emergency alert system using Twilio for SMS messaging.

## Key Components

- Express.js server with security middleware (helmet, rate limiting)
- Twilio integration for SMS
- API token authentication
- Request validation
- Error handling and logging

## Environment Variables

Required environment variables in `.env`:
- PORT: Server port (default 3000)
- TWILIO_ACCOUNT_SID: Your Twilio Account SID
- TWILIO_AUTH_TOKEN: Your Twilio Auth Token  
- TWILIO_PHONE_NUMBER: Your Twilio phone number
- ALERT_TOKEN: Secret token for API authentication

## API Endpoints

### POST /alerts
Send emergency SMS alerts.

Headers:
- x-auth-token: API authentication token

Body:
```json
{
  "phone": "+15551234567",
  "message": "Emergency alert message"
}
```

## Development

Start development server:
```bash
npm run dev
```

Start production server:
```bash
npm start
```

## Security Notes

- Never commit .env file
- Rotate ALERT_TOKEN regularly
- Monitor Twilio logs for usage
- Rate limiting helps prevent abuse
