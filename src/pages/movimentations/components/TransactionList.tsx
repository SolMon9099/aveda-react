import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TableRox from "src/components/table-rox/TableRox";
import FilterButtons from "./FilterButtons";
import useTransactionList from "../hooks/TransactionList.hook";
import { useNavigate } from "react-router-dom";


export default function TransactionList({movimentationHook}: any){
    const { transactionList, isLoadingTransactionList } = useSelector((state) => state.transaction)
    const { transactionHook } = useTransactionList()
    const navigate = useNavigate()

    return(
        <>
            {isLoadingTransactionList ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <TableRox
                    data={transactionList}
                    header={transactionHook.TABLEHEADER}
                    defaultOrderBy='date'
                    hasRecord
                    hasSearch
                    hasFilter
                    hasDownloadExcel
                    hasDownloadPdf
                    selectType="all"
                    selectKey="_id"
                    // labelCount="Atendimentos"
                    onClickKey="_id"
                    onClickFunction={(id) => {movimentationHook.onClickTransaction(id)}}
                    titleActions={(
                        <FilterButtons transactionHook={transactionHook} />
                    )}
                    selectActions={(
                        <>
                            <IconButton
                                sx={{
                                    minWidth: 103,
                                    height: 36,
                                    marginLeft: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    lineHeight: '24px',
                                    borderRadius: 1,
                                    border: '1px solid #7C3FFF',
                                    backgroundColor: 'primary.lighter',
                                    opacity: 0.48,
                                    color: 'primary.main',
                                    '&:hover':{
                                        backgroundColor: 'primary.light',
                                    }
                                }}
                                
                                onClick={() => {}}
                            >
                                Descartar
                            </IconButton>
                            <IconButton
                                sx={{
                                    minWidth: 103,
                                    height: 36,
                                    marginLeft: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    lineHeight: '24px',
                                    borderRadius: 1,
                                    border: '1px solid #7C3FFF',
                                    backgroundColor: 'primary.lighter',
                                    opacity: 0.48,
                                    color: 'primary.main',
                                    '&:hover':{
                                        backgroundColor: 'primary.light',
                                    }
                                }}
                                
                                onClick={() => {}}
                            >
                                Bloquear
                            </IconButton>
                            <IconButton
                                sx={{
                                    minWidth: 103,
                                    height: 36,
                                    marginLeft: '12px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    lineHeight: '24px',
                                    borderRadius: 1,
                                    border: '1px solid #7C3FFF',
                                    backgroundColor: 'primary.main',
                                    color: '#fff',
                                    '&:hover':{
                                        backgroundColor: 'primary.light',
                                    }
                                }}
                                
                                onClick={() => {}}
                            >
                                Revisado
                            </IconButton>
                        </>
                    )}
                />
            }
        </>
    )
}