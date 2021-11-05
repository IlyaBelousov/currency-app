import axios from "axios";

const instance = axios.create({
    method: 'GET',
    baseURL: 'https://currency-exchange.p.rapidapi.com/exchange',
    headers: {
        'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        'x-rapidapi-key': 'e817d06739mshe406e098177e879p147060jsn4742de4ee977'
    }
})

export const exchangeAPI = {
    getCurrencies(from: string, to: string, q: string) {
        return instance.get<number>(``, {params: {from, to, q}})
    }
}