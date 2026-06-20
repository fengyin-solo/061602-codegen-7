import type { Weather, WeatherEffect, BerryType, GrowthStage, Personality, SpriteEvent } from '@/types/game'

export const ATTR_MIN = 0
export const ATTR_MAX = 100
export const DEATH_THRESHOLD = 10

export const STAGE_DURATION: Record<Exclude<GrowthStage, 'adult'>, number> = {
  egg: 1,
  chick: 2,
  juvenile: 2,
  subadult: 1,
}

export const STAGE_NAMES: Record<GrowthStage, string> = {
  egg: '🥚 蛋',
  chick: '🐣 雏鸟',
  juvenile: '🐥 幼鸟',
  subadult: '🦜 亚成鸟',
  adult: '🐦 成鸟',
}

export const STAGE_EMOJI: Record<GrowthStage, string> = {
  egg: '🥚',
  chick: '🐣',
  juvenile: '🐥',
  subadult: '🦜',
  adult: '🐦',
}

export const FOOD_NEED_MULTIPLIER: Record<Exclude<GrowthStage, 'egg'>, number> = {
  chick: 1.5,
  juvenile: 1.2,
  subadult: 1.0,
  adult: 0.8,
}

export const HUNGER_DECAY_RATE = 1.5
export const FEAR_DECAY_RATE = 0.8
export const HEALTH_RECOVERY_RATE = 0.5

export const BERRY_SPAWN_INTERVAL = 4000
export const BERRY_MAX_COUNT = 8
export const BERRY_LIFETIME = 20000

export const BERRY_VALUES: Record<BerryType, number> = {
  red: 10,
  blue: 15,
  golden: 25,
}

export const BERRY_COLORS: Record<BerryType, string> = {
  red: '#C41E3A',
  blue: '#4169E1',
  golden: '#FFD700',
}

export const BERRY_EMOJI: Record<BerryType, string> = {
  red: '🍒',
  blue: '🫐',
  golden: '✨',
}

export const WEATHER_CHANGE_INTERVAL = 25000

export const WEATHER_EFFECTS: Record<Weather, WeatherEffect> = {
  sunny: { hungerMod: 1.0, fearMod: 0.8, healthMod: 1.0 },
  rainy: { hungerMod: 1.3, fearMod: 1.5, healthMod: 0.9, awayChance: 0.08 },
  snowy: { hungerMod: 1.5, fearMod: 1.2, healthMod: 0.7, sickChance: 0.12 },
  stormy: { hungerMod: 1.2, fearMod: 2.0, healthMod: 0.6, awayChance: 0.2, sickChance: 0.18 },
}

export const WEATHER_NAMES: Record<Weather, string> = {
  sunny: '☀️ 晴天',
  rainy: '🌧️ 雨天',
  snowy: '❄️ 雪天',
  stormy: '🌪️ 暴风',
}

export const WEATHER_EMOJI: Record<Weather, string> = {
  sunny: '☀️',
  rainy: '🌧️',
  snowy: '❄️',
  stormy: '🌪️',
}

export const WEATHER_COLORS: Record<Weather, string> = {
  sunny: 'from-amber-300/30 to-yellow-200/20',
  rainy: 'from-blue-400/40 to-gray-500/30',
  snowy: 'from-blue-100/40 to-white/30',
  stormy: 'from-gray-600/50 to-purple-800/40',
}

export const PERSONALITY_NAMES: Record<Personality, string> = {
  bold: '勇敢大胆',
  shy: '胆小害羞',
  gentle: '温柔恬静',
  curious: '好奇活泼',
  stubborn: '倔强独立',
}

export const PERSONALITY_EMOJI: Record<Personality, string> = {
  bold: '💪',
  shy: '🥺',
  gentle: '🌸',
  curious: '🌟',
  stubborn: '😤',
}

export const DAY_DURATION = 60000
export const INITIAL_FOOD = 30
export const MIN_EGGS = 2
export const MAX_EGGS = 4
export const MAX_BREEDING_ROUNDS = 2

export const BIRD_NAMES = [
  '毛毛', '豆豆', '啾啾', '喳喳', '花花', '点点', '果果', '泡泡',
  '糖糖', '圆圆', '小米', '小麦', '云朵', '星星', '月亮', '太阳',
  '小橘', '小蓝', '小绿', '小红', '阿黄', '阿白', '阿黑', '阿灰',
]

export const SPRITE_EVENT_INTERVAL = 45000

export const SPRITE_EVENTS: Omit<SpriteEvent, 'id'>[] = [
  {
    type: 'help',
    title: '森林精灵的求助',
    description: '一只受伤的森林精灵跌跌撞撞飞到你面前，它的翅膀被暴风刮伤了。它请求你帮它照顾一只迷路的幼鸟，作为回报它会传授你抵御恶劣天气的秘法。但这会消耗你一些食物储备...',
    spriteName: '森林精灵·小绿',
    spriteEmoji: '🧚',
    acceptEffect: {
      weatherResist: { stormy: 0.3, rainy: 0.2 },
      foodStock: -20,
      logMessage: '🧚 你收留了迷路的幼鸟，精灵传授了你暴风与雨水的抗性秘法！',
      logType: 'success',
    },
    declineEffect: {
      birdFear: 15,
      logMessage: '😔 你拒绝了精灵的请求，精灵失望地飞走了，小鸟们感到有些不安...',
      logType: 'warning',
    },
  },
  {
    type: 'help',
    title: '雪精灵的恳求',
    description: '雪精灵瑟瑟发抖地出现在你面前，它的冰晶核心快要融化了。它请求你给它一些温暖的栖息地，作为回报它能让你的鸟巢在雪天更加温暖。但你的小鸟可能会因为栖息地变化感到害怕...',
    spriteName: '雪精灵·冰晶',
    spriteEmoji: '❄️',
    acceptEffect: {
      weatherResist: { snowy: 0.4 },
      birdFear: 10,
      logMessage: '❄️ 你为雪精灵提供了温暖的角落，它赐予了鸟巢抵御严寒的祝福！',
      logType: 'success',
    },
    declineEffect: {
      foodStock: -10,
      logMessage: '🥶 雪精灵伤心地离开了，它临走时带走了一些食物储备作为最后的取暖...',
      logType: 'danger',
    },
  },
  {
    type: 'help',
    title: '花精灵的托付',
    description: '花精灵捧着一颗神奇的种子找到你，它需要你帮它照料这颗种子直到发芽。作为感谢，它会让阳光更温柔地照耀你的鸟巢。但你需要分出一些食物来浇灌种子...',
    spriteName: '花精灵·芬芳',
    spriteEmoji: '🌸',
    acceptEffect: {
      weatherResist: { sunny: 0.3 },
      foodStock: -15,
      birdHealth: 5,
      logMessage: '🌸 你精心照料着种子，花精灵让阳光变得更加温暖治愈！',
      logType: 'success',
    },
    declineEffect: {
      logMessage: '🌱 你没有接受种子，花精灵默默离开了，小鸟们错过了一次强身健体的机会...',
      logType: 'info',
    },
  },
  {
    type: 'gift',
    title: '彩虹精灵的馈赠',
    description: '彩虹精灵带着七彩光芒降临！它被你照顾小鸟的善良打动，决定送你一份礼物。你可以选择接受这份馈赠，或者婉拒来获得精灵的祝福...',
    spriteName: '彩虹精灵·七彩',
    spriteEmoji: '🌈',
    acceptEffect: {
      foodStock: 50,
      logMessage: '🌈 你接受了彩虹精灵的馈赠，获得了大量食物储备！',
      logType: 'success',
    },
    declineEffect: {
      weatherResist: { rainy: 0.25, sunny: 0.25, snowy: 0.25, stormy: 0.25 },
      logMessage: '✨ 你婉拒了馈赠，彩虹精灵被你的谦逊打动，赐予你全天气抗性祝福！',
      logType: 'success',
    },
  },
  {
    type: 'gift',
    title: '星尘精灵的到访',
    description: '夜空中飘落的星尘汇聚成一位精灵，它带着神秘的星之碎片来到你面前。接受碎片可以立即获得大量食物，但星尘的能量可能会让小鸟感到不安...',
    spriteName: '星尘精灵·闪闪',
    spriteEmoji: '⭐',
    acceptEffect: {
      foodStock: 40,
      birdFear: 20,
      logMessage: '⭐ 你收下了星之碎片，食物储备大增！但小鸟们被星光惊扰了...',
      logType: 'warning',
    },
    declineEffect: {
      birdHealth: 10,
      birdHunger: 15,
      logMessage: '🌟 你谢绝了星尘，精灵将星尘化作温和的能量，所有小鸟恢复了体力！',
      logType: 'success',
    },
  },
  {
    type: 'gift',
    title: '风之精灵的礼物',
    description: '风之精灵呼啸而来，它在旅途中收集了许多美味的浆果。它想把这些浆果送给你，但你需要决定是接受这份慷慨的礼物，还是请求精灵教你的小鸟如何在风中飞翔...',
    spriteName: '风之精灵·呼啸',
    spriteEmoji: '🌬️',
    acceptEffect: {
      foodStock: 35,
      logMessage: '🌬️ 你收下了风之精灵的浆果，食物储备增加了！',
      logType: 'success',
    },
    declineEffect: {
      weatherResist: { stormy: 0.35, rainy: 0.15 },
      logMessage: '🪶 你请求精灵传授飞翔技巧，小鸟们学会了在风雨中稳身，恶劣天气影响降低！',
      logType: 'success',
    },
  },
  {
    type: 'help',
    title: '月精灵的请求',
    description: '月精灵在月光下现身，它的月光宝石失去了光芒。它需要你的小鸟们用歌声帮它重新点亮宝石。作为回报，它会在夜晚保护你的鸟巢不受寒冷侵袭...',
    spriteName: '月精灵·银辉',
    spriteEmoji: '🌙',
    acceptEffect: {
      weatherResist: { snowy: 0.25, stormy: 0.15 },
      birdHunger: -10,
      logMessage: '🌙 小鸟们的歌声点亮了月光宝石，月精灵赐予了鸟巢夜晚的守护！',
      logType: 'success',
    },
    declineEffect: {
      birdFear: 20,
      logMessage: '😰 你拒绝了月精灵，月光变得黯淡，小鸟们在黑暗中感到恐惧...',
      logType: 'warning',
    },
  },
  {
    type: 'gift',
    title: '太阳精灵的恩赐',
    description: '太阳精灵带来了温暖的阳光祝福！它想将这份祝福赠予你，让你的小鸟们更加健康。但如果你愿意将祝福分享给其他森林生物，你会获得更深厚的回报...',
    spriteName: '太阳精灵·炎阳',
    spriteEmoji: '☀️',
    acceptEffect: {
      birdHealth: 15,
      logMessage: '☀️ 你接受了太阳精灵的祝福，所有小鸟的健康都得到了恢复！',
      logType: 'success',
    },
    declineEffect: {
      weatherResist: { sunny: 0.4, snowy: 0.2 },
      foodStock: 25,
      logMessage: '🌻 你将祝福分享给了森林，太阳精灵十分欣慰，赐予你双重回报！',
      logType: 'success',
    },
  },
]
