import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import {carsReducer} from "./carsReducer";

const reducers = combineReducers({
    carsPage: carsReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store
window.store = store;
