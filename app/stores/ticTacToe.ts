import { defineStore } from 'pinia'

export const useTicTacToeStore = defineStore('ticTacToe', {
  state: () => ({
    gamesPlayed: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
  }),
  actions: {
    recordGame(winner: string) {
      this.gamesPlayed++;
      if (winner === 'X') this.xWins++;
      else if (winner === 'O') this.oWins++;
      else this.draws++;
      localStorage.setItem('ticTacToeStats', JSON.stringify({
        gamesPlayed: this.gamesPlayed,
        xWins: this.xWins,
        oWins: this.oWins,
        draws: this.draws
      }));
    },
    loadStats() {
      const stats = localStorage.getItem('ticTacToeStats');
      if (stats) {
        const s = JSON.parse(stats);
        this.gamesPlayed = s.gamesPlayed || 0;
        this.xWins = s.xWins || 0;
        this.oWins = s.oWins || 0;
        this.draws = s.draws || 0;
      }
    }
  }
});
