import { defineEventHandler, getCookie } from 'h3';
import axios from 'axios';

const REGION = 'eu';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'bnet_token');
  if (!token) return { error: 'Not authenticated' };

  const results: any = {
    games: [],
    wow: null,
    diablo: null,
  };
  // Check WoW profile
  try {
    const wowRes = await axios.get(`https://${REGION}.api.blizzard.com/profile/user/wow`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { namespace: 'profile-eu', locale: 'en_US' },
    });
    if (wowRes.data && wowRes.data.wow_accounts && wowRes.data.wow_accounts.length > 0) {
      results.games.push('World of Warcraft');
      results.wow = wowRes.data.wow_accounts.map((acc: any) => ({
        characters: acc.characters.map((c: any) => ({
          name: c.name,
          level: c.level,
          realm: c.realm.name,
          playable_class: c.playable_class.name,
        }))
      }));
    }
  } catch {}

  // Check Diablo 3 profile
  try {
    const d3Res = await axios.get(`https://${REGION}.api.blizzard.com/d3/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { locale: 'en_US' },
    });
    if (d3Res.data && d3Res.data.battleTag) {
      results.games.push('Diablo 3');
      results.diablo = {
        battleTag: d3Res.data.battleTag,
        paragonLevel: d3Res.data.paragonLevel,
        heroes: d3Res.data.heroes?.map((h: any) => ({
          name: h.name,
          class: h.class,
          level: h.level,
        })) || [],
      };
    }
  } catch {}

  if (results.games.length === 0) {
    return { games: [], message: 'No Blizzard games found for this account.' };
  }
  return results;
});