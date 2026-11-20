
<template>
  <section class="options-container">
    <button
      v-for="{ name, id } in options"
      :key="id"
      @click="$emit('selectedOption', id)"
      :class="[
        'option-button capitalize',
        {
          correct: blockSelection && id === correctAnswer,
          incorrect: blockSelection && id === selectedAnswer
            && id !== correctAnswer
        }
      ]"
      :disabled="blockSelection"
    >
      {{ name }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
  selectedAnswer: number | null;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number];
}>();
</script>

<style scoped>
.options-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 25px;
  width: 100%;
}

.option-button {
  width: 145px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: white;
  color: #333;
  font-weight: 600;
  text-align: center;
  text-transform: capitalize;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.10);
  transition: all 0.2s ease;
  cursor: pointer;
}

.option-button:hover:not(:disabled) {
  background-color: #e5e7eb;
  transform: translateY(-3px);
}

.option-button:disabled {
  cursor: default;
}

.correct {
  background-color: #22c55e !important;
  color: white !important;
  box-shadow: 0 3px 10px rgba(34, 197, 94, 0.3);
}

.incorrect {
  background-color: #ef4444 !important;
  color: white !important;
  box-shadow: 0 3px 10px rgba(239, 68, 68, 0.3);
}
</style>
