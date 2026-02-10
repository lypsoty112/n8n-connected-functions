# n8n-connected-functions
Personal repository that connects N8N (running on private server) to more complex flows like researching or classification.

## API key (optional)

Set `API_KEY` in the environment to require authentication on all routes. If unset, requests are not checked.

Clients can send the key via either header:

- `x-api-key: <key>`
- `Authorization: Bearer <key>`
