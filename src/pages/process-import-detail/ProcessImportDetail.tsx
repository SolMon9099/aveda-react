import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import CardDetails from "./components/CardDetails";
import useProcessImportDetail from "./hooks/ProcessImportDetail.hook";


export default function ProcessImportDetail(){
    const navigate = useNavigate()
    const { processImportDetail, isLoadingProcessImportDetail } = useSelector((state) => state.processImportList)
    const { processImportDetailHook } = useProcessImportDetail()
    
    return(
        <Page title='Detalhe do Lote de Processo'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingProcessImportDetail ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate(PATH_ERP.importListProcess)}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Stack>
                            <Typography variant='h5'>
                                {processImportDetail?.tribunal}
                            </Typography>
                            <Typography variant='body1'>
                                {processImportDetail?.county}
                            </Typography>
                        </Stack>
                    </Stack>
                    <CardDetails/>
                    <TableRox
                        header={processImportDetailHook.TABLE_HEADER}
                        data={processImportDetail?.processList || []}
                        tableTitle='Resultados da Pesquisa do Lote'
                        tableSubtitle="Selecione os processos que você deseja trazer para o ERP Adêva e clique em Importar"
                        hasSearch
                        hasCount
                        labelCount="Processos"
                        defaultOrderBy='processNumber'
                        selectKey="_id"
                        selectType="all"
                        onSelectRowFunction={processImportDetailHook.onSelectRow}
                        onSelectAllRowFunction={processImportDetailHook.onSelectAllRows}
                        selectActions={
                            <Button 
                                variant='contained'
                                onClick={() => processImportDetailHook.importProcess()}
                            >
                                Importar Processos
                            </Button>
                        }

                    />
                </Stack>
            }
            </Container>
        </Page>
    )
}