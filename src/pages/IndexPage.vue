<template>

    <div
    class="tw:bg-white tw:rounded-lg tw:shadow-lg tw:m-4 tw:p-2 tw:flex tw:items-center tw:justify-center tw:gap-2"
  >
    <q-icon name="info" color="blue-8" size="2rem" />
    <div>
      <p class="tw:text-base! tw:m-0! tw:font-semibold!">Bible Reading Plan: {{ store.settings.BibleChaptersPerDay }} chapters a day</p>
      <q-separator />
      <p class="tw-text-sm tw:m-0!">Based on your current plan, you are expected to finish reading the Bible on <span class="tw:font-semibold">{{ date.formatDate(store.settings.readingEndDate, 'dddd, Do MMMM YYYY') }}</span></p>
       <q-separator />
      <p class="tw-text-sm tw:m-0!">Tap on the WhatsApp button to share with friends.</p>
    </div>
  </div>

  <!-- TODO: When the chapter length is more than 5, the chapters should NOT be absolute positioned. They should be in a scrollable div. -->
   <!-- absolute position the chapters class -->
   <!-- class="tw:bg-yellow-200 tw:rounded-xl tw:shadow-lg tw:absolute tw:top-1/2 tw:left-1/2 tw:-translate-x-1/2 tw:-translate-y-1/2 tw:w-9/10 tw:text-center -->
  <div
    class="tw:bg-yellow-200 tw:rounded-xl tw:shadow-lg tw:text-center tw:m-4"
  >
    <h6 class="tw:text-2xl tw:bg-blue-600 tw:font-semibold tw:py-2 tw:text-white">
      Today's reading
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

  <svg
    @click="shareOnWhatsApp(formattedDate, todayChapters, store.settings.readingEndDate)"
    class="tw:fixed tw:right-2 tw:bottom-20 tw:animate-bounce tw:w-12 tw:h-12"
    xmlns="http://www.w3.org/2000/svg"
    height="32"
    width="28"
    viewBox="0 0 448 512"
  >
    <path
      fill="#25D366"
      stroke="#25D366"
      stroke-width="10"
      d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
    />
  </svg>
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

// share on whatsApp
// function shareOnWhatsApp(attendees) {
//   const message = formatAttendeesData(attendees);
//   const whatsappURL = `https://wa.me/?text=${message}`;

//   window.open(whatsappURL, "_blank");
// }

const shareOnWhatsApp = (todaysDate, chapters, finishingDate) => {
  // console.log(todaysDate, chapters, finishingDate);

  let formattedChapters = chapters.map((chapter) => `📖 ${chapter}`).join('\n')

  let msgTxt = `*${todaysDate}*

_Youth!_
_Arise and shine...!_

Here are today's chapters to read.
Please *make sure to read them before the day ends*.

${formattedChapters}

Have a blessed day. 🙏🏽❤️

🔗 _Reading Plan: https://biblereadingplan.netlify.app_
🗓️ _Completion date: ${finishingDate}._`

  let WhatsAppText = `https://api.whatsapp.com/send?text=${encodeURIComponent(msgTxt)}`

  //   const message = formatAttendeesData(attendees);
  // const whatsappURL = `https://wa.me/?text=${message}`;

  window.open(WhatsAppText, '_blank')

  // return WhatsAppText;
}
</script>
