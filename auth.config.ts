import NuxtAuthHandler from '@sidebase/nuxt-auth/handler';
import BattleNetProvider from '@sidebase/nuxt-auth/providers/battlenet';

export default NuxtAuthHandler({
  providers: [
    BattleNetProvider({
      clientId: process.env.BNET_CLIENT_ID!,
      clientSecret: process.env.BNET_CLIENT_SECRET!,
      region: 'eu', // Cambia a 'us' o 'kr' si tu cuenta es de otra región
    })
  ],
  secret: process.env.AUTH_SECRET,
});
