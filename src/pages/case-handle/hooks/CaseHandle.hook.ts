import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { newCaseTypeSchema } from 'src/@types/process';
import { PATH_ERP } from 'src/routes/paths';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useMemo } from 'react';
import { createOrUpdateCase, getCaseToEdit, resetCaseToEdit } from 'src/redux/slices/caseHandle';
import { useSnackbar } from 'notistack';

const useCaseHandle = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { caseManualId } = useParams()
    const { caseToEdit } = useSelector((state) => state.caseHandle)
    const MATTER_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Matéria 1'},
        {value: '2', label: 'Matéria 2'}
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
        clientName: caseToEdit?.clientName || '',
        title: caseToEdit?.title || '',
        folder: caseToEdit?.folder || '',
        number: caseToEdit?.number || '',
        tags: caseToEdit?.tags || [],
        matter: caseToEdit?.matter?.value || '',
        observations: caseToEdit?.observations || '',
        responsible: caseToEdit?.responsible?.value || ''
    }),[caseToEdit]);

    const NewCaseSchema = Yup.object().shape({
        clientName: Yup.string().required('Campo obrigatório!'),
        title: Yup.string().required('Campo obrigatório!'),
        folder: Yup.string().required('Campo obrigatório!'),
        number: Yup.string(),
        tags: Yup.array(),
        matter: Yup.string().required('Campo obrigatório!'),
        observations: Yup.string().required('Campo obrigatório!'),
        responsible: Yup.string().required('Campo obrigatório!')
    });

    const methods = useForm<newCaseTypeSchema>({
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


    const onSubmit = async (data: newCaseTypeSchema) => {
        try{
            data.type = 'case'
            if(!!caseManualId){
                data._id = caseManualId;
                await dispatch(createOrUpdateCase(data))
                navigate(PATH_ERP.case+'/'+caseManualId)
                enqueueSnackbar('Caso atualizado com sucesso')
            }else{
                await dispatch(createOrUpdateCase(data))
                navigate(PATH_ERP.process)
                enqueueSnackbar('Caso cadastrado com sucesso')
            }
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        navigate(PATH_ERP.process)
    }

    const caseHandleHook: any = {
        isEdit: !!caseManualId,
        caseManualId,
        methods,
        isSubmitting,
        MATTER_OPTIONS,
        RESPONSIBLE_OPTIONS,
        TAGS_OPTIONS,
        onSubmit,
        onCancel,
        handleSubmit
    }

    return{
        caseHandleHook
    }
}

export default useCaseHandle;