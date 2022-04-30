import {CardAction, CardState, ICard} from "../../types/types";
import {ADD_CARD, EDITE_CARD, REMOVE_CARD, SET_DONE, SET_IMPORTANT, UPDATE_CARD} from "../actions/cardActions";

const initialState = {
  cards: localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards') ?? '') : [],
  currentCard: {} as ICard,
  editedCard: {} as ICard
} as CardState

export const cardReducer = (state = initialState, action: CardAction) => {
  switch (action.type) {
    case ADD_CARD:
      return {...state, cards: [...state.cards, action.payload]}
    case REMOVE_CARD:
      return {...state, cards: state.cards.filter(card => card.id !== action.payload.id)}
    case SET_IMPORTANT:
      return {...state, cards: state.cards.map(card => card.id === action.payload.id ? {...card, isImportant: !card.isImportant} : card)}
    case SET_DONE:
      return {...state, cards: state.cards.map(card => card.id === action.payload.id ? {...card, isDone: !card.isDone} : card)}
    case UPDATE_CARD:
      return {...state, currentCard: {...action.payload}}
    case EDITE_CARD:
      return {...state, cards: state.cards.map(card => card.id === action.payload.id ? {...action.payload} : card)}
    default: return state
  }
}
