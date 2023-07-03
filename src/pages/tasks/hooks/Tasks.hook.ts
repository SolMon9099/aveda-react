import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useDispatch, useSelector } from "src/redux/store";
import { getTaskList} from "src/redux/slices/task";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { taskSchema } from "src/@types/task";
import { DropResult } from "react-beautiful-dnd";
import { dropTask } from 'src/redux/slices/task';

const useTask = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ viewMode, setViewMode] = useState(false)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { taskList, origin_taskList} = useSelector((state) => state.task)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ taskToEdit, setTaskToEdit] = useState<any>(null);
    const [ HOUR_OPTIONS, setHOUR_OPTIONS ] = useState<any>([])

    const dispatch = useDispatch()

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

    const POPOVER_OPTIONS = [
        {label: 'Ocultar Atividades Completas'},
    ]
    const TABS = [
        {label: 'Lista', value: 1},
        {label: 'Kanban', value: 2},
    ]

    const TABLEHEADER = [
        {id: 'name', subId: 'description', tagsId: 'tags', label: 'Atividade'},
        {id: 'processOrCase', subId: 'sub_name', label: 'Processo/Caso'},
        {id: 'type', type: 'hasIcon', label: 'Tipo'},
        {id: 'status', type: 'label', label: 'Status'},
        {id: 'responsible', label: 'Responsável'},
        {id: 'date', label: 'Prazo'},
    ]
    const RESPONSIBLE_OPTIONS = [
        {value: '1', label: 'Responsável 1'},
        {value: '2', label: 'Responsável 2'},
    ]
    const STATUS_OPTIONS = [
        {value: 'toDo', label: 'A Fazer'},
        {value: 'onDoing', label: 'Fazendo'},
        {value: 'Done', label: 'Feito'},
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

    

    useEffect(() =>{
        dispatch(getTaskList())
    },[dispatch])

    const onClickTask = (id: string) => {
        setTaskToEdit(origin_taskList.find((act) => act._id === id))
        setOpenModal(true)
        setViewMode(true)
    }

    const onSelectRow = (id: string) => {    
        const selectedIndex = selectedIds.indexOf(id);
    
        let newSelected: string[] = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedIds, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedIds.slice(1));
        } else if (selectedIndex === selectedIds.length - 1) {
          newSelected = newSelected.concat(selectedIds.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedIds.slice(0, selectedIndex),
            selectedIds.slice(selectedIndex + 1)
          );
        }
        setSelectedIds(newSelected);
    };


    const onSelectAllRows = (newSelecteds: string[]) => {
        setSelectedIds(newSelecteds)
    };

    const onClose = () =>{
        setOpenModal(false)
        setViewMode(false)
        setTaskToEdit(null)
        reset()
    }

    var defaultValues = useMemo(() =>(
        {
          name: taskToEdit?.name || '',
          processOrCase : taskToEdit?.processOrCase || '',
          description: taskToEdit?.description || '',
          type: taskToEdit?.type || 'task',
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
        date: Yup.string(),
        hour: Yup.string(),
        visibility: Yup.string()
    });
  
    const methods = useForm<taskSchema>({
        resolver: yupResolver(NewTaskSchema),
        defaultValues,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if(destination.droppableId === source.droppableId){
            dispatch(dropTask(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, true))
        }else{
            dispatch(dropTask(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, false))
        }
    };

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

    const taskHook: any = {
        openPopover,
        currentTab,
        POPOVER_OPTIONS,
        TABS,
        setCurrentTab,
        setOpenPopover,
        TABLEHEADER,
        RESPONSIBLE_OPTIONS,
        STATUS_OPTIONS,
        TAGS_OPTIONS,
        VISIBILITY_OPTIONS,
        onSelectAllRows,
        onSelectRow,
        setOpenModal,
        openModal,
        onClose,
        methods,
        values,
        setValue,
        handleSubmit,
        isSubmitting,
        HOUR_OPTIONS,
        onClickTask,
        setViewMode,
        viewMode,
        onDragEnd
    }

    return{
        taskHook
    }
}

export default useTask;