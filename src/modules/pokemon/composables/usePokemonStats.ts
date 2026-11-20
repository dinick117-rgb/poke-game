
import { ref } from 'vue';

export const usePokemonStats = () => {

  // Contadores
  const gamesPlayed = ref(0);
  const gamesWon = ref(0);

  // Registrar una partida terminada
  const registerGame = (won: boolean) => {
    gamesPlayed.value++;

    if (won) {
      gamesWon.value++;
    }
  };

  return {
    gamesPlayed,
    gamesWon,
    registerGame
  };
};
