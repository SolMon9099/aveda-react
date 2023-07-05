import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from "react-router-dom";
import { newCallTypeSchema } from 'src/@types/call';
import { PATH_ERP } from 'src/routes/paths';
import moment from 'moment';
import { useDispatch, useSelector } from 'src/redux/store';
import { useEffect, useMemo } from 'react';
import { createOrUpdateCall, getCallToEdit, resetCallToEdit } from 'src/redux/slices/callHandle';
import { useSnackbar } from 'notistack';

const useCallHandle = () => {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { callManualId } = useParams()
    const { callToEdit } = useSelector((state) => state.callHandle)
    const TAG_OPTIONS = [
        {value: '', label: ''},
        {value: 'pending', label: 'Pendente'},
        {value: 'priority', label: 'Prioritário'},
        {value: 'earlyStage', label: 'Fase Inicial'},
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
        {value: 'pending', label: 'Pendente', color: 'waiting'},
        {value: 'priority', label: 'Prioritário', color: 'default'},
        {value: 'earlyStage', label: 'Fase Inicial', color: 'analysing'},
    ]

    useEffect(() =>{
        if(callManualId){
            dispatch(getCallToEdit(callManualId))
        }else{
            dispatch(resetCallToEdit())
        }
    },[dispatch, callManualId])

    const defaultValues = useMemo(() => ({
        clientName: callToEdit?.clientName || '',
        clientQualify: callToEdit?.clientQualify || '',
        counterName: callToEdit?.counterName || '',
        counterQualify: callToEdit?.counterQualify || '',
        title: callToEdit?.title || '',
        folder: callToEdit?.folder || '',
        tags: callToEdit?.tags || [],
        number: callToEdit?.number || '',
        part: callToEdit?.part?.value || '',
        action: callToEdit?.action?.value || '',
        matter: callToEdit?.matter?.value || '',
        county: callToEdit?.county?.value || '',
        instance: callToEdit?.instance?.value || '',
        phase: callToEdit?.phase?.value || '',
        url: callToEdit?.url || '',
        causeValue: callToEdit?.causeValue || 0,
        object: callToEdit?.object || '',
        strategy: callToEdit?.strategy || '',
        observations: callToEdit?.observations || '',
        responsible: callToEdit?.responsible?.value || '',
        status: callToEdit?.status?.value || '',
        endDate: moment(callToEdit?.endDate).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
        endType: callToEdit?.endType?.value || '',
        endValue: callToEdit?.endValue || 0,
        endObject: callToEdit?.endObject || '',
        endObservations: callToEdit?.endObservations || ''
    }),[callToEdit]);

    const NewCallSchema = Yup.object().shape({
        processOrCase: Yup.string().required('Campo obrigatório!'),
        client: Yup.string().required('Campo obrigatório!'),
        title: Yup.string().required('Campo obrigatório!'),
        tags: Yup.array(),
        type: Yup.string(),
        message: Yup.string().required('Campo obrigatório!')
    });

    const methods = useForm<newCallTypeSchema>({
        resolver: yupResolver(NewCallSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    useEffect(() => {
        if (!!callManualId && callToEdit) {
            reset(defaultValues);
        }
        if (!callManualId) {
            reset(defaultValues);
        }
    }, [callManualId, callToEdit, reset, defaultValues]);


    const onSubmit = async (data: newCallTypeSchema) => {
        try{
            data.type = 'call'
            if(!!callManualId){
                data._id = callManualId
                await dispatch(createOrUpdateCall(data))
                navigate(PATH_ERP.calls+'/'+callManualId)
                enqueueSnackbar('Processo atualizado com sucesso')
            }else{
                await dispatch(createOrUpdateCall(data))
                navigate(PATH_ERP.calls)
                enqueueSnackbar('Processo cadastrado com sucesso')
            }
            reset();
        }catch(e){
            console.log(e)
        }
    };

    const onCancel = () => {
        navigate(PATH_ERP.calls)
    }

    const callHandleHook: any = {
        isEdit: !!callManualId,
        callManualId,
        methods,
        isSubmitting,
        QUALIFY_OPTIONS: TAG_OPTIONS,
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
        callHandleHook
    }
}

export default useCallHandle;