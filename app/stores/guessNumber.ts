import { defineStore } from 'pinia'

export const useGuessNumberStore = defineStore('guessNumber', {
  state: () => ({
    highScore: null as number | null,
    stats: {
      gamesPlayed: 0,
      totalAttempts: 0,
      bestGame: null as number | null,
      lastAttempts: 0,
      difficulty: 'normal',
    },
  }),
  actions: {
    setHighScore(score: number) {
      if (this.highScore === null || score < this.highScore) {
        this.highScore = score;
        localStorage.setItem('guessNumberHighScore', String(score));
      }
    },
    loadHighScore() {
      const score = localStorage.getItem('guessNumberHighScore');
      if (score) this.highScore = Number(score);
    },
    recordGame(attempts: number) {
      this.stats.gamesPlayed++;
      this.stats.totalAttempts += attempts;
      this.stats.lastAttempts = attempts;
      if (this.stats.bestGame === null || attempts < this.stats.bestGame) {
        this.stats.bestGame = attempts;
      }
      localStorage.setItem('guessNumberStats', JSON.stringify(this.stats));
    },
    loadStats() {
      const stats = localStorage.getItem('guessNumberStats');
      if (stats) this.stats = JSON.parse(stats);
    },
    setDifficulty(level: string) {
      this.stats.difficulty = level;
      localStorage.setItem('guessNumberStats', JSON.stringify(this.stats));
    }
  }
});
