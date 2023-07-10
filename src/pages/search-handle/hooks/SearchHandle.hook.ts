import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { newPhysicalPersonTypeSchema } from 'src/@types/transaction';
import { PATH_ERP } from 'src/routes/paths';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useMemo, useState } from 'react';
import { createOrUpdateCase, getCaseToEdit, resetCaseToEdit } from 'src/redux/slices/caseHandle';
import { useSnackbar } from 'notistack';

const useCaseHandle = () => {
    const [ currentTab, setCurrentTab ] = useState(1);
    const [ openModal, setOpenModal ] = useState(false);
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { caseManualId } = useParams()
    const { caseToEdit } = useSelector((state) => state.caseHandle)

    const TABS = [
        {label: 'Pessoa Física', value: 1},
        {label: 'Pessoa Jurídica', value: 2},
    ]
    const SECTIONAL_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'RS'},
        {value: '2', label: 'SC'},
        {value: '3', label: 'PR'},
    ]
    const MATTER_OPTIONS = [
        {value: '1', label: 'Previdenciário'},
        {value: '2', label: 'Cívil'}
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
    const RESPONSIBLE_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Responsável 1'},
        {value: '2', label: 'Responsável 2'}
    ]
    const TAGS_OPTIONS = [
        {value: '1', label: 'Teste 1', color: 'error'},
        {value: '2', label: 'Teste 2', color: 'success'}
    ]

    useEffect(() =>{
        if(caseManualId){
            dispatch(getCaseToEdit(caseManualId))
        }else{
            dispatch(resetCaseToEdit())
        }
    },[dispatch, caseManualId, pathname])

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

        // clientName: caseToEdit?.clientName || '',
        // title: caseToEdit?.title || '',
        // folder: caseToEdit?.folder || '',
        // number: caseToEdit?.number || '',
        // tags: caseToEdit?.tags || [],
        // matter: caseToEdit?.matter?.value || '',
        // observations: caseToEdit?.observations || '',
        // responsible: caseToEdit?.responsible?.value || ''
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

        // clientName: Yup.string().required('Campo obrigatório!'),
        // title: Yup.string().required('Campo obrigatório!'),
        // folder: Yup.string().required('Campo obrigatório!'),
        // number: Yup.string(),
        // tags: Yup.array(),
        // matter: Yup.string().required('Campo obrigatório!'),
        // observations: Yup.string().required('Campo obrigatório!'),
        // responsible: Yup.string().required('Campo obrigatório!')
    });

    const methods = useForm<newPhysicalPersonTypeSchema>({
        resolver: yupResolver(NewCaseSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    useEffect(() => {
        if (!!caseManualId && caseToEdit) {
            reset(defaultValues);
        }
        if (!caseManualId) {
            reset(defaultValues);
        }
    }, [caseManualId, caseToEdit, reset, defaultValues]);


    const onSubmit = async (data: newPhysicalPersonTypeSchema) => {
        try{
            data.type = 'physical'
            if(!!caseManualId){
                // data._id = caseManualId;
                // await dispatch(createOrUpdateCase(data))
                navigate(PATH_ERP.case+'/'+caseManualId)
                enqueueSnackbar('Caso atualizado com sucesso')
            }else{
                // await dispatch(createOrUpdateCase(data))
                // navigate(PATH_ERP.movimentatiosn)
                // enqueueSnackbar('Caso cadastrado com sucesso')
                setOpenModal(true);
            }
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        navigate(PATH_ERP.movimentatiosn)
    }

    const onClose = () => {
        setOpenModal(false)
        navigate(PATH_ERP.movimentatiosn)
    }

    const searchHandleHook: any = {
        currentTab,
        openModal,
        isEdit: !!caseManualId,
        caseManualId,
        methods,
        isSubmitting,
        TABS,
        SECTIONAL_OPTIONS,
        MATTER_OPTIONS,
        SEARCHSCOPE_OPTIONS,
        RECIPIENT_OPTIONS,
        RESPONSIBLE_OPTIONS,
        TAGS_OPTIONS,
        setCurrentTab,
        setOpenModal,
        onSubmit,
        onCancel,
        handleSubmit,
        onClose,
    }

    return{
        searchHandleHook
    }
}

export default useCaseHandle;