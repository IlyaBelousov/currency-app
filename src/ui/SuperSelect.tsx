import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {fetchLatestRates} from "../bll/rates-reducer";


export const SuperSelect = () => {
    const baseCurrency = useSelector<AppRootStateType, string>(state => state.rates.baseCode)
    const dispatch = useDispatch()
    const handleChange = (event: SelectChangeEvent) => {
        dispatch(fetchLatestRates(event.target.value))
    };
    return <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
        <InputLabel>Base currency</InputLabel>
        <Select
            value={baseCurrency}
            onChange={handleChange}
            label={'Base currency'}
        >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'RUB'}>RUB</MenuItem>
        </Select>
    </FormControl>
};

