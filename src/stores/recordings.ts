import type { Recording } from '@/api_client';

import ApiClient from '@/api_client';
import { defineStore } from 'pinia';

export const useRecordingsStore = defineStore('recordings', {
  state: () => ({
    page: 1,
    totalRecordings: 0,
    itemsPerPage: 0,
    itemsPerPageOptions: [] as { value: number; title: string; }[],
    recordings: [] as Recording[],
  }),
  actions: {
    async getRecordings() {
      return ApiClient.getBirdSounds(this.page).then((response) => {
        this.recordings = response.recordings;
        if (this.page === 1) {
          this.itemsPerPage = response.recordings.length;
          this.itemsPerPageOptions = [{ value: this.itemsPerPage, title: `${this.itemsPerPage}`}];
        }
        this.totalRecordings = parseInt(response.numRecordings);
      });
    },
    setPage(page: number) {
      this.page = page;
    },
  },
});