import type { IApiDataModel } from '@/models/api-data.model';
import type { ICharacter } from '@/models/character.model';
import type { EditableModelProperties, IStoreState, ModelState } from '@/models/store.model';
import type { AxiosResponse } from 'axios';
import apiService from '@/services/api.service';
import { defineStore } from 'pinia';
import { toast } from 'vue3-toastify';
import { toastifyConfiguration } from '@/configs/toastify.config';
import { fetchFromStorage, storeIntoStorage } from '@/helpers/storage.helper';

export const characterStore = defineStore('character', {
  state: (): IStoreState<ICharacter> => ({
    data: {} as ModelState<ICharacter> | null,
    loading: false,
    error: null as any | null,
    paging: 1,
    pagesTotal: null,
    editMode: false
  }),
  actions: {
    async fetchCharacters(page: number): Promise<void> {
      this.loading = true;
      this.error = null;
      this.paging = page;
      try {
        const response: AxiosResponse<IApiDataModel<ICharacter>> = await apiService.get(
          'character',
          { page: page }
        );

        const storageItems = { ...localStorage };

        this.data!.results = response.data.results.map((item: ICharacter) => {
          if (Object.keys(storageItems).includes(item.id.toString())) {
            return JSON.parse(storageItems[item.id]);
          } else {
            return item;
          }
        });

        this.pagesTotal = response.data.info.pages;
        toast.success(`Characters fetched`, toastifyConfiguration);
      } catch (error) {
        this.error = error;
        toast.error(`Store error: ${error}`, toastifyConfiguration);
        console.error(`Store error:  ${error}`, toastifyConfiguration);
      } finally {
        this.loading = false;
      }
    },
    async fetchCharacter(id: number): Promise<void> {
      this.loading = true;
      this.error = null;

      const tmpFromStorage = fetchFromStorage(id.toString());

      if (tmpFromStorage) {
        this.setCharacterState(tmpFromStorage);
        this.loading = false;
      } else {
        try {
          const response: AxiosResponse<ICharacter> = await apiService.get(`character/${id}`);
          this.setCharacterState(response.data);
        } catch (error) {
          this.error = error;
          toast.error(`Store error: ${error}`, toastifyConfiguration);
          console.error(`Store error:  ${error}`, toastifyConfiguration);
        } finally {
          this.loading = false;
        }
      }
    },
    setCharacterState(character: ICharacter): void {
      this.$state.data!.model = character;
      storeIntoStorage(this.$state.data!.model.id.toString(), character);
      toast.success(`Character state is set`, toastifyConfiguration);
    },
    resetCharacterState(): void {
      this.$state.data!.model = {} as ICharacter;
    },
    updateEditModeState(value: boolean | null = null): void {
      if (value === null) {
        this.$state.editMode = !this.$state.editMode;
        return;
      }
      this.$state.editMode = value;
    },
    updateCharachetStatePropByKey(key: EditableModelProperties, value: string): void {
      this.$state.data!.model[key as EditableModelProperties] = value;
    }
  }
});
