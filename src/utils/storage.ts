import { EStorage, EStorageKeys } from "../models";

type TStorageMethods = {
  set?: (key: string) => void;
  get?: () => any;
  remove?: () => void;
  clear?: () => void;
};
type TStorageType = {
  type: EStorage;
  key: EStorageKeys;
};
export const STORAGE = ({ type, key }: TStorageType): TStorageMethods => {
  const decisionStorage = {
    [EStorage.LOCAL]: [window.localStorage],
    [EStorage.SESSION]: [window.sessionStorage],
    [EStorage.ALL]: [window.localStorage, window.sessionStorage]
  };
  function set(data) {
    for (const item of decisionStorage[type]) {
      item.setItem(key, JSON.stringify(data));
    }
  }
  function get() {
    return JSON.parse(decisionStorage[type][0].getItem(key));
  }
  function remove() {
    for (const item of decisionStorage[type]) {
      item.removeItem(key);
    }
  }
  function clear() {
    for (const item of decisionStorage[type]) {
      item.clear();
    }
  }
  return {
    set,
    get,
    remove,
    clear
  };
};
