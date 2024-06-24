import type { IApiDataModel } from '@/models/api-data.model';
import type { ICharacter } from '@/models/character.model';
import type { IStoreState, ModelState } from '@/models/store.model';
import type { AxiosResponse } from 'axios';
import apiService from '@/services/api.service';
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import { toastifyConfiguration } from '@/configs/toastify.config';
import { fetchFromStorage, storage, storeIntoStorage } from '@/helpers/storage.helper';

export const characterStore = defineStore('character', {
  state: (): IStoreState<ICharacter> => ({
    data: {} as ModelState<ICharacter>,
    loading: false,
    error: null as any | null,
    paging: 1,
    detailsPaging: 0,
    pagesTotal: null,
    editMode: false,
    totalCount: null
  }),
  actions: {
    async fetchCharacters(page?: number): Promise<void> {
      if (!page) {
        page = this.paging;
      }
      this.loading = true;
      this.error = null;

      this.paging = page;
      try {
        const response: AxiosResponse<IApiDataModel<ICharacter>> = await apiService.get(
          'character',
          { page: this.paging }
        );

        const storageItems = { ...storage };

        this.data!.results = response.data.results.map((item: ICharacter) => {
          if (Object.keys(storageItems).includes(item.id.toString())) {
            return JSON.parse(storageItems[item.id]);
          } else {
            return item;
          }
        });

        this.pagesTotal = response.data.info.pages;
        this.totalCount = response.data.info.count;
        storeIntoStorage('total_characters', this.totalCount);
        toast.success(`Characters fetched`, toastifyConfiguration);
      } catch (error) {
        this.error = error;
        toast.error(`Store error: ${error}`, toastifyConfiguration);
        console.error(`Store error:  ${error}`, toastifyConfiguration);
      } finally {
        this.loading = false;
      }
    },
    async fetchCharacter(id: number, callback?: (character: ICharacter) => void): Promise<void> {
      this.loading = true;
      this.error = null;

      const tmpFromStorage: ICharacter = fetchFromStorage(id.toString()) as ICharacter;

      if (tmpFromStorage) {
        this.setCharacterState(tmpFromStorage as ICharacter);
        if (callback) callback(tmpFromStorage as ICharacter);
        this.loading = false;
      } else {
        try {
          const response: AxiosResponse<ICharacter> = await apiService.get(`character/${id}`);
          this.setCharacterState(response.data);
          if (callback) callback(response.data);
        } catch (error) {
          this.error = error;
          toast.error(`Store error: ${error}`, toastifyConfiguration);
          console.error(`Store error:  ${error}`, toastifyConfiguration);
        } finally {
          this.loading = false;
        }
      }
      this.setActiveDetailsPage(Number(id));
    },
    setCharacterState(character: ICharacter): void {
      this.data!.model = character;
      storeIntoStorage(this.data!.model.id.toString(), character);
      toast.success(`Character state is set`, toastifyConfiguration);
    },
    updateEditModeState(value: boolean | null = null): void {
      if (value === null) {
        this.editMode = !this.editMode;
        return;
      }
      this.editMode = value;
    },
    setActiveDetailsPage(pageIndex: number) {
      this.detailsPaging = pageIndex;
    },
    incrementDetailsPage() {
      this.detailsPaging = (this.detailsPaging as number) + 1;
    },
    decrementDetailsPage() {
      this.detailsPaging = (this.detailsPaging as number) - 1;
    }
  }
});
