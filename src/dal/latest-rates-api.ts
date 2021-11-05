import axios from "axios";


export type RateType = {
    [key: string]: number;
};
export type RatesResponseType = {
    base_code: RateType
    rates: RateType
    result: string
}

export const instance = axios.create({
    method: 'GET',
    baseURL: 'https://exchangerate-api.p.rapidapi.com/rapid/latest/',
    headers: {
        'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
        'x-rapidapi-key': 'e817d06739mshe406e098177e879p147060jsn4742de4ee977'
    }
})
export const latestRates = {
    getRates(currencyCode: string) {
        return instance.get<RatesResponseType>(`${currencyCode}`)
    }
}