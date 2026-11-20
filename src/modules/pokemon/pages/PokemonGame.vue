
<template>
  <section
    v-if="isLoading || !randomPokemon"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">¡Espera por favor!</h1>
    <h3 class="animate-pulse">Cargando Pokémons...</h3>
  </section>

  <section
    v-else
    class="game-container"
  >
    <!-- Título -->
    <h1 class="game-title">
      ¿Quién es este Pokémon?
    </h1>

    
  <!-- Estadísticas -->
<div class="stats-container">

  <div class="stat-card">
    <span class="stat-number">{{ gamesPlayed }}</span>
    <span class="stat-label">Jugadas</span>
  </div>

  <div class="stat-card">
    <span class="stat-number">{{ gamesWon }}</span>
    <span class="stat-label">Ganadas</span>
  </div>

</div>

    <!-- Estado del juego -->
    <h2 v-if="gameStatus === 'won'">
      ¡Correcto! 
    </h2>

    <h2 v-else-if="gameStatus === 'lost'">
      ¡Respuesta incorrecta! 
    </h2>

    <!-- Imagen del Pokémon -->
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus != GameStatus.Playing"
    />

    <!-- Opciones -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus != GameStatus.Playing"
      :correct-answer="randomPokemon.id"
      :selected-answer="selectedAnswer"
      @selected-option="checkAnswer"
    />

    <!-- Botón para volver a jugar -->
    <button
      v-if="gameStatus != GameStatus.Playing"
      @click="getNextRound(4)"
      class="play-again"
    >
      Volver a jugar
    </button>

  </section>

</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';

import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus } from '../interfaces/game-status-enum.ts';

const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  selectedAnswer,
  gamesPlayed,
  gamesWon,
  checkAnswer,
  getNextRound
} = usePokemonGame();
</script>

<style scoped>



.game-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  overflow-x: hidden;
}


.game-title {
  width: 100%;
  font-family: 'Trebuchet MS', sans-serif;
  font-size: clamp(30px, 5vw, 48px);
  font-weight: 900;
  color: #2563eb;
  letter-spacing: -1.5px;
  text-shadow: 2px 3px 0px #bfdbfe;
  margin: 0 0 8px;
  text-align: center;
}


.game-container h2 {
  width: 100%;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  margin: 10px 0;
}

.stats-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
}

.stat-card {
  background-color: white;
  padding: 15px 30px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.stat-number {
  font-size: 30px;
  font-weight: 900;
  color: #2563eb;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

/* Botón */
.play-again {
  margin: 25px auto 0;
  padding: 13px 28px;
  border-radius: 12px;
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  transition: all 0.2s ease;
  border: none;
}

.play-again:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}


@media (max-width: 600px) {
  .game-container {
    padding: 25px 12px;
  }

  .stats-container {
    gap: 12px;
  }

  .stat-card {
    min-width: 90px;
    padding: 12px 20px;
  }
}

</style>
