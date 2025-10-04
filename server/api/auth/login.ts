import { defineEventHandler } from 'h3';

// TODO: Replace with your real credentials
const CLIENT_ID = process.env.BNET_CLIENT_ID || 'YOUR_CLIENT_ID';
const REDIRECT_URI = process.env.BNET_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
const REGION = 'eu'; // or 'us', 'kr', 'tw', 'cn'

export default defineEventHandler((event) => {
  // Generate a random state for CSRF protection
  const state = Math.random().toString(36).substring(2) + Date.now().toString(36);
  // Optionally, store the state in a cookie or session for later verification
  event.node.res.setHeader('Set-Cookie', `bnet_oauth_state=${state}; Path=/; HttpOnly`);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    // Request additional scopes for WoW and Diablo 3 profiles
    scope: 'openid wow.profile d3.profile',
    state,
  });
  const authUrl = `https://${REGION}.battle.net/oauth/authorize?${params.toString()}`;
  return event.node.res.writeHead(302, { Location: authUrl }).end();
});
