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
    pagesTotal: null
  }),
  actions: {
    async fetchEpisodes(page: number): Promise<void> {
      this.loading = true;
      this.error = null;
      this.paging = page;
      try {
        const response: AxiosResponse<IApiDataModel<IEpisode>> = await apiService.get('episode', {
          page: page
        });
        this.pagesTotal = response.data.info.pages;
        toast.success(`Episodes fetched`, toastifyConfiguration);
      } catch (error) {
        this.error = error;
        toast.error(`Store error: ${error}`, toastifyConfiguration);
        console.error(`Store error:  ${error}`, toastifyConfiguration);
      } finally {
        this.loading = false;
      }
    },
    async fetchEpisode(id: number): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response: AxiosResponse<IEpisode> = await apiService.get(`episode/${id}`);
        this.setEpisodeState(response.data);
      } catch (error) {
        this.error = error;
        toast.error(`Store error: ${error}`, toastifyConfiguration);
        console.error(`Store error:  ${error}`, toastifyConfiguration);
      } finally {
        this.loading = false;
      }
    },
    setEpisodeState(episode: IEpisode): void {
      this.$state.data!.model = episode;
      toast.success(`Episode state is set`, toastifyConfiguration);
    },
    resetEpisodeState(): void {
      this.$state.data!.model = {} as IEpisode;
    }
  }
});
