import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { StoreApi, UseBoundStore } from "zustand";

type GenericState = Record<string, any>;

export const createStoreWithSelectors = <T extends GenericState>(
  store: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <
    K extends keyof T,
  >(
    keys: K[],
  ) => {
    return store((state) => {
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow);
  };

  return useStore;
};

interface IStoreAction {
  startRoll: boolean;
  setStartRoll: (value: boolean) => void;
}

const useActionStore = create<IStoreAction>((set) => ({
  startRoll: false,
  setStartRoll: (value) => set((state) => ({ ...state, startRoll: value })),
}));

export const useAction = createStoreWithSelectors(useActionStore);
