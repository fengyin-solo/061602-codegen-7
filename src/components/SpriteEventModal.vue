<script setup lang="ts">
import type { SpriteEvent, SpriteDecision } from '@/types/game'

const props = defineProps<{
  event: SpriteEvent
}>()

const emit = defineEmits<{
  (e: 'decide', decision: SpriteDecision): void
}>()

const handleDecide = (decision: SpriteDecision) => {
  emit('decide', decision)
}

const formatEffectPreview = (effect: SpriteEvent['acceptEffect']) => {
  const parts: string[] = []
  
  if (effect.weatherResist) {
    const weathers: Record<string, string> = {
      sunny: '晴天',
      rainy: '雨天',
      snowy: '雪天',
      stormy: '暴风',
    }
    Object.entries(effect.weatherResist).forEach(([w, v]) => {
      if (v && v > 0) {
        parts.push(`${weathers[w]}抗性 +${Math.round(v * 100)}%`)
      }
    })
  }
  
  if (effect.foodStock) {
    parts.push(`食物 ${effect.foodStock > 0 ? '+' : ''}${effect.foodStock}`)
  }
  
  if (effect.birdHealth) {
    parts.push(`小鸟健康 ${effect.birdHealth > 0 ? '+' : ''}${effect.birdHealth}`)
  }
  
  if (effect.birdHunger) {
    parts.push(`小鸟饱食 ${effect.birdHunger > 0 ? '+' : ''}${effect.birdHunger}`)
  }
  
  if (effect.birdFear) {
    parts.push(`小鸟恐惧 ${effect.birdFear > 0 ? '+' : ''}${effect.birdFear}`)
  }
  
  return parts.length > 0 ? parts.join('，') : '无直接影响'
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
    <div class="w-full max-w-lg animate-pop-in">
      <div class="relative bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-blue-900/90 rounded-3xl border-2 border-purple-400/40 shadow-2xl overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
        
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl"></div>
        
        <div class="relative p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-4xl shadow-lg animate-pulse-glow">
              {{ event.spriteEmoji }}
            </div>
            <div>
              <div class="text-xs text-purple-300 uppercase tracking-wider mb-1">
                {{ event.type === 'help' ? '🆘 求助事件' : '🎁 馈赠事件' }}
              </div>
              <div class="text-2xl font-bold text-white font-display">
                {{ event.title }}
              </div>
              <div class="text-sm text-purple-200/80">
                来自 {{ event.spriteName }}
              </div>
            </div>
          </div>
          
          <div class="bg-white/10 rounded-2xl p-4 mb-5 border border-white/10">
            <p class="text-white/90 leading-relaxed text-sm">
              {{ event.description }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            <div class="bg-green-500/10 border border-green-400/30 rounded-xl p-3">
              <div class="text-green-300 text-xs font-bold mb-1 flex items-center gap-1">
                <span>✅</span> 接受后的影响
              </div>
              <div class="text-white/80 text-xs">
                {{ formatEffectPreview(event.acceptEffect) }}
              </div>
            </div>
            
            <div class="bg-orange-500/10 border border-orange-400/30 rounded-xl p-3">
              <div class="text-orange-300 text-xs font-bold mb-1 flex items-center gap-1">
                <span>❌</span> 拒绝后的影响
              </div>
              <div class="text-white/80 text-xs">
                {{ formatEffectPreview(event.declineEffect) }}
              </div>
            </div>
          </div>
          
          <div class="flex gap-3">
            <button
              class="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold
                     btn-3d hover:from-green-400 hover:to-emerald-500 transition-all flex items-center justify-center gap-2"
              @click="handleDecide('accept')"
            >
              <span class="text-lg">{{ event.type === 'help' ? '🤝' : '🎁' }}</span>
              {{ event.type === 'help' ? '伸出援手' : '欣然接受' }}
            </button>
            <button
              class="flex-1 py-3 px-4 bg-gradient-to-r from-gray-500 to-slate-600 text-white rounded-xl font-bold
                     btn-3d hover:from-gray-400 hover:to-slate-500 transition-all flex items-center justify-center gap-2"
              @click="handleDecide('decline')"
            >
              <span class="text-lg">{{ event.type === 'help' ? '😔' : '🙏' }}</span>
              {{ event.type === 'help' ? '无能为力' : '婉言谢绝' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
