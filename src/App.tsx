import React from 'react';
import './App.module.css';
import s from './App.module.css'
import {AppBar, Box, Button, Container, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Routes, Route, Link} from "react-router-dom";
import {ExchangeCard} from "./ui/ExchangeCard";
import {LatestRates} from "./ui/LatestRates";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {ErrorSnackBar} from "./ui/ErrorSnackBar";


export function App() {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    return <div className={s.appWrapper}>
        <AppBar position={'static'}>
            <Toolbar style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Typography variant={'h6'}>
                    Simple currency exchange
                </Typography>
                <Link to={'/'}>
                    <Button
                        variant={"text"} color={'inherit'}>Currency
                        exchange</Button>
                </Link>
                <Link to={'/rates'}>
                    <Button
                        variant={"text"} color={'inherit'}>Latest
                        Rates</Button>
                </Link>
            </Toolbar>
        </AppBar>
        {isLoading && <Box sx={{width: '100%'}}>
            <LinearProgress/>
        </Box>}
        <Routes>
            <Route path={'/currency-app'} element={<ExchangeCard/>}/>
            <Route path={'/rates'} element={<LatestRates/>}/>
        </Routes>
        <ErrorSnackBar/>
    </div>
}


