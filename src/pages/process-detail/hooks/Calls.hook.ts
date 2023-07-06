import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useDispatch, useSelector } from "src/redux/store";
import { getCallList} from "src/redux/slices/call";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { callSchema } from "src/@types/call";
import { DropResult } from "react-beautiful-dnd";
import { dropCall } from 'src/redux/slices/call';

const useCall = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ viewMode, setViewMode] = useState(false)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { callList, origin_callList} = useSelector((state) => state.call)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ callToEdit, setCallToEdit] = useState<any>(null);
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

    // const POPOVER_OPTIONS = [
    //     {label: 'Ocultar Atividades Completas'},
    // ]

    const TABLEHEADER = [
        {id: 'title', tagsId: 'tags', label: 'Titulo'},
        {id: 'client', label: 'Cliente'},
        {id: 'processOrCase', label: 'Processo / Caso'},
        {id: 'status', label: 'Status'},
        {id: 'answer', label: 'Atend.'},
        {id: 'date', label: 'Ult.Mov.'},
    ]

    const PROCESSTABLEHEADER = [
        {id: 'title', tagsId: 'tags', label: 'Titulo'},
        {id: 'status', label: 'Status'},
        {id: 'answer', label: 'Atend.'},
        {id: 'date', label: 'Ult.Mov.'},
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
        dispatch(getCallList())
    },[dispatch])

    const onClickCall = (id: string) => {
        setCallToEdit(origin_callList.find((act) => act._id === id))
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
        setCallToEdit(null)
        reset()
    }

    var defaultValues = useMemo(() =>(
        {
          name: callToEdit?.name || '',
          processOrCase : callToEdit?.processOrCase || '',
          description: callToEdit?.description || '',
          type: callToEdit?.type || 'call',
          responsible: callToEdit?.responsible || [],
          tags: callToEdit?.tags || [],
          status: callToEdit?.status || 'toDo',
          date: callToEdit?.date || moment().format('YYYY-MM-DD'),
          hour: callToEdit?.hour || '',
          visibility: callToEdit?.visibility || 'public',
          date_str : callToEdit?((callToEdit.hour && callToEdit.date) ? moment(callToEdit.date).format('DD/MM/YY') + ' • ' + callToEdit.hour : callToEdit.date ? moment(callToEdit.date).format('DD/MM/YYYY') : ''):''
        }
      ),[callToEdit]) 
  
    const NewCallSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        description: Yup.string().required('Campo obrigatório!'),
        type: Yup.string(),
        responsible: Yup.array().min(1,'Campo obrigatório!'),
        tags: Yup.array(),
        date: Yup.string(),
        hour: Yup.string(),
        visibility: Yup.string()
    });
  
    const methods = useForm<callSchema>({
        resolver: yupResolver(NewCallSchema),
        defaultValues,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if(destination.droppableId === source.droppableId){
            dispatch(dropCall(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, true))
        }else{
            dispatch(dropCall(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, false))
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
        if(callToEdit && defaultValues){
          reset(defaultValues)
        }else if(defaultValues){
          reset(defaultValues)
        }
      },[callToEdit, defaultValues, reset])

    const callHook: any = {
        openPopover,
        currentTab,
        // POPOVER_OPTIONS,
        // TABS,
        setCurrentTab,
        setOpenPopover,
        TABLEHEADER,
        PROCESSTABLEHEADER,
        // RESPONSIBLE_OPTIONS,
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
        onClickCall,
        setViewMode,
        viewMode,
        onDragEnd
    }

    return{
        callHook
    }
}

export default useCall;