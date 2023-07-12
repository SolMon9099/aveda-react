import { useDispatch } from 'src/redux/store';
import { useEffect, useRef, useState, useMemo } from 'react';
import { addEvent, deleteEvent, editEvent, getCalendar } from 'src/redux/slices/calendar';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import { CalendarView } from 'src/@types/calendar';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { taskSchema } from "src/@types/task";
import { useSnackbar } from 'notistack';
import { _calendarList } from 'src/_mock/_calendar';

const useCalendar = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())
    const [view, setView] = useState<CalendarView>('timeGridWeek');
    const [selectedResponsibles, setSelectedResponsibles] = useState<{label: string, value: string, color: string}[]>([]);
    const calendarRef = useRef<FullCalendar>(null);
    const [taskToEdit, setTaskToEdit] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const RESPONSIBLE_OPTIONS = [
        {value: '1', label: 'Flávia Vilaça', color: 'warning'},
        {value: '2', label: 'Júlio Vargas', color: 'success'},
    ]
    const TAGS_OPTIONS = [
        {value: '1', label: 'Urgente', color: 'error'},
        {value: '2', label: 'Prioritário', color: 'success'},
        {value: '3', label: 'Análise', color: 'primary'}
    ]
    const VISIBILITY_OPTIONS = [
        {value: 'private', label: 'Privado'},
        {value: 'public', label: 'Público'},
    ]
    const STATUS_OPTIONS = [
        {value: 'toDo', label: 'A Fazer'},
        {value: 'onDoing', label: 'Fazendo'},
        {value: 'Done', label: 'Feito'},
    ]
    const [ HOUR_OPTIONS, setHOUR_OPTIONS ] = useState<any>([])

    useEffect(() =>{
        var aux = [{value: '', label: ''}];

        [...Array(24)].map((_,idx) =>{
            if(idx < 10){
                aux.push({value: '0'+idx+':00', label: '0'+idx+':00'})
                aux.push({value: '0'+idx+':30', label: '0'+idx+':30'})
            }else{
                aux.push({value: idx+':00', label: idx+':00'})
                aux.push({value: idx+':30', label: idx+':30'})    
            }
            return true
        })
        setHOUR_OPTIONS(aux)
    },[])

    useEffect(() =>{
        dispatch(getCalendar(selectedResponsibles))
    },[selectedResponsibles])

    const handleClickToday = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleChangeView = (newView: CalendarView) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    var defaultValues = useMemo(() =>(
        {
          name: taskToEdit?.name || '',
          processOrCase : taskToEdit?.processOrCase || '',
          description: taskToEdit?.description || '',
          type: 'event',
          responsible: taskToEdit?.responsible || [],
          tags: taskToEdit?.tags || [],
          status: taskToEdit?.status || 'toDo',
          date: taskToEdit?.date || moment().format('YYYY-MM-DD'),
          hour: taskToEdit?.hour || '',
          visibility: taskToEdit?.visibility || 'public',
          date_str : taskToEdit?((taskToEdit.hour && taskToEdit.date) ? moment(taskToEdit.date).format('DD/MM/YY') + ' • ' + taskToEdit.hour : taskToEdit.date ? moment(taskToEdit.date).format('DD/MM/YYYY') : ''):''
        }
    ),[taskToEdit]) 
  
    const NewTaskSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        description: Yup.string().required('Campo obrigatório!'),
        type: Yup.string(),
        responsible: Yup.array().min(1,'Campo obrigatório!'),
        tags: Yup.array(),
        date: Yup.string().required('Campo obrigatório!'),
        hour: Yup.string().required('Campo obrigatório!'),
        visibility: Yup.string()
    });
  
    const methods = useForm<taskSchema>({
        resolver: yupResolver(NewTaskSchema),
        defaultValues,
    });

    const {
        watch,
        setValue,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;
  
    const values = watch()

    useEffect(() =>{
        if(taskToEdit && defaultValues){
          reset(defaultValues)
        }else if(defaultValues){
          reset(defaultValues)
        }
    },[taskToEdit, defaultValues, reset])

    const onClickTask = (event: EventClickArg) => {
        setTaskToEdit(_calendarList.find((act) => act._id === event.event.id))
        setOpenModal(true)
        setViewMode(true)
    }

    const newEvent = () =>{
        setTaskToEdit(null)
        setOpenModal(true)
        setViewMode(false)
    }

    const onClose = () =>{
        setTaskToEdit(null)
        setOpenModal(false)
    }

    const onSubmit = async (data: taskSchema) => {
        try{
            if(taskToEdit){
                dispatch(editEvent(data))
                enqueueSnackbar('Evento editado com sucesso!')
            }else{
                dispatch(addEvent(data))
                enqueueSnackbar('Evento adicionado com sucesso!')
            }
            reset();
            setOpenModal(false);
        }catch(e){
            console.log(e)
        }
    };

    const handleDeleteEvent = async () =>{
        await dispatch(deleteEvent(taskToEdit.id))
        enqueueSnackbar('Evento deletado com sucesso!')
        setOpenModal(false);
    }

    const calendarHook: any = {
        calendarRef,
        date,
        view,
        selectedResponsibles,
        RESPONSIBLE_OPTIONS,
        HOUR_OPTIONS,
        TAGS_OPTIONS,
        VISIBILITY_OPTIONS,
        STATUS_OPTIONS,
        taskToEdit,
        viewMode,
        openModal,
        methods,
        values,
        isSubmitting,
        setValue,
        handleSubmit,
        handleClickToday,
        handleChangeView,
        handleClickDatePrev,
        handleClickDateNext,
        setSelectedResponsibles,
        newEvent,
        onClose,
        onClickTask,
        onSubmit,
        setViewMode,
        handleDeleteEvent
    }

    return{
        calendarHook
    }
}

export default useCalendar;