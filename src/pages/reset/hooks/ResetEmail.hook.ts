import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { setSelected } from 'src/redux/slices/auth';
import { useEffect } from 'react';
import { getResetLink } from 'src/redux/slices/reset'

type ResetType = {
    email:string
    afterSubmit: string,
}

const useResetEmail = () => {
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.auth)

    var defaultValues = {
        email: '',
    };

    const ResetSchema = Yup.object().shape({
        email: Yup.string().email('Digite um email válido').required('Digite o email'),
    });

    const methods = useForm<ResetType>({
        resolver: yupResolver(ResetSchema),
        defaultValues,
    });
    
    const {
        setError,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = methods;

    useEffect(() =>{
        if(isOpen){
            reset()
        }
    },[isOpen, reset])

    const onSubmitEmail = async (data: ResetType) => {
        console.log("ONSUBMITEMAIL")
        console.log("DATA> ",data)
        const res : any = await dispatch(getResetLink(data.email))
        if(!res){
            setError('afterSubmit',{message:'Erro, email inexistente'});
        }
    };

    const handleGoToLogin = () =>{
        reset()
        dispatch(setSelected(1))
    }

    const handleGoToRegister = () =>{
        reset()
        dispatch(setSelected(2))
    }

    const resetEmailHook: any = {
        methods,
        isSubmitting,
        errors,
        handleSubmit,
        onSubmitEmail,
        handleGoToLogin,
        handleGoToRegister
    }

    return{
        resetEmailHook
    }
}

export default useResetEmail;