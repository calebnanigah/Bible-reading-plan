<template>
  <h1 class="tw:text-3xl! tw:font-normal! tw:p-2!">Settings</h1>
  <q-separator />
  <form class="tw:bg-white tw:shadow-2xs tw:rounded-lg tw:py-4 tw:px-2 tw:my-4" @submit="saveSettings">
    <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:py-4 tw:w-9/10! tw:mx-auto!">
      <q-input
        outlined
        v-model="chaptersPerDay"
        label="Bible Chapters per day"
        stack-label
        :dense="dense"
      />
      <q-input
        outlined
        type="date"
        v-model="startDate"
        label="Reading start date"
        stack-label
        :dense="dense"
      />
      <q-input
        class="tw:"
        outlined
        v-model="endDate"
        label="Reading end date"
        stack-label
        :dense="dense"
        disable=""
      />
      <q-input
        class="tw:"
        outlined
        v-model="readingPlan"
        label="Reading plan"
        stack-label
        :dense="dense"
        disable=""
      />
          <q-btn
      class="tw:mx-auto tw:my-4"
      color="primary"
      label="Update"
      no-caps=""
      @click="saveSettings"
      />
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'
import { LocalStorage } from 'quasar'

// const formatChapterDate = (dateString) => {
//   // Format the date using Quasar's date utility
//   return date.formatDate(new Date(dateString), 'ddd, Do MMM YYYY');
// };

const dense = ref(false)


const savedSettingsValues = LocalStorage.getItem('BibleChaptersSettings')
if (!savedSettingsValues) {
  LocalStorage.set('BibleChaptersSettings', {
    readingStartDate: new Date(),
    readingEndDate: '',
    readingPlan: 'Chronological',
    chaptersPerDay: 4,
  })
} 
// console.log(savedSettingsValues.readingStartDate)
const startDate = ref(savedSettingsValues.readingStartDate)
const endDate = ref('')
const readingPlan = ref('Chronological')
const chaptersPerDay = ref(savedSettingsValues.chaptersPerDay)


const store = useStorageStore()
const todayChapters = ref([])
// Run on load
onMounted(() => {
  store.loadSettings()
  todayChapters.value = store.getChapterForToday()
})

const saveSettings = () => {
  let settings = {
    readingStartDate: startDate.value,
    readingEndDate: endDate.value,
    readingPlan: readingPlan.value,
    chaptersPerDay: chaptersPerDay.value,
  }
  // console.log(settings)
  // store.saveSettings()
  LocalStorage.set('BibleChaptersSettings', settings)
  store.loadSettings()
  store.loadReadingPlan()
  // store.loadSettings();
  // store.loadReadingPlan()
  // store.generateReadingPlan()
}

// Watch for changes to the start date & regenerate the plan
watch(
  () => store.settings.readingStartDate,
  () => {
    store.generateReadingPlan()
    todayChapters.value = store.getChapterForToday()
  },
)

// watch for changes to the chapters per day and update the reading plan
watch(
  () => chaptersPerDay.value,
  () => {
    store.generateReadingPlan()
    todayChapters.value = store.getChapterForToday()
  },
)
</script>
