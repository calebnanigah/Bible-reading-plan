<template>
  <div
    class="tw:bg-yellow-200 tw:rounded-xl tw:shadow-lg tw:absolute tw:top-1/2 tw:left-1/2 tw:-translate-x-1/2 tw:-translate-y-1/2 tw:w-9/10 tw:text-center"
  >
    <h6 class="tw:text-2xl tw:bg-blue-600 tw:font-semibold tw:py-2 tw:text-white">Today's Chapters</h6>
    <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:text-xl tw:py-4">
      <p class="tw:m-0!">Genesis chapter 1</p>
      <p class="tw:mb-0!">Genesis chapter 2</p>
      <p class="tw:m-0!">Genesis chapter 3</p>
      <p class="tw:m-0!">Genesis chapter 4</p>
    </div>
    <p class="tw:text-left tw:text-xs tw:font-normal tw:pl-2 tw:text-slate-700">Thursday, 1st July 2021</p>
  </div>

  {{  todayChapters }}
  <!-- {{ store }} -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'

const store = useStorageStore()
const todayChapters = ref([])

onMounted(() => {
  store.loadSettings() // Load settings from LocalStorage
  store.loadReadingPlan() // Load the saved reading plan
  todayChapters.value = store.getChaptersForToday // Get today's chapters
})

// const markAsRead = () => {
//   store.settings.readingProgress += todayChapters.value.length
//   store.saveSettings()
// }
</script>

