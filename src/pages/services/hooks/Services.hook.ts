import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useDispatch, useSelector } from "src/redux/store";
import { getServiceList} from "src/redux/slices/service";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { serviceSchema } from "src/@types/service";
import { DropResult } from "react-beautiful-dnd";
import { dropService } from 'src/redux/slices/service';

const useService = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ viewMode, setViewMode] = useState(false)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { serviceList, origin_serviceList} = useSelector((state) => state.service)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ serviceToEdit, setServiceToEdit] = useState<any>(null);
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
        dispatch(getServiceList())
    },[dispatch])

    const onClickService = (id: string) => {
        setServiceToEdit(origin_serviceList.find((act) => act._id === id))
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
        setServiceToEdit(null)
        reset()
    }

    var defaultValues = useMemo(() =>(
        {
          name: serviceToEdit?.name || '',
          processOrCase : serviceToEdit?.processOrCase || '',
          description: serviceToEdit?.description || '',
          type: serviceToEdit?.type || 'service',
          responsible: serviceToEdit?.responsible || [],
          tags: serviceToEdit?.tags || [],
          status: serviceToEdit?.status || 'toDo',
          date: serviceToEdit?.date || moment().format('YYYY-MM-DD'),
          hour: serviceToEdit?.hour || '',
          visibility: serviceToEdit?.visibility || 'public',
          date_str : serviceToEdit?((serviceToEdit.hour && serviceToEdit.date) ? moment(serviceToEdit.date).format('DD/MM/YY') + ' • ' + serviceToEdit.hour : serviceToEdit.date ? moment(serviceToEdit.date).format('DD/MM/YYYY') : ''):''
        }
      ),[serviceToEdit]) 
  
    const NewServiceSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        description: Yup.string().required('Campo obrigatório!'),
        type: Yup.string(),
        responsible: Yup.array().min(1,'Campo obrigatório!'),
        tags: Yup.array(),
        date: Yup.string(),
        hour: Yup.string(),
        visibility: Yup.string()
    });
  
    const methods = useForm<serviceSchema>({
        resolver: yupResolver(NewServiceSchema),
        defaultValues,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if(destination.droppableId === source.droppableId){
            dispatch(dropService(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, true))
        }else{
            dispatch(dropService(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, false))
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
        if(serviceToEdit && defaultValues){
          reset(defaultValues)
        }else if(defaultValues){
          reset(defaultValues)
        }
      },[serviceToEdit, defaultValues, reset])

    const serviceHook: any = {
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
        onClickService,
        setViewMode,
        viewMode,
        onDragEnd
    }

    return{
        serviceHook
    }
}

export default useService;