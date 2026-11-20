import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
import { usePokemonStats } from './usePokemonStats';
export const usePokemonGame = () => {
    
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const isLoading = computed(() => pokemons.value.length === 0);
    const selectedAnswer = ref<number | null>(null);

    const {
  gamesPlayed,
  gamesWon,
  registerGame
} = usePokemonStats();

    // Creamos un pokemon de listado de options
    // Obtengo un valor partiendo de alguno de los elementos que conforman parte del arreglo
    // const randomPokemon = computed(() => pokemonOptions.value[ Math.floor(Math.random() * pokemonOptions.value.length)],);
  const randomPokemon = computed<Pokemon | null>(() => {
  if (pokemonOptions.value.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * pokemonOptions.value.length
  );

  return pokemonOptions.value[randomIndex] ?? null;
});

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextRound = (howMany: number = 4) => {
  gameStatus.value = GameStatus.Playing;
  selectedAnswer.value = null;

  pokemonOptions.value = pokemons.value.slice(0, howMany);
  pokemons.value = pokemons.value.slice(howMany);
};


const checkAnswer = (id: number) => {

  const pokemon = randomPokemon.value;

  if (!pokemon) return;

  selectedAnswer.value = id;

  const hasWon = pokemon.id === id;

  // Registrar el resultado de la partida
  registerGame(hasWon);

  if (hasWon) {
    gameStatus.value = GameStatus.Won;

    confetti({
      particleCount: 300,
      spread: 150,
      origin: {
        y: 0.6
      }
    });

    return;
  }

  gameStatus.value = GameStatus.Lost;
};

        


    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async ()=>{
        await new Promise((r) => setTimeout(r, 1000));
        pokemons.value=await getPokemons();
        getNextRound();
        console.log({ pokemons });
        console.log(pokemonOptions.value);
    });
    
    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        selectedAnswer,

        gamesPlayed,
        gamesWon,

        // Methods
        getNextRound,
        checkAnswer,
    };
}