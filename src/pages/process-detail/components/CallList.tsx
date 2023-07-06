import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import Markdown from "src/components/Markdown";
import { useSelector } from "src/redux/store";
import TableRox from "src/components/table-rox/TableRox";
import useCall from "../hooks/Calls.hook";
import { useNavigate } from "react-router-dom";
import useServiceList from "../hooks/ServiceList.hook";
import { PATH_ERP } from "src/routes/paths"


export default function CallList(){
    const { callList, isLoadingCallList } = useSelector((state) => state.call)
    const { callHook } = useCall()
    const navigate = useNavigate()

    return(
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography variant='h4'>
                            Lista de Atendimentos
                        </Typography>
                        <Button
                            onClick={() => navigate(PATH_ERP.callHandle)}
                            variant='contained'
                        >
                            Novo Atendimento
                        </Button>
                    </Stack>
                    
                    <TableRox
                        data={callList}
                        header={callHook.PROCESSTABLEHEADER}
                        defaultOrderBy='name'
                        hasRecord
                        labelCount="Atendimentos"
                    />
                </Stack>
            </CardContent>
        </Card>
    )
}