import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { setSelected } from 'src/redux/slices/auth';
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { getResetLink, resetPassword } from 'src/redux/slices/reset'
import { useNavigate } from 'react-router-dom';
import { PATH_FORUM } from "src/routes/paths";
type ResetType = {
    password: string,
    confirm: string,
    afterSubmit: string,
    email?:any
}

const useReset = () => {
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.auth)
    const { hashUser } = useParams()
    const navigate = useNavigate()
    var defaultValues = {
        password: '',
        confirm: '',
    };

    const ResetSchema = Yup.object().shape({
        password: Yup.string().required('Digite a senha').min(6, 'A senha deve conter pelo menos 6 caracteres'),
        confirm: Yup.string().oneOf([Yup.ref('password'), null], "Senhas não são iguais").required('Digite a senha').min(6, 'A senha deve conter pelo menos 6 caracteres'),
    });

    const methods = useForm<ResetType>({
        resolver: yupResolver(ResetSchema),
        defaultValues,
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting, errors }
    } = methods;

    useEffect(() =>{
        if(isOpen){
            reset()
        }
    },[isOpen, reset])

    const onSubmit = async (data: ResetType) => {
        console.log("DATA> ",data)
        console.log("hashUser > ",hashUser)
        await dispatch(resetPassword(data.password, hashUser))
        navigate(PATH_FORUM.feed)
        // if(res.status !== 200){
        //     setError('afterSubmit', { ...res, message: res.data.message });
        // }
    };

    const onSubmitEmail = async (data: ResetType) => {
        console.log("ONSUBMITEMAIL")
        console.log("DATA> ",data)
        await dispatch(getResetLink(data.email))
        // if(res.status !== 200){
        //     setError('afterSubmit', { ...res, message: res.data.message });
        // }
    };

    const handleGoToLogin = () =>{
        reset()
        dispatch(setSelected(1))
    }

    const handleGoToRegister = () =>{
        reset()
        dispatch(setSelected(2))
    }

    const resetHook: any = {
        methods,
        isSubmitting,
        errors,
        handleSubmit,
        onSubmit,
        onSubmitEmail,
        handleGoToLogin,
        handleGoToRegister
    }

    return{
        resetHook
    }
}

export default useReset;