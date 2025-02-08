<template>
  <h1 class="tw:text-3xl! tw:font-normal! tw:p-2!">Settings</h1>
  <q-separator />
  <form class="tw:bg-white tw:shadow-2xs tw:rounded-lg tw:py-4 tw:px-2 tw:my-4">
    <div class="tw:grid tw:grid-cols-1 tw:gap-4 tw:py-4 tw:w-9/10! tw:mx-auto!">
      <q-input
        class="tw:"
        outlined
        v-model="text"
        label="Bible Chapters per day"
        stack-label
        :dense="dense"
      />
      <q-input
        class="tw:"
        outlined
        v-model="text"
        label="Reading start date"
        stack-label
        :dense="dense"
      />
      <q-input
        class="tw:"
        outlined
        v-model="text"
        label="Reading end date"
        stack-label
        :dense="dense"
        disable=""
      />
      <q-input
        class="tw:"
        outlined
        v-model="text"
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
//
</script>
