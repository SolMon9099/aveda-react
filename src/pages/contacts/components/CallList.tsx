import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import Markdown from "src/components/Markdown";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import TableRox from "src/components/table-rox/TableRox";
import useCall from "../hooks/Calls.hook";
import { useNavigate } from "react-router-dom";
import { PATH_ERP } from "src/routes/paths";


export default function CallList({serviceListHook}: any){
    const { callList, isLoadingCallList } = useSelector((state) => state.call)
    const { callHook } = useCall()
    const navigate = useNavigate()

    return(
        <>
        {isLoadingCallList ?
            <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                <AdevaLoading/>
            </Box>
            :
            <TableRox
                data={callList}
                header={callHook.PROCESSTABLEHEADER}
                defaultOrderBy='name'
                tableTitle="Lista de Atendimentos"
                hasRecord
                labelCount="Atendimentos"
                onClickKey="_id"
                onClickFunction={(id) => {serviceListHook.onClickCall(id)}}
                titleActions={
                    <Button
                        variant='contained'
                        onClick={() => navigate(PATH_ERP.callHandle)}
                    >
                        Novo Atendimento
                    </Button>
                }
            />
        }
        </>
    )
}