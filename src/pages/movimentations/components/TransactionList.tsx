import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TableRox from "src/components/table-rox/TableRox";
import Description from "./Description";
import FilterButtons from "./FilterButtons";
import useTransactionList from "../hooks/TransactionList.hook";
import { useNavigate } from "react-router-dom";
import Label from "src/components/Label";


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
                :((transactionList.length === 0) ? 
                    <Description />
                :
                    <TableRox
                        data={transactionList}
                        header={transactionHook.TABLEHEADER}
                        defaultOrderBy='date'
                        hasRecord
                        hasSearch
                        searchPlaceholder="Pesquisar em 709 publicações..."
                        hasFilter
                        hasDownloadExcel
                        hasDownloadPdf
                        subDescription={transactionHook.selectedFilter !== '' && transactionHook.selectedFilterInfo && (
                            <Stack direction={'row'} >
                                <Stack direction={'row'} ml={3}>
                                    <Typography
                                        variant="body2"
                                    >
                                        Stauts:
                                    </Typography>
                                    <Label
                                        sx={{
                                            marginLeft: '10px',
                                        }}
                                        variant="filled"
                                        color={transactionHook.selectedFilterInfo.color}
                                        endIcon={<HighlightOffIcon />}>
                                        {transactionHook.selectedFilterInfo.label}
                                    </Label>
                                </Stack>
                                <Stack direction={'row'} ml={5}>
                                    <Typography
                                        variant="body2"
                                    >
                                        Data:
                                    </Typography>
                                    <Label
                                        sx={{
                                            opacity: 0.18,
                                            marginLeft: '10px',
                                        }}
                                        variant="filled"
                                        color={'grey_500'}
                                        endIcon={<HighlightOffIcon />}>
                                        {transactionHook.selectedFilterInfo.date}
                                    </Label>
                                </Stack>
                            </Stack>
                        )}
                        selectType="all"
                        selectKey="_id"
                        selectedUnit='Publicações Selecionadas'
                        // labelCount="Atendimentos"
                        onClickKey="_id"
                        onClickFunction={(id) => {movimentationHook.onClickTransaction(id, transactionList)}}
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
                )
            }
        </>
    )
}