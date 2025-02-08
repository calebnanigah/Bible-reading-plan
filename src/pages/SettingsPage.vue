<template>
  <h1 class="tw:text-3xl! tw:font-normal! tw:p-2!">Settings</h1>
  <q-separator />

  <form class="tw:bg-white tw:shadow-2xs tw:rounded-lg tw:py-4 tw:px-2 tw:my-4" @submit.prevent="saveSettings">
    <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:py-4 tw:w-9/10! tw:mx-auto!">

      <q-input
        outlined
        v-model="chaptersPerDay"
        label="Bible Chapters per day"
        stack-label
        type="number"
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
        outlined
        type="date"
        v-model="endDate"
        label="Reading end date"
        stack-label
        :dense="dense"
        :disable="true"
      />

      <q-input
        outlined
        v-model="readingPlan"
        label="Reading plan"
        stack-label
        :dense="dense"
        :disable="true"
      />

      <q-btn
        class="tw:mx-auto tw:my-4"
        color="primary"
        label="Update"
        no-caps
        @click="saveSettings"
      />
    </div>
  </form>

    <div class="tw:bg-red-200 tw:rounded-lg tw:shadow-lg tw:m-4 tw:p-2 tw:flex tw:items-center tw:justify-center tw:gap-2">
    <q-icon name="info" color="red-8" size="2rem" />
    <div>
      <p class="tw:text-base! tw:m-0!">Settings cannot be saved yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'
import { LocalStorage } from 'quasar'

const store = useStorageStore()
const dense = ref(false)

// Load settings from LocalStorage or set defaults if missing
const savedSettingsValues = LocalStorage.getItem('BibleChaptersSettings') || store.settings

// Reactive values bound to form inputs
const startDate = ref(savedSettingsValues.readingStartDate)
const endDate = ref(savedSettingsValues.readingEndDate)
const readingPlan = ref(savedSettingsValues.readingPlan)
const chaptersPerDay = ref(savedSettingsValues.BibleChaptersPerDay)

onMounted(() => {
  store.loadSettings()
  store.loadReadingPlan()
})

// const saveSettings = () => {
//   const newSettings = {
//     readingStartDate: startDate.value,
//     readingEndDate: endDate.value,
//     readingPlan: readingPlan.value,
//     BibleChaptersPerDay: chaptersPerDay.value,
//   }

//   LocalStorage.set('BibleChaptersSettings', newSettings) // Save to LocalStorage
//   store.settings = newSettings // Update Pinia store
//   store.loadReadingPlan() // Regenerate reading plan
// }

// // Watch for changes to `startDate` & regenerate the plan
// watch(startDate, () => {
//   store.settings.readingStartDate = startDate.value
//   store.generateReadingPlan()
// })

// // Watch for changes to `chaptersPerDay` & update the plan
// watch(chaptersPerDay, () => {
//   store.settings.BibleChaptersPerDay = chaptersPerDay.value
//   store.generateReadingPlan()
// })
</script>
