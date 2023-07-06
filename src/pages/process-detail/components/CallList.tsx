import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import Markdown from "src/components/Markdown";
import { useSelector } from "src/redux/store";
import TableRox from "src/components/table-rox/TableRox";
import useCall from "../hooks/Calls.hook";
import { useNavigate } from "react-router-dom";


export default function CallList({serviceListHook}: any){
    const { callList, isLoadingCallList } = useSelector((state) => state.call)
    const { callHook } = useCall()
    const navigate = useNavigate()

    return(
        <>
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
                        onClick={() => {serviceListHook.onClickNewCall()}}
                    >
                        Novo Atendimento
                    </Button>
                }
            />
        </>
    )
}