import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Card, CardContent, Grid, Stack, Typography, IconButton } from "@mui/material";
import Iconify from "src/components/Iconify";
import moment from "moment";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import Markdown from "src/components/Markdown";
import { useSelector } from "src/redux/store";
import useServiceList from "../hooks/ServiceList.hook";


export default function ServiceList(){
    const { process } = useSelector((state) => state.caseDetail)
    const { serviceListHook } = useServiceList()

    return(
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Stack spacing={4}>
                        <Stack spacing={4} direction={'row'} justifyContent={'space-between'}>
                            <IconButton
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 1,
                                    backgroundColor: (theme) => theme.palette.grey[300],
                                    color: (theme) => theme.palette.grey[800],
                                    '&:hover':{
                                        backgroundColor: (theme) => theme.palette.grey[500],
                                    }
                                }}
                            >
                                <Iconify icon='mdi:pencil'/>
                            </IconButton>
                        </Stack>
                        {!serviceListHook.openForm ? 
                            <Stack direction='row'>
                                <Button
                                    variant='contained'
                                    onClick={() => serviceListHook.setOpenForm(true)}
                                >
                                    Novo Atendimento
                                </Button>
                                <Box flexGrow={1}/>
                            </Stack>
                            :
                            <FormProvider methods={serviceListHook.methods} onSubmit={serviceListHook.handleSubmit(serviceListHook.onSubmit)}>
                                <Grid container spacing={2}>
                                    <Typography variant='h6'>
                                        Novo Atendimento
                                    </Typography>
                                    <Grid item xs={6}>
                                        <RHFSelect
                                            name="type"
                                            label='Tipo'
                                        >
                                            {serviceListHook.TYPE_OPTIONS.map((opt: any) =>
                                                <option key={'serviceType_'+opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            )}
                                        </RHFSelect>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <RHFTextField
                                            label='Descrição'
                                            name='description'
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <RHFTextField
                                            type='date'
                                            name='date'
                                            label='Data'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <RHFSelect
                                            name='hour'
                                            label='Hora'
                                        >
                                            {serviceListHook.HOUR_OPTIONS.map((opt: any) =>
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            )}
                                        </RHFSelect>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction='row' justifyContent='space-between' spacing={2}>
                                            <Box flexGrow={1}/>
                                            <Button
                                                variant="outlined"
                                                color='inherit'
                                                onClick={() => serviceListHook.onClose()}
                                            >
                                                Cancelar
                                            </Button>
                                            <LoadingButton
                                                loading={serviceListHook.isSubmitting}
                                                type='submit'
                                                variant="contained"
                                            >
                                                Salvar
                                            </LoadingButton>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </FormProvider> 
                        }
                    </Stack>
                    {/* @ts-ignore */}
                    <Timeline>
                        {Object.keys(process?.serviceGrouped).map((key) =>
                            <div key={key}>
                                <TimelineItem sx={{ minHeight: 45, '&:before':{ display: 'none'} }}>
                                    <TimelineSeparator>
                                        <TimelineDot color='primary'/>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <Typography variant="subtitle2" fontWeight='500'>
                                                {key}
                                            </Typography>
                                            <Typography variant="subtitle1" color='text.secondary'>
                                                •
                                            </Typography>
                                            <Typography variant="body2" color='text.secondary'>
                                                {moment(key, 'DD/MM/YYYY').fromNow()}
                                            </Typography>
                                        </Stack>
                                    </TimelineContent>
                                </TimelineItem>
                                {process?.serviceGrouped[key].map((srvc: any, idx: number) =>
                                    <TimelineItem key={'SRVCITEM_'+srvc._id+idx} sx={{ minHeight: 45, '&:before': { display: 'none' } }}>
                                        <TimelineSeparator>
                                            <TimelineDot variant='outlined' color='grey'/>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Stack spacing={1}>
                                                <Stack direction='row' spacing={1} alignItems='center'>
                                                    <Typography variant="subtitle1" fontWeight='500'>
                                                        {srvc.type}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color='text.secondary'>
                                                        •
                                                    </Typography>
                                                    <Typography variant="caption" color='text.secondary'>
                                                        {srvc.responsible?.name}
                                                    </Typography>
                                                </Stack>
                                                <Markdown children={srvc.description} />
                                            </Stack>
                                        </TimelineContent>
                                    </TimelineItem>
                                )}
                            </div>
                        )}
                    </Timeline>
                </Stack>
            </CardContent>
        </Card>
    )
}