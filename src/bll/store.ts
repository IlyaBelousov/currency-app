import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {conversionReducer} from "./conversion-reducer";
import {ratesReducer} from "./rates-reducer";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    conversion: conversionReducer,
    rates:ratesReducer,
    app:appReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>