<script setup lang="ts">
import { computed } from 'vue'
import type { GameState, Weather } from '@/types/game'
import { WEATHER_NAMES, WEATHER_EMOJI } from '@/utils/constants'

const props = defineProps<{
  state: GameState
}>()

const weatherClass = computed(() => {
  switch (props.state.currentWeather) {
    case 'sunny': return 'bg-gradient-to-r from-amber-400/20 to-yellow-300/20'
    case 'rainy': return 'bg-gradient-to-r from-blue-500/20 to-gray-500/20'
    case 'snowy': return 'bg-gradient-to-r from-blue-200/30 to-white/20'
    case 'stormy': return 'bg-gradient-to-r from-purple-600/30 to-gray-700/30'
  }
})

const hasResistance = computed(() => {
  return Object.values(props.state.weatherResistance).some(v => v && v > 0)
})

const resistanceList = computed(() => {
  const entries = Object.entries(props.state.weatherResistance) as [Weather, number][]
  return entries.filter(([_, v]) => v && v > 0)
})
</script>

<template>
  <div
    class="w-full glass rounded-2xl px-4 py-3 flex items-center justify-between gap-4"
    :class="weatherClass"
  >
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl">
        <span class="text-2xl">{{ WEATHER_NAMES[state.currentWeather].split(' ')[0] }}</span>
        <span class="text-white font-medium text-sm">{{ WEATHER_NAMES[state.currentWeather].split(' ')[1] }}</span>
      </div>

      <div class="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl">
        <span class="text-lg">📅</span>
        <span class="text-white font-medium">第 {{ state.day }} 天</span>
        <div class="w-16 h-2 bg-black/40 rounded-full overflow-hidden ml-1">
          <div
            class="h-full bg-gradient-to-r from-orange-300 to-amber-400 transition-all"
            :style="{ width: `${state.dayProgress * 100}%` }"
          />
        </div>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl">
        <span class="text-xl">🍒</span>
        <span class="text-white font-bold text-lg">{{ state.foodStock }}</span>
        <span class="text-white/70 text-xs">食物</span>
      </div>

      <div class="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl">
        <span class="text-xl">🐦</span>
        <span class="text-white font-bold text-lg">
          {{ state.birds.filter(b => !b.isDead).length }}/{{ state.birds.length }}
        </span>
        <span class="text-white/70 text-xs">存活</span>
      </div>

      <div v-if="state.breedingCount > 0" class="flex items-center gap-2 bg-pink-500/40 px-3 py-1.5 rounded-xl">
        <span class="text-xl">💝</span>
        <span class="text-white font-bold">{{ state.breedingCount }}/{{ state.maxBreedingRounds }}</span>
      </div>

      <div v-if="hasResistance" class="flex items-center gap-2 bg-gradient-to-r from-purple-500/40 to-pink-500/40 px-3 py-1.5 rounded-xl">
        <span class="text-xl">🛡️</span>
        <div class="flex items-center gap-1.5">
          <span
            v-for="[weather, value] in resistanceList"
            :key="weather"
            class="text-sm font-bold"
            :title="`${WEATHER_NAMES[weather].split(' ')[1]}抗性 +${Math.round(value * 100)}%`"
          >
            {{ WEATHER_EMOJI[weather] }}{{ Math.round(value * 100) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
