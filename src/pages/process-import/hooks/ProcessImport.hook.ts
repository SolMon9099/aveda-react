import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newProcessImportType } from 'src/@types/process';
import { useEffect, useMemo, useState } from 'react';
import useAuth from 'src/hooks/useAuth';
import { getEnrollment, searchProcess } from 'src/redux/slices/processImport';
import { useDispatch, useSelector } from 'src/redux/store';

const useProcessImport = () => {
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { findedUser } = useSelector((state) => state.processImport)
    const [ step, setStep ] = useState(0)
    const [ open, setOpen ] = useState(false)
    const TRIBUNAL_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Tribunal 1'},
        {value: '2', label: 'Tribunal 2'},
    ]
    const COUNTY_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Comarca 1'},
        {value: '2', label: 'Comarca 2'},
    ]
    const SITUATION_OPTIONS = [
        {value: '', label: ''},
        {value: '1', label: 'Situação 1'},
        {value: '2', label: 'Situação 2'},
    ]

    var defaultValues = useMemo(() => ({
        oabNumber: user?.oabNumber || '',
        sectional: user?.sectional || '',
        tribunal: findedUser?.tribunal?.value || '',
        county: findedUser?.county?.value || '',
        situation: findedUser?.situation?.value || ''
    }),[user, findedUser]);

    const NewProcessSchema = Yup.object().shape({
        oabNumber: step === 0 ? Yup.string().required('Campo obrigatório!') : Yup.string(),
        sectional: step === 0 ? Yup.string().required('Campo obrigatório!') : Yup.string(),
        tribunal: step === 1 ? Yup.string().required('Campo obrigatório!') : Yup.string(),
        county: step === 1 ? Yup.string().required('Campo obrigatório!') : Yup.string(),
        situation: step === 1 ? Yup.string().required('Campo obrigatório!') : Yup.string(),
    });

    const methods = useForm<newProcessImportType>({
        resolver: yupResolver(NewProcessSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = async (data: newProcessImportType) => {
        try{
            if(step === 0){
                await dispatch(getEnrollment(data.oabNumber, data.sectional))
                setStep(1)
            }else{
                await dispatch(searchProcess(data))
                setOpen(true)
            }
        }catch(e){
            console.log(e)
        }
    };

    useEffect(() =>{
        if(findedUser && defaultValues){
            reset(defaultValues)
        }else if(defaultValues){
            reset(defaultValues)
        }
    },[findedUser, defaultValues, reset, step])

    const processImportHook: any = {
        methods,
        isSubmitting,
        step,
        open,
        TRIBUNAL_OPTIONS,
        COUNTY_OPTIONS,
        SITUATION_OPTIONS,
        onSubmit,
        handleSubmit,
        setStep,
        setOpen
    }

    return{
        processImportHook
    }
}

export default useProcessImport;