import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Button, Card, Container, Stack, Tooltip, Typography, alpha, useTheme } from "@mui/material";
import AdevaLoading from "src/components/AdevaLoading";
import Page from "src/components/Page";
import useCalendar from "./hooks/Calendar.hook";
import { useSelector } from "src/redux/store";
import { CalendarStyle, CalendarToolbar } from "src/components/calendar";
import TaskModal from './components/TaskModal';
import moment from 'moment';
import MenuPopover from 'src/components/MenuPopover';
import { useState } from 'react';
import Label from 'src/components/Label';


export default function Calendar(){
    const theme = useTheme()
    const { calendarHook } = useCalendar()
    const { isLoadingCalendar, calendarEvents } = useSelector((state) => state.calendar) 

    const toolTipContent = (event: any) => {
        return(
            <Stack spacing={1} p={1} maxWidth={380}>
                <Stack direction='row' spacing={1}>
                    {event?.tags.map((tag: any) =>
                        <Label
                            color={tag.color as any}
                            variant="filled"
                        >
                            {tag.title}
                        </Label>
                    )}
                </Stack>
                <Stack>
                    <Typography variant='subtitle2' color='black' fontWeight={500}>
                        {event.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                        {event.description}
                    </Typography>
                </Stack>
                <Stack spacing={0.5} direction='row' alignItems='center'>
                    <Typography variant='subtitle2' color='black' fontWeight={500}>
                        Cliente:
                    </Typography>
                    <Typography variant='subtitle2' color='black'>
                        {event.sub_name}
                    </Typography>
                </Stack>
                <Stack spacing={0.5} direction='row' alignItems='center'>
                    <Typography variant='subtitle2' color='black' fontWeight={500}>
                        Processo:
                    </Typography>
                    <Typography variant='subtitle2' color='black'>
                        {event.processOrCase}
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    return(
        <Page title='Calendário'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {isLoadingCalendar ? 
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box>
                : 
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                Calendário
                            </Typography>
                            <Button
                                onClick={() => calendarHook.newEvent()}
                                variant='contained'
                            >
                                Novo Evento
                            </Button>
                        </Stack>
                        <Card>
                            <CalendarStyle>
                                <CalendarToolbar
                                    date={calendarHook.date}
                                    view={calendarHook.view}
                                    onNextDate={calendarHook.handleClickDateNext}
                                    onPrevDate={calendarHook.handleClickDatePrev}
                                    onToday={calendarHook.handleClickToday}
                                    onChangeView={calendarHook.handleChangeView}
                                    hasOptions
                                    placeHolder='Advogados'
                                    options={calendarHook.RESPONSIBLE_OPTIONS}
                                    selectedOptions={calendarHook.selectedResponsibles}
                                    onChangeSelectedOptions={(v) => calendarHook.setSelectedResponsibles(v)}
                                />
                                <FullCalendar
                                    allDaySlot={false}
                                    weekends
                                    selectable
                                    locale='pt-br'
                                    events={calendarEvents}
                                    ref={calendarHook.calendarRef}
                                    rerenderDelay={10}
                                    initialDate={calendarHook.date}
                                    initialView={calendarHook.view}
                                    dayMaxEventRows={3}
                                    eventDisplay="flex"
                                    headerToolbar={false}
                                    eventResizableFromStart
                                    eventClick={calendarHook.onClickTask}
                                    eventContent={
                                        (arg) =>
                                        <Stack spacing={2}>
                                            <Tooltip componentsProps={{ tooltip:{sx:{backgroundColor: 'white', boxShadow: theme.shadows[10]}}}} placement='top' title={toolTipContent(arg.event.extendedProps)} sx={{zIndex: 9999999999}}>
                                                <Typography variant='caption' fontWeight='bold' color={arg.textColor ? arg.textColor : 'black'}>
                                                    {moment(arg.event.start).format('HH:mm')} - <Typography variant='caption'>{arg.event.title}</Typography>
                                                </Typography>
                                            </Tooltip>
                                        </Stack>
                                        
                                    }                
                                    height={'50vh'}
                                    plugins={[
                                        listPlugin,
                                        dayGridPlugin,
                                        timelinePlugin,
                                        timeGridPlugin,
                                        interactionPlugin,
                                    ]}
                                />
                            </CalendarStyle>
                        </Card>
                    </Stack>
                }
            </Container>
            <TaskModal calendarHook={calendarHook}/>
        </Page>
    )
}