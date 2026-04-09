import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(10)

  const doubleCount = computed(() => count.value * 2)
  
  const increase = () => {
    count.value++
  }

  const increaseBy = (amount) => 
    count.value += amount

  return { count, doubleCount, increase, increaseBy }
})
