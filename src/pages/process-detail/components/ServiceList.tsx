import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Box, Button, Card, CardContent, Grid, Stack, Typography, IconButton } from "@mui/material";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import moment from "moment";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import Markdown from "src/components/Markdown";
import CallList from "../components/CallList";
import { useSelector } from "src/redux/store";
import useServiceList from "../hooks/ServiceList.hook";
import LinkedActivitiesCard from "../components/LinkedActivitiesCard";
import useResponsive from "src/hooks/useResponsive";
import { useEffect, useState } from "react";


export default function ServiceList({processDetailHook, activitiesListHook} : any){
    const { process } = useSelector((state) => state.processDetail)
    const { callList } = useSelector((state) => state.call)
    const { serviceListHook } = useServiceList()
    const isDesktop = useResponsive('up', 'md');
    const [call, setCall] = useState<any>()

    useEffect(() => {
        if (serviceListHook?.selectedId && callList?.length) {
            var call = callList.filter(d => d._id === serviceListHook.selectedId)[0]
            setCall(call);
        }
    }, [callList, serviceListHook.selectedId])

    return(
        <Stack spacing={3}>
            <Grid container item md={12} xs={12}>
                {serviceListHook.openList ? 
                    <Grid item md={12} xs={12}>
                        <CallList serviceListHook={serviceListHook} />
                    </Grid>
                    :
                    <Stack direction={'row'} justifyContent='space-between'>
                        <Grid item md={7.5} xs={12}>
                            <Card>
                                <CardContent>
                                    <Stack
                                        sx={{
                                            paddingBottom: '20px',
                                            marginBottom: '20px',
                                            borderBottom: '1px solid #919EAB',
                                        }}
                                        spacing={4} direction='row' alignItems='center' justifyContent='space-between'>
                                        <Stack spacing={3} direction={'row'}>
                                            <IconButton color="primary" onClick={() => serviceListHook.setOpenList(true)}>
                                                <Iconify icon='material-symbols:arrow-back'/>
                                            </IconButton>
                                            <Stack>
                                                <Typography variant='h6'>
                                                    {call?.title}
                                                </Typography>
                                                <Stack direction='row' spacing={1}>
                                                    {call?.tags.map((tag: any) =>
                                                        <Label
                                                            color={tag.color as any}
                                                            variant="filled"
                                                        >
                                                            {tag.title}
                                                        </Label>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                        
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
                                            <Iconify icon='ic:outline-more-vert'/>
                                        </IconButton>
                                        
                                    </Stack>
                                    <Stack spacing={4}>
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
                                                    <Grid item spacing={3} xs={12}>
                                                        <Typography variant='h6'>
                                                            Novo Atendimento
                                                        </Typography>
                                                    </Grid>
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
                                </CardContent>
                            </Card>
                        </Grid>
                        {isDesktop &&
                            <Grid item md={4} xs={0}>
                                <LinkedActivitiesCard type='service' activitiesListHook={activitiesListHook} processDetailHook={processDetailHook}/>
                            </Grid>
                        }
                    </Stack>
                }
            </Grid>
        </Stack>
    )
}