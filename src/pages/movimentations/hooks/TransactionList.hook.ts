import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useDispatch, useSelector } from "src/redux/store";
import { getTransactionList} from "src/redux/slices/transaction";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { transactionSchema } from "src/@types/transaction";
import { DropResult } from "react-beautiful-dnd";
import { dropTransaction } from 'src/redux/slices/transaction';

const useTransaction = () => {
    const [ openPopover, setOpenPopover ] = useState(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ viewMode, setViewMode] = useState(false)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { transactionList, origin_transactionList} = useSelector((state) => state.transaction)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ transactionToEdit, setTransactionToEdit] = useState<any>(null);
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
        {id: 'date', label: 'Data'},
        {id: 'process', subId: 'processTitle', label: 'Processo', subColor: 'primary.main'},
        {id: 'daily', label: 'Diário'},
        {id: 'stickOrCounty', label: 'Vara / Comarca', width: '200px'},
        {id: 'search', label: 'Pesquisa'},
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
        {value: 'received', label: 'Recebidas (hoje)', amount: 42, color: 'info.darker', backgroundColor: 'info.lighter'}, // #D0F2FF
        {value: 'revised', label: 'Revisadas (hoje)', amount: 35, color: 'success.darker', backgroundColor: 'success.lighter'}, // #D8FBDE
        {value: 'pending', label: 'Pendentes (hoje)', amount: 7, color: 'warning.darker', backgroundColor: 'warning.lighter'}, // #FFF7CD
        {value: 'pending_all', label: 'Pendentes (todo período)', amount: 32, color: 'error.darker', backgroundColor: 'error.lighter'}, // #FFE7D9
    ]

    useEffect(() =>{
        dispatch(getTransactionList())
    },[dispatch])

    const onClickTransaction = (id: string) => {
        setTransactionToEdit(origin_transactionList.find((act) => act._id === id))
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
        setTransactionToEdit(null)
        reset()
    }

    var defaultValues = useMemo(() =>(
        {
          name: transactionToEdit?.name || '',
          processOrCase : transactionToEdit?.processOrCase || '',
          description: transactionToEdit?.description || '',
          type: transactionToEdit?.type || 'transaction',
          responsible: transactionToEdit?.responsible || [],
          tags: transactionToEdit?.tags || [],
          status: transactionToEdit?.status || 'toDo',
          date: transactionToEdit?.date || moment().format('YYYY-MM-DD'),
          hour: transactionToEdit?.hour || '',
          visibility: transactionToEdit?.visibility || 'public',
          date_str : transactionToEdit?((transactionToEdit.hour && transactionToEdit.date) ? moment(transactionToEdit.date).format('DD/MM/YY') + ' • ' + transactionToEdit.hour : transactionToEdit.date ? moment(transactionToEdit.date).format('DD/MM/YYYY') : ''):''
        }
      ),[transactionToEdit]) 
  
    const NewTransactionSchema = Yup.object().shape({
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
        resolver: yupResolver(NewTransactionSchema),
        defaultValues,
    });

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if(destination.droppableId === source.droppableId){
            dispatch(dropTransaction(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, true))
        }else{
            dispatch(dropTransaction(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, false))
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
        if(transactionToEdit && defaultValues){
          reset(defaultValues)
        }else if(defaultValues){
          reset(defaultValues)
        }
      },[transactionToEdit, defaultValues, reset])

    const transactionHook: any = {
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
        FILTER_BUTTONS,
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
        onClickTransaction,
        setViewMode,
        viewMode,
        onDragEnd
    }

    return{
        transactionHook
    }
}

export default useTransaction;