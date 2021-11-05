import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./ExchangeCard.module.css";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {convertCurrency} from "../bll/conversion-reducer";

export const ExchangeCard = () => {
    const result = useSelector<AppRootStateType,number>(state=>state.conversion.result)
    const currency = useSelector<AppRootStateType,string>(state=>state.conversion.convertValues.to)
    const dispatch = useDispatch()
    const userLang = navigator.language || navigator.userAgent;
    console.log(userLang);

    const exchangePattern = /^[0-9]{1,9}\s[A-Z]{3}\s[A-Z]{2}\s[A-Z]{3}$/i
    let amount = /^[0-9]{1,9}/
    let from =/[A-Z]{3}/
    let mid = /\s[A-Z]{2}\s/
    let to  = /[A-Z]{3}$/
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (exchangePattern.test(e.currentTarget.value)) {
            setValue(e.currentTarget.value.toUpperCase())
            setError('')
        }
        else {
            setValue(e.currentTarget.value.toUpperCase())
        }
    }
    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            if (exchangePattern.test(value)) {
                let amountw = value.slice(value.search(amount),(value.search(from)-value.search(amount)))
                let fromCurrency = value.slice(value.search(from),value.search(mid))
                let toCurr = value.slice(value.search(to),value.length)
                dispatch(convertCurrency(fromCurrency,toCurr,amountw.trim()))
                setError('success')
            }
            else {
                setError('error')
            }
        }
    }
    return <div className={s.currWrapper}>
        <div className={s.currCard}>
            <TextField
                onKeyPress={onKeyPressHandler}
                fullWidth
                error={error==='error'}
                label={'Enter values'}
                onChange={onChangeHandler}
                variant={'standard'}
                placeholder={'Example: 15 usd in rub'}
                helperText={error==='error'?'Incorrect value':''}
                value={value}
            />
            <div className={s.resultContainer}>
                <span>{result&&result }</span><span>{currency}</span>
            </div>
        </div>
    </div>
};

