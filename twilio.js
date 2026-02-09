/*
Twilio – Cloud Communication Platform (JavaScript Learning File)

What is Twilio?
- Twilio is a cloud-based communication service.
- It allows applications to make phone calls, send SMS, WhatsApp messages, etc.
- Our server communicates with Twilio using REST APIs.
- Twilio internally connects with the telecom network to reach the destination user.

How communication works:
- Our server sends requests to Twilio (REST API).
- Twilio connects with the telecom network.
- For calls and incoming events, Twilio sends HTTP webhooks to our server.

Three pillars of Twilio:
1) REST API
   - Used when our server wants to initiate an action.
   - Example: make a call, send an SMS.

2) TwiML (Twilio Markup Language)
   - XML-based instruction language.
   - Used mainly during calls to tell Twilio what to do (speak, gather input, record, etc.).

3) Webhooks
   - Event-based HTTP requests sent by Twilio to our server.
   - Used for incoming calls, SMS, call status updates, etc.
   - Webhooks are NOT persistent connections; each event triggers a separate HTTP request.
*/

import twilio from "twilio";

/*
Create Twilio client

- Account SID identifies the Twilio account.
- Auth Token authenticates requests.
- These credentials must be stored in environment variables for security.
*/

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/*
SECTION 1: MAKING A PHONE CALL USING TWILIO

Concept:
- Our server initiates a call using Twilio REST API.
- When the call is answered, Twilio sends a webhook request
  to the provided URL asking for call instructions.
*/

async function makeCall() {
  await client.calls.create({
    to: "+91XXXXXXXXXX",                   // Destination phone number
    from: process.env.TWILIO_PHONE_NUMBER, // Twilio-owned phone number
    url: "https://yourdomain.com/voice"    // Webhook URL for TwiML instructions
  });
}

/*
Call Webhook Handler (TwiML Response)

- This endpoint is called by Twilio during the call.
- The response must be valid XML (TwiML).
- Twilio reads the XML and executes the instructions.
*/

function handleVoiceCall(req, res) {
  res.type("text/xml"); // Set response type to XML as required by Twilio

  res.send(`
    <Response>
      <Say voice="alice">
        Hello Ohm, this call is generated using Twilio.
      </Say>
    </Response>
  `);
}

/*
Explanation:
- <Response> is the root element required by Twilio.
- <Say> converts text to speech and plays it to the caller.
- voice="alice" selects a natural-sounding voice.
- After instructions finish, the call automatically ends.
*/

/*
SECTION 2: SENDING SMS USING TWILIO

Concept:
- SMS is a pure REST API operation.
- No TwiML is required for sending SMS.
- Our server directly requests Twilio to send the message.
*/

async function sendSMS() {
  await client.messages.create({
    body: "Hello Ohm, this message is sent using Twilio SMS.",
    from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
    to: "+91XXXXXXXXXX"                    // Receiver phone number
  });
}

/*
Key Differences Between Calls and SMS:
- Calls use REST API + Webhooks + TwiML.
- SMS uses only REST API.
- Calls require XML responses.
- SMS does not require XML or TwiML.
*/

/*
Common TwiML verbs used in calls:
- <Say>      : Convert text to speech
- <Play>     : Play an audio file
- <Gather>   : Collect keypad or speech input
- <Record>   : Record caller audio
- <Dial>     : Connect calls
- <Message>  : Send SMS using TwiML
- <Redirect> : Redirect call flow to another URL
*/
