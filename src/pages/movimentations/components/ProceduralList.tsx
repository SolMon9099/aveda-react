import { Box, Button, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TableRox from "src/components/table-rox/TableRox";
import Description from "./Description";
import FilterButtons from "./FilterButtons";
import useProcedural from  "../hooks/ProceduralList.hook";
import { useNavigate } from "react-router-dom";
import Label from "src/components/Label";


export default function ProceduralList({movimentationHook}: any){
    const { proceduralList, isLoadingProceduralList } = useSelector((state) => state.procedural)
    const { proceduralHook } = useProcedural()
    const navigate = useNavigate()

    return(
        <>
            {isLoadingProceduralList ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :((proceduralList.length === 0) ? 
                    <Description />
                :
                    <TableRox
                        data={proceduralList}
                        header={proceduralHook.TABLEHEADER}
                        defaultOrderBy='date'
                        hasRecord
                        hasSearch
                        searchPlaceholder="Pesquisar em 709 publicações..."
                        hasFilter
                        hasDownloadExcel
                        hasDownloadPdf
                        subDescription={proceduralHook.selectedFilter !== '' && proceduralHook.selectedFilterInfo && (
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
                                        color={proceduralHook.selectedFilterInfo.color}
                                        endIcon={<RemoveIcon />}>
                                        {proceduralHook.selectedFilterInfo.label}
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
                                        endIcon={<RemoveIcon />}>
                                        {proceduralHook.selectedFilterInfo.date}
                                    </Label>
                                </Stack>
                            </Stack>
                        )}
                        selectType="all"
                        selectKey="_id"
                        selectedUnit='Publicações Selecionadas'
                        // labelCount="Atendimentos"
                        onClickKey="_id"
                        onClickFunction={(id) => {movimentationHook.onClickProcedural(id)}}
                        titleActions={(
                            <FilterButtons transactionHook={proceduralHook} />
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