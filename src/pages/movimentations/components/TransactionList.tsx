import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TableRox from "src/components/table-rox/TableRox";
import FilterButtons from "./FilterButtons";
import useTransactionList from "../hooks/TransactionList.hook";
import { useNavigate } from "react-router-dom";


export default function TransactionList({serviceListHook}: any){
    const { transactionList, isLoadingTransactionList } = useSelector((state) => state.transaction)
    const { transactionHook } = useTransactionList()
    const navigate = useNavigate()

    return(
        <>
            <FilterButtons transactionHook={transactionHook} />
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
                    onClickFunction={(id) => {serviceListHook.onClickTransaction(id)}}
                />
            }
        </>
    )
}