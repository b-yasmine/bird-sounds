<script lang="ts">
import { useRecordingsStore } from '../stores/recordings'
export default {
  setup() {
    return {
      recordingsStore: useRecordingsStore(),
    }
  },
  data() {
    return {
      currentSound: '',
      loading: false,
      headers: [
        {
          title: 'identifier',
          key: 'id',
        },
        {
          title: 'name',
          key: 'gen',
        },
        {
          title: 'species',
          key: 'sp',
        },
        {
          title: 'length',
          key: 'length',
        },
        {
          title: 'sound',
          key: 'file',
        },
      ],
    }
  },
  computed: {
    recordings() {
      return this.recordingsStore.recordings
    },
    totalRecordings() {
      return this.recordingsStore.totalRecordings
    },
    page: {
      get() {
        return this.recordingsStore.page
      },
      set(page: number) {
        this.recordingsStore.setPage(page)
        this.getRecordings()
      },
    },
    itemsPerPage() {
      return this.recordingsStore.itemsPerPage
    },
    itemsPerPageOptions() {
      return this.recordingsStore.itemsPerPageOptions
    },
  },
  created() {
    this.getRecordings()
  },
  methods: {
    async getRecordings() {
      this.loading = true
      await this.recordingsStore.getRecordings()
      this.loading = false
    },
    playAudio(audioFile: string) {
      this.currentSound = audioFile
      this.$nextTick(() => {
        this.$refs.audioPlayer.play()
      })
    },
    pauseAudio() {
      this.$refs.audioPlayer.pause()
    },
  },
}
</script>

<template>
  <div class="mp3-player">
    <audio ref="audioPlayer" :src="currentSound" />
  </div>
  <v-data-table-server
    v-model:page="page"
    :items-per-page="itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    :headers="headers"
    :items="recordings"
    :items-length="totalRecordings"
    :loading="loading"
  >
    <template v-slot:item.file="{ value }">
      <button @click="playAudio(value)">Play</button>
      <button @click="pauseAudio">Pause</button>
    </template>
  </v-data-table-server>
</template>
