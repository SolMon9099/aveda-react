import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useDispatch, useSelector } from "src/redux/store";
import { getProceduralList} from "src/redux/slices/procedural";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { transactionSchema } from "src/@types/transaction";
import { DropResult } from "react-beautiful-dnd";
import { dropProcedural } from 'src/redux/slices/procedural';

const useProcedural = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ viewMode, setViewMode] = useState(false)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { proceduralList, origin_proceduralList} = useSelector((state) => state.procedural)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ proceduralToEdit, setProceduralToEdit] = useState<any>(null);
    const [ HOUR_OPTIONS, setHOUR_OPTIONS ] = useState<any>([])
    const [ selectedFilter, setSelectedFilter ] = useState<string>('')
    const [ selectedFilterInfo, setSelectedFilterInfo ] = useState<any>(null)

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
        {id: 'date', label: 'Data'},
        {id: 'title',subId: 'process', label: 'Título'},
        {id: 'client',subId: 'folder', label: 'Cliente / Pasta'},
        {id: 'action',subId: 'venue', label: 'Ação / Foro'},
        {tagsId: 'status', type: 'coloredLabel', label: 'Status', width: '50px'},
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

    const FILTER_BUTTONS = [
        {value: 'received', label: 'Recebidas (hoje)', amount: 42, color: 'info.darker', backgroundColor: 'info.lighter', selectedBColor: 'info.main'}, // #D0F2FF
        {value: 'revised', label: 'Revisadas (hoje)', amount: 35, color: 'success.darker', backgroundColor: 'success.lighter', selectedBColor: 'success.main'}, // #D8FBDE
        {value: 'pending', label: 'Pendentes (hoje)', amount: 7, color: 'warning.darker', backgroundColor: 'warning.lighter', selectedBColor: 'warning.main'}, // #FFF7CD
        {value: 'pending_all', label: 'Pendentes (todo período)', amount: 32, color: 'error.darker', backgroundColor: 'error.lighter', selectedBColor: 'error.main'}, // #FFE7D9
    ]

    const FILTER_TYPES = [
        {value: 'received', label: 'Recebidas', date: 'hoje', color: 'info'},
        {value: 'revised', label: 'Revisadas', date: 'hoje', color: 'success'},
        {value: 'pending', label: 'Pendentes', date: 'hoje', color: 'warning'},
        {value: 'pending_all', label: 'Pendentes', date: 'todo período', color: 'warning'},
    ]
    
    useEffect(() =>{
        dispatch(getProceduralList())
    },[dispatch])

    const onClickProcedural = (id: string) => {
        setProceduralToEdit(origin_proceduralList.find((act) => act._id === id))
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
        setProceduralToEdit(null)
        reset()
    }

    var defaultValues = useMemo(() =>(
        {
          name: proceduralToEdit?.name || '',
          processOrCase : proceduralToEdit?.processOrCase || '',
          description: proceduralToEdit?.description || '',
          type: proceduralToEdit?.type || 'procedural',
          responsible: proceduralToEdit?.responsible || [],
          tags: proceduralToEdit?.tags || [],
          status: proceduralToEdit?.status || 'toDo',
          date: proceduralToEdit?.date || moment().format('YYYY-MM-DD'),
          hour: proceduralToEdit?.hour || '',
          visibility: proceduralToEdit?.visibility || 'public',
          date_str : proceduralToEdit?((proceduralToEdit.hour && proceduralToEdit.date) ? moment(proceduralToEdit.date).format('DD/MM/YY') + ' • ' + proceduralToEdit.hour : proceduralToEdit.date ? moment(proceduralToEdit.date).format('DD/MM/YYYY') : ''):''
        }
      ),[proceduralToEdit]) 
  
    const NewProceduralSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        description: Yup.string().required('Campo obrigatório!'),
        type: Yup.string(),
        responsible: Yup.array().min(1,'Campo obrigatório!'),
        tags: Yup.array(),
        date: Yup.string(),
        hour: Yup.string(),
        visibility: Yup.string()
    });
  
    const methods = useForm<transactionSchema>({
        resolver: yupResolver(NewProceduralSchema),
        defaultValues,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if(destination.droppableId === source.droppableId){
            dispatch(dropProcedural(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, true))
        }else{
            dispatch(dropProcedural(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, false))
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
        if(proceduralToEdit && defaultValues){
            reset(defaultValues)
        }else if(defaultValues){
            reset(defaultValues)
        }
    },[proceduralToEdit, defaultValues, reset])

    useEffect(() => {
        if (selectedFilter && selectedFilter !== '') {
            var filterInfo = FILTER_TYPES.filter(d => d.value === selectedFilter)
            setSelectedFilterInfo(filterInfo[0])
        }
    }, [selectedFilter])

    const proceduralHook: any = {
        openPopover,
        currentTab,
        selectedFilter,
        selectedFilterInfo,
        // POPOVER_OPTIONS,
        // TABS,
        setCurrentTab,
        setOpenPopover,
        setSelectedFilter,
        TABLEHEADER,
        PROCESSTABLEHEADER,
        // RESPONSIBLE_OPTIONS,
        STATUS_OPTIONS,
        TAGS_OPTIONS,
        VISIBILITY_OPTIONS,
        FILTER_BUTTONS,
        FILTER_TYPES,
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
        onClickProcedural,
        setViewMode,
        viewMode,
        onDragEnd
    }

    return{
        proceduralHook
    }
}

export default useProcedural;