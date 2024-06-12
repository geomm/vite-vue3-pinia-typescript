import type { IApiDataModel } from '@/models/api-data.model';
import type { ICharacter } from '@/models/character.model';
import type { IStoreState, ModelState } from '@/models/store.model';
import type { AxiosResponse } from 'axios';
import apiService from '@/services/api.service';
import { defineStore } from 'pinia';

export const characterStore = defineStore('character', {
  state: (): IStoreState<ICharacter> => ({
    data: {} as ModelState<ICharacter> | null,
    loading: false,
    error: null as any | null,
    paging: 1
  }),
  actions: {
    async fetchCharacters(page: number): Promise<void> {
      this.loading = true;
      this.error = null;
      this.paging = page || 1;
      try {
        const response: AxiosResponse<IApiDataModel<ICharacter>> = await apiService.get(
          'character',
          { page: page }
        );
        this.data!.results = response.data.results;
      } catch (error) {
        this.error = error;
        console.error("Didn't fetch,\n", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCharacter(id: number): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const response: AxiosResponse<ICharacter> = await apiService.get(`character/${id}`);
        // this.$state.data!.model = response.data;
        this.setCharacterState(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    setCharacterState(character: ICharacter): void {
      this.$state.data!.model = character;
    },
    resetCharacterState(): void {
      this.$state.data!.model = {} as ICharacter;
    }
  }
});
