import { atom } from "nanostores";

export const $searchValue = atom<undefined | string>(undefined);
export const $searchResults = atom([]);
