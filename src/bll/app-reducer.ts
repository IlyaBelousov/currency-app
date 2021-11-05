const initialState = {
    error: '',
    isLoading: false
}
type initialStateType = typeof initialState
export const appReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
    switch (action.type) {
        case "APP/SET-IS-LOADING": {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state
    }
}
export const setError = (error: string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setIsLoading = (isLoading: boolean) => {
    return {
        type: 'APP/SET-IS-LOADING',
        isLoading
    } as const
}
export type AppActionsType = ReturnType<typeof setIsLoading>|ReturnType<typeof setError>