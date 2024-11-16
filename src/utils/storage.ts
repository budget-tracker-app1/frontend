import { EStorage, EStorageKeys } from "../models";

type TStorageMethods = {
  set: (key: string) => void;
  get: () => any;
  remove: () => void;
  clear: () => void;
};
type TStorageType = {
  type: EStorage;
  key: EStorageKeys;
};
export const STORAGE = ({ type, key }: TStorageType): TStorageMethods => {
  const storage = {
    [EStorage.LOCAL]: [window.localStorage],
    [EStorage.SESSION]: [window.sessionStorage],
    [EStorage.ALL]: [window.localStorage, window.sessionStorage]
  };
  function set(data: any) {
    for (const item of storage[type]) {
      item.setItem(key, JSON.stringify(data));
    }
  }
  function get() {
    return JSON.parse(storage[type][0].getItem(key) ?? '{}');
  }
  function remove() {
    for (const item of storage[type]) {
      item.removeItem(key);
    }
  }
  function clear() {
    for (const item of storage[type]) {
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
