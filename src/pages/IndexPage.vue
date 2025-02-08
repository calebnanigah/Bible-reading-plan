<template>
  <div
    class="tw:bg-yellow-200 tw:rounded-xl tw:shadow-lg tw:absolute tw:top-1/2 tw:left-1/2 tw:-translate-x-1/2 tw:-translate-y-1/2 tw:w-9/10 tw:text-center"
  >
    <h6 class="tw:text-2xl tw:bg-blue-600 tw:font-semibold tw:py-2 tw:text-white">
      Today's Chapters
    </h6>

    <div v-if="todayChapters.length != 0">
      <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:text-xl tw:py-4">
        <p class="tw:m-0!" v-for="chapter in todayChapters" :key="chapter">{{ chapter }}</p>
      </div>
    </div>
    <div v-else>
      <p>No chapters to read today</p>
    </div>
    <p class="tw:text-left tw:text-xs tw:font-normal tw:pl-2 tw:text-slate-700">
      {{ formattedDate }}
    </p>
  </div>
  
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'
import { date } from 'quasar'

const today = new Date() // Get current date
const formattedDate = date.formatDate(today, 'dddd, Do MMMM YYYY')

const store = useStorageStore()
const todayChapters = ref([])

// Run on load
onMounted(() => {
  store.loadSettings()
  store.loadReadingPlan()
  todayChapters.value = store.getChapterForToday()
})

// Watch for changes to the start date & regenerate the plan
watch(
  () => store.settings.readingStartDate,
  () => {
    store.generateReadingPlan()
    todayChapters.value = store.getChapterForToday()
  },
)
</script>
