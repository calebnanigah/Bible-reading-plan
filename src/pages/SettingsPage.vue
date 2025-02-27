<template>
  <h1 class="tw:text-3xl! tw:font-normal! tw:p-2!">Settings</h1>
  <q-separator />

  <form
    class="tw:bg-white tw:shadow-2xs tw:rounded-lg tw:py-4 tw:px-2 tw:my-4"
    @submit.prevent="saveSettings"
  >
    <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:py-4 tw:w-9/10! tw:mx-auto!">
      <q-input
        outlined
        v-model="chaptersPerDay"
        label="Bible Chapters per day"
        stack-label
        type="number"
        :dense="dense"
        hint="Enter a number between 1 and 20"
        :rules="[
          (val) => !!val || 'This field is required',
          (val) => (val > 0 && val <= 20) || 'Enter a valid number (1-20)',
        ]"
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
        v-model="readingStartChapter"
        label="Start reading from"
        stack-label
        :dense="dense"
        :disable="true"
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

      <q-btn
        class="tw:mx-auto tw:my-4"
        color="red"
        label="Reset to default"
        no-caps
        @click="resetSettings"
      />
    </div>
  </form>

  <!-- <div
    class="tw:bg-red-200 tw:rounded-lg tw:shadow-lg tw:m-4 tw:p-2 tw:flex tw:items-center tw:justify-center tw:gap-2"
  >
    <q-icon name="info" color="red-8" size="2rem" />
    <div>
      <p class="tw:text-base! tw:m-0!">Settings cannot be saved yet.</p>
    </div>
  </div> -->

  <div class="tw:bg-white tw:rounded-lg tw:shadow-lg tw:m-4 tw:p-2">
    <h2 class="tw:text-base!">📖 Daily Bible Verse (NKJV)</h2>
    <div id="dailyVersesWrapper"></div>
  </div>

  <q-separator />
  <p class="tw:text-sm! tw:font-normal! tw:p-2! tw:text-slate-700 tw:text-center">
    Contact developer:
    <a href="mailto:calebna4@gmail.com">calebna4@gmail.com</a>
  </p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStorageStore } from 'src/stores/BibleChapters'
import { LocalStorage, Notify } from 'quasar'

const store = useStorageStore()
const dense = ref(false)

// Load settings from LocalStorage or set defaults if missing
const savedSettingsValues = LocalStorage.getItem('BibleChaptersSettings') || store.settings

// Reactive values bound to form inputs
const startDate = ref(savedSettingsValues.readingStartDate)
const endDate = ref(savedSettingsValues.readingEndDate)
const readingPlan = ref(savedSettingsValues.readingPlan)
const chaptersPerDay = ref(savedSettingsValues.BibleChaptersPerDay)
const readingStartChapter = ref('Genesis chapter 1')

onMounted(() => {
  store.loadSettings()
  store.loadReadingPlan()

  // Load daily Bible verse
  const script = document.createElement('script')
  script.src = 'https://dailyverses.net/get/verse.js?language=nkjv'
  script.async = true
  script.defer = true
  document.body.appendChild(script)
})

const saveSettings = () => {
  if (chaptersPerDay.value < 1 || chaptersPerDay.value > 20) {
    Notify.create({
      message: 'Enter a valid number of chapters per day (1-20)',
      color: 'red',
      position: 'top',
      type: 'negative',
      timeout: 2500,
    })
    return
  }

  const newSettings = {
    readingStartDate: startDate.value,
    readingEndDate: endDate.value,
    readingPlan: readingPlan.value,
    BibleChaptersPerDay: parseInt(chaptersPerDay.value),
    readingProgress: 0,
  }

  // LocalStorage.remove('BibleChaptersSettings')
  LocalStorage.remove('BibleReadingPlan')
  store.saveSettings(newSettings)
  // store.loadSettings()
  // store.loadReadingPlan()
  startDate.value = store.settings.readingStartDate
  endDate.value = store.settings.readingEndDate
  readingPlan.value = store.settings.readingPlan
  chaptersPerDay.value = store.settings.BibleChaptersPerDay

  Notify.create({
    message: `Settings updated. <br> Reading plan regenerated. 📖 <br> Starting date: ${startDate.value}, ${chaptersPerDay.value} chapters a day.`,
    color: 'primary',
    position: 'top',
    type: 'positive',
    timeout: 2500,
    html: true,
    actions: [{ icon: 'close', color: 'white' }],
  })

  // LocalStorage.set('BibleChaptersSettings', newSettings) // Save to LocalStorage
  // store.settings = newSettings // Update Pinia store
  // store.loadReadingPlan() // Regenerate reading plan
}

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

const resetSettings = () => {
  LocalStorage.remove('BibleChaptersSettings')
  LocalStorage.remove('BibleReadingPlan')
  store.restoreDefaultSettings()
  store.loadReadingPlan()
  startDate.value = store.settings.readingStartDate
  endDate.value = store.settings.readingEndDate
  readingPlan.value = store.settings.readingPlan
  chaptersPerDay.value = store.settings.BibleChaptersPerDay

  Notify.create({
    message:
      'Settings reset to default. <br> Reading plan regenerated. 📖 <br> Starting date: Sun. 9th Feb. 2025, 4 chapters a day.',
    color: 'primary',
    position: 'top',
    type: 'positive',
    html: true,
     timeout: 2500,
    actions: [{ icon: 'close', color: 'white' }],
  })
}
</script>
