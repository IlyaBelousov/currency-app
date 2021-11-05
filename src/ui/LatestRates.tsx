import React, {ChangeEvent, useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {latestRates, RateType} from "../dal/latest-rates-api";
import {SuperSelect} from "./SuperSelect";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {fetchLatestRates} from "../bll/rates-reducer";


interface Column {
    id: 'name' | 'code';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const LatestRates = () => {
    const baseCurrency = useSelector<AppRootStateType, string>(state => state.rates.baseCode)
    const rates = useSelector<AppRootStateType, RateType>(state => state.rates.rates)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchLatestRates(baseCurrency))
    }, [])
    const columns: readonly Column[] = [
        {id: 'name', label: baseCurrency, minWidth: 70},
        {id: 'code', label: 'Rate', minWidth: 20},

    ];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return <>
        <SuperSelect/>
        <Paper sx={{width: '40%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, fontSize: '16px'}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(rates)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                                        {
                                            <TableCell key={columns[0].id} align={columns[0].align}>
                                                {'1 '}{baseCurrency}
                                            </TableCell>
                                        }
                                        {<TableCell key={columns[1].id} >
                                            {rates[row]} {row}
                                        </TableCell>
                                        }
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={Object.keys(rates).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
}


