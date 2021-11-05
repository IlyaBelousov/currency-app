import {exchangeAPI} from "../dal/exchange-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {AppActionsType, setError, setIsLoading} from "./app-reducer";


const initialState = {
    convertValues: {
        from: '',
        to: '',
    },
    result: 0
}
type InitialStateType = typeof initialState

export const conversionReducer = (state: InitialStateType = initialState, action: ConvertActionsType): InitialStateType => {
    switch (action.type) {
        case 'CONVERSION/CONVERT-CURRENCY': {
            debugger
            return {
                ...state,
                convertValues: {...action.payload},
            }
        }
        case "CONVERSION/SET-RESULT":{
            debugger
            return {
                ...state,
                result: action.result
            }
        }
        default:
            return state
    }
}

//actions
const setCurrency = (payload: { from: string, to: string, amount: string }) => {
    return {
        type: 'CONVERSION/CONVERT-CURRENCY',
        payload,
    } as const
}
const setResult = ( result: number) => {
    return {
        type: 'CONVERSION/SET-RESULT',
        result
    } as const
}

export type ConvertActionsType =
    ReturnType<typeof setCurrency>
    | ReturnType<typeof setResult>
    | AppActionsType

//thunk
export const convertCurrency = (from: string, to: string, amount: string) => (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    exchangeAPI.getCurrencies(from, to, amount)
        .then(response => {
            dispatch(setIsLoading(false))
            let result = response.data;
            dispatch(setResult(Math.ceil(+amount*result)))
            dispatch(setCurrency({from, to, amount}))
        })
        .catch((error: AxiosError) => {
            dispatch(setIsLoading(false))
            dispatch(setError(error.message))
        })
}