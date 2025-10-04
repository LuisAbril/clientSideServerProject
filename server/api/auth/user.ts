import { defineEventHandler, getCookie } from 'h3';

export default defineEventHandler((event) => {
  const user = getCookie(event, 'bnet_user');
  if (!user) return { loggedIn: false };
  try {
    return { loggedIn: true, user: JSON.parse(user) };
  } catch {
    return { loggedIn: false };
  }
});
