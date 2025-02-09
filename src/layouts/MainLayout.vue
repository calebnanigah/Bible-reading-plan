<template>
  <!-- lHh lpr lFf -->
  <q-layout view="lHh Lpr lFf" class="tw:bg-slate-200">
    <q-header elevated>
      <q-toolbar class="tw:bg-red-800">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Bible Reading Plan </q-toolbar-title>
        <div>{{ store.settings.BibleChaptersPerDay }} chapters a day</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Bible Reading Plan </q-item-label>
        <q-item
          v-for="link in linksList"
          :key="link.title"
          clickable
          v-ripple
          @click="goto(link.to)"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <div class="tw:sm:hidden tw:block q-gutter-y-md tw:absolute tw:bottom-0 tw:w-full">
      <q-footer elevated>
        <q-tabs v-model="tab" class="tw:bg-red-800 text-white text-dark shadow-2 tw:w-full">
          <q-tab
            no-caps=""
            name="chaptersToday"
            label="Today"
            icon="home"
            @click="goto('chaptersToday')"
          />
          <q-tab
            name="chaptersIndex"
            label="All Chapters"
            icon="format_list_bulleted"
            @click="goto('chaptersIndex')"
            no-caps=""
          />
          <q-tab
            no-caps=""
            name="settings"
            label="Settings"
            icon="settings"
            @click="goto('settings')"
          />
        </q-tabs>
      </q-footer>
    </div>

    <q-page-container>
      <q-page class="tw:sm:w-100 tw:mx-auto">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorageStore } from 'src/stores/BibleChapters'

const router = useRouter()
const tab = ref('chaptersToday')

const store = useStorageStore()

const linksList = [
  { title: 'Today', caption: 'Chapters to read today', icon: 'home', to: 'chaptersToday' },
  {
    title: 'All Chapters',
    caption: 'List of all Bible chapters',
    icon: 'format_list_bulleted',
    to: 'chaptersIndex',
  },
  { title: 'Settings', caption: 'Customize reading settings', icon: 'settings', to: 'settings' },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function goto(routeName) {
  tab.value = routeName
  router.push({ name: routeName })
}
</script>
