<template>
<div class="tw:p-4 tw:pb-">
    <div
    class="tw:text-center tw:grid tw:grid-cols-2 tw:gap-4"
    v-if="store.arrangedChapters.length != 0"
  >
  <div v-for="chapters in store.arrangedChapters" :key="chapters" class="tw:bg-yellow-200 tw:rounded-xl tw:shadow-lg ">
    <h6 class="tw:text-lg! tw:bg-blue-600 tw:font-semibold tw:py tw:text-white">
      {{ formatChapterDate(chapters.date) }}
    </h6>
    <!-- {{ chapters }} -->
    <div >
      <div class="tw:grid tw:grid-cols-1 tw:gap-1 tw:text-base! tw:py-4">
        <p class="tw:m-0!" v-for="chapter in chapters.chapters" :key="chapter">{{ chapter }}</p>
      </div>
    </div>
  </div>
  </div>
</div>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'
import { date } from 'quasar'

const formatChapterDate = (dateString) => {
  // Format the date using Quasar's date utility
  return date.formatDate(new Date(dateString), 'ddd, d MMM YYYY');
};

const store = useStorageStore()
const todayChapters = ref([])
const plan = ref([])

// Run on load
onMounted(() => {
  store.loadSettings()
   plan.value = store.loadReadingPlan()
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
