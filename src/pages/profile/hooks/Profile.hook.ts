import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { dispatch, useSelector } from 'src/redux/store';
import { useCallback, useEffect } from 'react';
import useAuth from 'src/hooks/useAuth';
import { updateUser } from 'src/redux/slices/profile';

type RegisterType = {
    _id: string,
    name: string,
    email: string,
    password: string,
    oabNumber: string,
    sectional: string,
    afterSubmit: string,
    photo: any,
    description: string,
}

const useProfile = () => {
    const { user } = useAuth()
    const { isOpen } = useSelector((state) => state.profile)

    var defaultValues = {
        name: user?.name,
        oabNumber: user?.oabNumber,
        sectional: user?.sectional,
        photo: user?.photo,
        description: user?.description
    };

    const RegisterSchema = Yup.object().shape({
        name: Yup.string().required('Digite seu Nome Completo'),
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
        try{
            data._id = user?._id
            console.log(data)
            await dispatch(updateUser(data))
            // window.location.reload()
        }catch(e){
            console.log(e)
        }
    };

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

    const profileHook: any = {
        methods,
        isSubmitting,
        errors,
        handleSubmit,
        onSubmit,
        handleDrop
    }

    return{
        profileHook
    }
}

export default useProfile;