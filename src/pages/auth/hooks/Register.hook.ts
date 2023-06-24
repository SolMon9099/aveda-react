import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'src/redux/store';
import { setSelected } from 'src/redux/slices/auth';
import { useCallback, useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';

type RegisterType = {
    name: string,
    email: string,
    password: string,
    oabNumber: string,
    sectional: string,
    afterSubmit: string,
    photo: any,
    description: string,
}

const useRegister = () => {
    const { register } = useAuth()
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state) => state.auth)

    var defaultValues = {
        name: '',
        email: '',
        password: '',
        oabNumber: '',
        sectional: '',
        photo: '',
        description: ''
    };

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Digite seu Nome Completo'),
        email: Yup.string().email('Insira um e-mail válido').required('Digite o e-mail'),
        password: Yup.string().required('Digite a senha').min(6, 'A senha deve conter pelo menos 6 caracteres'),
        oabNumber: Yup.string().test('teste','Digite um número válido',
        (v) => {
            if(v && v.length < 7){
                return false
            }
            return true
        }),
        sectional: Yup.string(),
        photo: Yup.mixed(),
        description: Yup.string().max(300, 'Tamanho máximo da descrição é de 300 caracteres!!')
    });

    const methods = useForm<RegisterType>({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });
    
    const {
        setError,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting, errors }
    } = methods;

    useEffect(() =>{
        if(isOpen){
            reset()
        }
    },[isOpen, reset])

    const onSubmit = async (data: RegisterType) => {
        var res: any = await register(data.email, data.password, data.name, data.oabNumber, data.sectional, data.photo, data.description)
        if(res?.status !== 200){
            setError('afterSubmit', { ...res, message: res.data.message });
        }
    };

    const handleGoToLogin = () =>{
        reset()
        dispatch(setSelected(1))
    }

    const handleDrop = useCallback(
        (acceptedFiles: any) => {
          const file = acceptedFiles[0];
          console.log(file)
          if (file) {
            setValue(
              'photo',
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
          }
        },
        [setValue]
    );

    const registerHook: any = {
        methods,
        isSubmitting,
        errors,
        handleSubmit,
        onSubmit,
        handleGoToLogin,
        handleDrop
    }

    return{
        registerHook
    }
}

export default useRegister;