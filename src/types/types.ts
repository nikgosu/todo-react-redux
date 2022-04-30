
export interface ICard {
  id: number
  info: {
    name: string,
    description: string
  }
  isImportant: boolean
  isDone: boolean
}

export interface CardAction {
  type: string
  payload: ICard
}

export interface CardState {
  cards: ICard[]
  currentCard: ICard
  editedCard: ICard
}

export interface CardReducerState {
  cardReducer: {
    cards: ICard[],
    currentCard: ICard
  }
}
