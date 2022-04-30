import {ICard} from "../../types/types";
import {ADD_CARD, EDITE_CARD, REMOVE_CARD, SET_DONE, SET_IMPORTANT, UPDATE_CARD} from "../actions/cardActions";

export const addCardAction = (payload: ICard) => ({type: ADD_CARD, payload})
export const removeCardAction = (payload: ICard) => ({type: REMOVE_CARD, payload})
export const setImportantAction = (payload: ICard) => ({type: SET_IMPORTANT, payload})
export const setDoneAction = (payload: ICard) => ({type: SET_DONE, payload})
export const updateCardAction = (payload: ICard) => ({type: UPDATE_CARD, payload})
export const editCardAction = (payload: ICard) => ({type: EDITE_CARD, payload})