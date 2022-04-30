import {store} from "../redux/store";

export const SetLS = (key: string) => {
  if (key === 'cards') {
    localStorage.setItem(key, JSON.stringify(store.getState().cardReducer.cards))
  } else  if (key === 'card') {
    localStorage.setItem(key, JSON.stringify(store.getState().cardReducer.currentCard))
  }
}