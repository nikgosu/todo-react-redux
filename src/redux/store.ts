import {applyMiddleware, combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import {cardReducer} from "./reducers/cardReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  cardReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))