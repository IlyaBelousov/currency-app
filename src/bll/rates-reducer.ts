import {latestRates, RateType} from "../dal/latest-rates-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {AppActionsType, setError, setIsLoading} from "./app-reducer";

const initialState = {
    baseCode: navigator.language === 'ru-RU' ? 'RUB' : 'USD',
    rates: {} as RateType
}
type initialStateType = typeof initialState

export const ratesReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "RATES/CHANGE-BASE-CURRENCY": {
            return {
                ...state,
                baseCode: action.baseCurrency
            }
        }
        case "RATES/SET-RATES": {
            return {
                ...state,
                rates: {...action.rates}
            }
        }

        default :
            return state
    }
}
//actions
export const changeBaseCurrency = (baseCurrency: string) => {
    return {
        type: 'RATES/CHANGE-BASE-CURRENCY',
        baseCurrency
    } as const
}
export const setRates = (rates: RateType) => {
    return {
        type: 'RATES/SET-RATES',
        rates
    } as const
}



type ActionsType =
    ReturnType<typeof changeBaseCurrency>
    | ReturnType<typeof setRates>
    | AppActionsType
//thunk
export const fetchLatestRates = (currencyCode: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setIsLoading(true))
    latestRates.getRates(currencyCode)
        .then(response => {
            dispatch(setIsLoading(false))
            let rates = response.data.rates
            delete rates[currencyCode]
            dispatch(setRates(rates))
            dispatch(changeBaseCurrency(currencyCode))
        })
        .catch((error: AxiosError) => {
            dispatch(setIsLoading(false))
            dispatch(setError(error.message))
        })
}