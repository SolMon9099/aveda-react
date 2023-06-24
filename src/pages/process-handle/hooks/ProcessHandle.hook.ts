import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from "react-router-dom";
import { newProcessTypeSchema } from 'src/@types/process';
import { PATH_ERP } from 'src/routes/paths';
import moment from 'moment';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useMemo } from 'react';
import { createOrUpdateProcess, getProcessToEdit, resetProcessToEdit } from 'src/redux/slices/processHandle';
import { useSnackbar } from 'notistack';

const useProcessHandle = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { processManualId } = useParams()
    const { processToEdit } = useSelector((state) => state.processHandle)
    const QUALIFY_OPTIONS = [
        {value: '', label: ''},
        {value: 'reu', label: 'Réu'},
        {value: 'autor', label: 'Autor'}
    ]
    const PART_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Orgão 1'},
        {value: '2', label: 'Orgão 2'}
    ]
    const ACTION_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Ação 1'},
        {value: '2', label: 'Ação 2'}
    ]
    const MATTER_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Matéria 1'},
        {value: '2', label: 'Matéria 2'}
    ]
    const COUNTY_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Comarca 1'},
        {value: '2', label: 'Comarca 2'}
    ]
    const INSTANCE_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Instância 1'},
        {value: '2', label: 'Instância 2'}
    ]
    const PHASE_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Fase 1'},
        {value: '2', label: 'Fase 2'}
    ]
    const RESPONSIBLE_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Responsavel 1'},
        {value: '2', label: 'Responsavel 2'}
    ]
    const STATUS_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Status 1'},
        {value: '2', label: 'Status 2'}
    ]
    const ENDTYPE_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Tipo 1'},
        {value: '2', label: 'Tipo 2'}
    ]
    const TAGS_OPTIONS = [
        {value: '1', label: 'Teste 1', color: 'error'},
        {value: '2', label: 'Teste 2', color: 'success'}
    ]

    useEffect(() =>{
        if(processManualId){
            dispatch(getProcessToEdit(processManualId))
        }else{
            dispatch(resetProcessToEdit())
        }
    },[dispatch, processManualId])

    const defaultValues = useMemo(() => ({
        clientName: processToEdit?.clientName || '',
        clientQualify: processToEdit?.clientQualify || '',
        counterName: processToEdit?.counterName || '',
        counterQualify: processToEdit?.counterQualify || '',
        title: processToEdit?.title || '',
        folder: processToEdit?.folder || '',
        tags: processToEdit?.tags || [],
        number: processToEdit?.number || '',
        part: processToEdit?.part?.value || '',
        action: processToEdit?.action?.value || '',
        matter: processToEdit?.matter?.value || '',
        county: processToEdit?.county?.value || '',
        instance: processToEdit?.instance?.value || '',
        phase: processToEdit?.phase?.value || '',
        url: processToEdit?.url || '',
        causeValue: processToEdit?.causeValue || 0,
        object: processToEdit?.object || '',
        strategy: processToEdit?.strategy || '',
        observations: processToEdit?.observations || '',
        responsible: processToEdit?.responsible?.value || '',
        status: processToEdit?.status?.value || '',
        endDate: moment(processToEdit?.endDate).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
        endType: processToEdit?.endType?.value || '',
        endValue: processToEdit?.endValue || 0,
        endObject: processToEdit?.endObject || '',
        endObservations: processToEdit?.endObservations || ''
    }),[processToEdit]);

    const NewProcessSchema = Yup.object().shape({
        clientName: Yup.string().required('Campo obrigatório!'),
        clientQualify: Yup.string().required('Campo obrigatório!'),
        counterName: Yup.string().required('Campo obrigatório!'),
        counterQualify: Yup.string().required('Campo obrigatório!'),
        title: Yup.string().required('Campo obrigatório!'),
        folder: Yup.string().required('Campo obrigatório!'),
        tags: Yup.array(),
        number: Yup.string().required('Campo obrigatório!'),
        part: Yup.string().required('Campo obrigatório!'),
        action: Yup.string().required('Campo obrigatório!'),
        matter: Yup.string().required('Campo obrigatório!'),
        county: Yup.string().required('Campo obrigatório!'),
        instance: Yup.string().required('Campo obrigatório!'),
        phase: Yup.string().required('Campo obrigatório!'),
        url: Yup.string().required('Campo obrigatório!'),
        causeValue: Yup.number().required('Campo obrigatório!'),
        object: Yup.string().required('Campo obrigatório!'),
        strategy: Yup.string().required('Campo obrigatório!'),
        observations: Yup.string().required('Campo obrigatório!'),
        responsible: Yup.string().required('Campo obrigatório!'),
        status: Yup.string().required('Campo obrigatório!'),
        endDate: Yup.string().required('Campo obrigatório!'),
        endType: Yup.string().required('Campo obrigatório!'),
        endValue: Yup.number().required('Campo obrigatório!'),
        endObject: Yup.string().required('Campo obrigatório!'),
        endObservations: Yup.string().required('Campo obrigatório!')
    });

    const methods = useForm<newProcessTypeSchema>({
        resolver: yupResolver(NewProcessSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    useEffect(() => {
        if (!!processManualId && processToEdit) {
            reset(defaultValues);
        }
        if (!processManualId) {
            reset(defaultValues);
        }
    }, [processManualId, processToEdit, reset, defaultValues]);


    const onSubmit = async (data: newProcessTypeSchema) => {
        try{
            data.type = 'process'
            if(!!processManualId){
                data._id = processManualId
                await dispatch(createOrUpdateProcess(data))
                navigate(PATH_ERP.process+'/'+processManualId)
                enqueueSnackbar('Processo atualizado com sucesso')
            }else{
                await dispatch(createOrUpdateProcess(data))
                navigate(PATH_ERP.process)
                enqueueSnackbar('Processo cadastrado com sucesso')
            }
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        navigate(PATH_ERP.process)
    }

    const processHandleHook: any = {
        isEdit: !!processManualId,
        processManualId,
        methods,
        isSubmitting,
        QUALIFY_OPTIONS,
        PART_OPTIONS,
        ACTION_OPTIONS,
        MATTER_OPTIONS,
        COUNTY_OPTIONS,
        INSTANCE_OPTIONS,
        PHASE_OPTIONS,
        RESPONSIBLE_OPTIONS,
        STATUS_OPTIONS,
        ENDTYPE_OPTIONS,
        TAGS_OPTIONS,
        onSubmit,
        onCancel,
        handleSubmit
    }

    return{
        processHandleHook
    }
}

export default useProcessHandle;