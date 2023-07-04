import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { getOptions } from 'src/redux/slices/new-post';
import useAuth from 'src/hooks/useAuth';
import { newPostType } from 'src/@types/post';
import { finishLive, sendMessage } from 'src/redux/slices/live'
import { getMessages } from './../../../redux/slices/live';
import { setIsOpen } from "src/redux/slices/auth";

const useLive = () => {
    const { user,isAuthenticated } = useAuth()
    const { selectedPost } = useSelector((state) => state.post)
    const [ currentTab, setCurrentTab ] = useState(1)
    const [ currentTabCard, setCurrentTabCard ] = useState(1)
    const [ radio, setRadio ] = useState('now')
    const [ date, setDate ] = useState(new Date())
    const [ file, setFile ] = useState([])
    const dispatch = useDispatch()
    const [images, setImages] = useState([])
    const [links, setLinks] = useState([])

    useEffect(() =>{
        dispatch(getOptions(user?.id))
        dispatch(getMessages(selectedPost?._id))
    },[dispatch, user?.id, selectedPost?._id])

    const NewPostSchema = 
    Yup.object().shape({
        message: Yup.string().required('Escreva uma mensagem').max(300, 'Tamanho máximo do título é de 300 caracteres!!'),
    });


    const methods = useForm<newPostType>({
        resolver: yupResolver(NewPostSchema),
    });
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    const handleFinishLive = async(liveId:any) =>{
        await dispatch(finishLive(liveId))
    }

    const handleChat = () =>{
        if(!isAuthenticated && selectedPost){
            dispatch(setIsOpen(true))
        }
    }

    const onSubmit = async (data: newPostType) => {
        try{
            if(data.message && data.message !== ''){
                var author = {
                    name:user?.name,
                image:user?.photo,
            }

            var date = new Date()

            await dispatch(sendMessage(selectedPost?.isAuthor,selectedPost?._id,author,data.message,date))
            reset()
            //resetField('message',{ defaultValue: "" })
        }
        }catch(e){
            console.log(e)
        }
    };



    const liveHook: any = {
        images,
        links,
        methods,
        isSubmitting,
        currentTab,
        currentTabCard,
        radio,
        date,
        file,
        setFile,
        setDate,
        setRadio,
        setCurrentTab,
        setCurrentTabCard,
        setImages,
        setLinks,
        handleSubmit,
        handleChat,
        handleFinishLive,
        onSubmit,
    }

    return{
        liveHook
    }
}

export default useLive;