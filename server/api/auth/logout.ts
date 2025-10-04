import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler((event) => {
  // Remove cookies by setting them to expire in the past
  setCookie(event, 'bnet_user', '', { path: '/', maxAge: 0 });
  setCookie(event, 'bnet_token', '', { path: '/', maxAge: 0 });
  // Optionally, remove the oauth state cookie
  setCookie(event, 'bnet_oauth_state', '', { path: '/', maxAge: 0 });
  // Redirect to logging-out page
  return event.node.res.writeHead(302, { Location: '/logging-out' }).end();
});
