import type { IApiDataModel } from '@/models/api-data.model';
import type { IStoreState, ModelState } from '@/models/store.model';
import type { AxiosResponse } from 'axios';
import apiService from '@/services/api.service';
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import { toastifyConfiguration } from '@/configs/toastify.config';
import type { IEpisode } from '@/models/episode.model';

export const episodeStore = defineStore('episode', {
  state: (): IStoreState<IEpisode> => ({
    data: {} as ModelState<IEpisode> | null,
    loading: false,
    error: null as any | null,
    paging: 1,
    pagesTotal: null,
    items: [] as IEpisode[],
    totalCount: null
  }),
  actions: {
    async fetchAllEpisodes(callback: () => void): Promise<void> {
      if (this.items!.length > 0) {
        callback();
        return;
      }
      this.loading = true;
      this.error = null;

      let run = true;

      try {
        while (run) {
          const response: AxiosResponse<IApiDataModel<IEpisode>> = await apiService.get(`episode`, {
            page: this.paging
          });

          this.data!.results = response.data.results;
          this.pagesTotal = response.data.info.pages;
          this.totalCount = response.data.info.count;

          if (this.data!.results && this.data!.results.length) {
            this.items!.push(...this.data!.results);
            if (!response.data.info.next) {
              run = false;
              this.totalCount = this.items?.length;
            } else {
              this.paging++;
            }
          }
        }
        toast.success(`All Episodes fetched`, toastifyConfiguration);
      } catch (error) {
        this.error = error;
        toast.error(`Store error: ${error}`, toastifyConfiguration);
        console.error(`Store error:  ${error}`, toastifyConfiguration);
      } finally {
        this.loading = false;
        callback();
      }
    },
    getEpisodeTitle(episodeUrl: string): string {
      const episodeUrlArray = episodeUrl.split('episode/');
      return (
        this.items?.filter(
          (item) => item.id === Number(episodeUrlArray[episodeUrlArray.length - 1])
        )[0]?.name || 'No Title'
      );
    }
  }
});
