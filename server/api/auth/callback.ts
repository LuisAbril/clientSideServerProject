import { defineEventHandler, readBody, setCookie, getCookie } from 'h3';
import axios from 'axios';

const CLIENT_ID = process.env.BNET_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = process.env.BNET_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = process.env.BNET_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';
const REGION = 'eu'; // or 'us', 'kr', 'tw', 'cn'


export default defineEventHandler(async (event) => {
  const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host}`);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = getCookie(event, 'bnet_oauth_state');
  if (!code) {
    return { error: 'No code provided' };
  }
  if (!state || !cookieState || state !== cookieState) {
    return { error: 'Invalid or missing state parameter' };
  }

  // Exchange code for access token
  const tokenRes = await axios.post(
    `https://${REGION}.battle.net/oauth/token`,
    new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
    {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  const { access_token } = tokenRes.data;
  if (!access_token) {
    return { error: 'No access token received' };
  }

  // Get user info
  const userRes = await axios.get(`https://${REGION}.battle.net/oauth/userinfo`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });


  // Store user info and access_token in cookies (for demo)
  setCookie(event, 'bnet_user', JSON.stringify(userRes.data), {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  setCookie(event, 'bnet_token', access_token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  // Redirect directly to homepage
  return event.node.res.writeHead(302, { Location: '/' }).end();
});
