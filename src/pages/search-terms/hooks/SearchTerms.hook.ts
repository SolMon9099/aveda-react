import {useEffect, useState, useMemo } from "react";
import { PATH_ERP } from "src/routes/paths";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "src/redux/store";
import { getSearchTermList} from "src/redux/slices/searchTerms";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { newSearchTermTypeSchema } from "src/@types/searchTerms"
import { DropResult } from "react-beautiful-dnd";
import { dropCall } from 'src/redux/slices/call';
import { useSnackbar } from 'notistack';

const useCall = () => {
    const [ currentPage, setCurrentPage ] = useState('list');

    const [ openPopover, setOpenPopover ] = useState(null)
    const [ currentTab, setCurrentTab ] = useState(1)
    const { searchTermList, origin_searchTermList} = useSelector((state) => state.searchTerm)
    const [ selectedIds, setSelectedIds ] = useState<string[]>([])
    const [ callToEdit, setCallToEdit] = useState<any>(null);

    const { enqueueSnackbar } = useSnackbar()

    const navigate = useNavigate()

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
    },[])

    const TABLEHEADER = [
        {id: 'type', label: 'Tipo'},
        {id: 'name', label: 'ClienteNome'},
        {id: 'CPFOrCNPJ', label: 'CPF/CNPJ'},
        {id: 'coverage', label: 'Abrangência'},
        {id: 'recipient', label: 'Destinatário'},
        {id: 'lastUpdate', label: 'Ult. Atualização'},
        {tagsId: 'status', type: 'coloredLabel', label: 'Status'},
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

    const SEARCHSCOPE_OPTIONS = [
        {value: '1', label: 'RS'},
        {value: '2', label: 'SC'},
        {value: '3', label: 'PR'},
    ]
    const RECIPIENT_OPTIONS = [
        {value: '1', label: 'Flávia Vilaça'},
        {value: '2', label: 'Júlio Vargas'},
    ]

    const UPDATE_HISTORY = [
        {action: 'Pesquisa Inativada', name: 'Flávia Vilaça', date: '05/03/23 - 19:09'},
        {action: 'Remoção de Destinatário da Pesquisa: “Flávia Vilaça”', name: 'Júlio Vargas', date: '01/03/23 - 12:39'},
        {action: 'Inclusão de Abrangência da Busca: “SP”', name: 'Flávia Vilaça', date: '15/02/23 - 11:07'},
        {action: 'Remoção de Abrangência da Busca: “RS”, “SC”, “MG”', name: 'Flávia Vilaça', date: '15/02/23 - 11:07'},
        {action: 'Criação da Pesquisa', name: 'Flávia Vilaça', date: '14/02/23 - 10:30'},
    ]

    useEffect(() =>{
        dispatch(getSearchTermList())
    },[dispatch])

    const onClickCall = (id: string) => {
        setCallToEdit(origin_searchTermList.find((act): any => act._id === id))
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
        setCallToEdit(null)
        reset()
    }

    const defaultValues = useMemo(() => ({
        type: 'physical',
        clientName: '',
        OABNumber: '',
        sectional: '',
        CPF: '',
        matter: [],
        searchScope: [],
        recipient: [],

        coperateName: '',
        CNPJ: '',

    }),[]);

    const NewCaseSchema = Yup.object().shape({
        clientName: Yup.string(), // .required('Campo obrigatório!'),
        OABNumber: Yup.string(), // .required('Campo obrigatório!'),
        sectional: Yup.string(), // .required('Campo obrigatório!'),
        CPF: Yup.string(), // .required('Campo obrigatório!'),
        matter: Yup.array(),
        searchScope: Yup.array(),
        recipient: Yup.array(),

        coperateName: Yup.string(), // .required('Campo obrigatório!'),
        CNPJ: Yup.string(), // .required('Campo obrigatório!'),
    });

    const methods = useForm<newSearchTermTypeSchema>({
        resolver: yupResolver(NewCaseSchema),
        defaultValues,
    });


    const onSubmit = async (data: newSearchTermTypeSchema) => {
        try{
            data.type = 'searchTerm'
            
            setCurrentPage('list');
            enqueueSnackbar('Caso cadastrado com sucesso')
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        setCurrentPage('list');
    }

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

    const searchTermHook: any = {
        currentPage,
        openPopover,
        currentTab,
        // POPOVER_OPTIONS,
        // TABS,
        setCurrentPage,
        setCurrentTab,
        setOpenPopover,
        TABLEHEADER,
        // RESPONSIBLE_OPTIONS,
        STATUS_OPTIONS,
        TAGS_OPTIONS,
        VISIBILITY_OPTIONS,
        SEARCHSCOPE_OPTIONS,
        RECIPIENT_OPTIONS,
        UPDATE_HISTORY,
        onSelectAllRows,
        onSelectRow,
        onClose,
        methods,
        values,
        setValue,
        handleSubmit,
        isSubmitting,
        onClickCall,
        onDragEnd,
        onSubmit,
        onCancel
    }

    return{
        searchTermHook
    }
}

export default useCall;