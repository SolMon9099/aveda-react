import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { setSelected } from 'src/redux/slices/auth';
import { useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';

type LoginType = {
    email: string,
    password: string,
    afterSubmit: string
}

const useLogin = () => {
    const { login } = useAuth()
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.auth)

    var defaultValues = {
        email: '',
        password: ''
    };

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Insira um e-mail válido').required('Digite o e-mail'),
        password: Yup.string().required('Digite a senha'),
    });

    const methods = useForm<LoginType>({
        resolver: yupResolver(LoginSchema),
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

    const onSubmit = async (data: LoginType) => {
        const res: any = await login(data.email, data.password)
        if(res.status !== 200){
            setError('afterSubmit', { ...res, message: res.data.message });
        }
    };

    const handleGoToRegister = () =>{
        reset()
        dispatch(setSelected(2))
    }

    const handleGoToReset = () =>{
        reset()
        dispatch(setSelected(3))
    }

    const loginHook: any = {
        methods,
        isSubmitting,
        errors,
        handleSubmit,
        onSubmit,
        handleGoToRegister,
        handleGoToReset
    }

    return{
        loginHook
    }
}

export default useLogin;