import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import { create, getApiKey, getOptions } from 'src/redux/slices/new-post';
import useAuth from 'src/hooks/useAuth';
import { newPostType } from 'src/@types/post';
import { useNavigate } from 'react-router-dom';
import { PATH_FORUM } from 'src/routes/paths';

const useNewPost = () => {
    const { user } = useAuth()
    const { selectedTopic } = useSelector((state) => state.topic)
    const { selectedCommunity } = useSelector((state) => state.community)
    const [currentTab, setCurrentTab] = useState(1)
    const [currentTabCard, setCurrentTabCard] = useState(1)
    const [radio, setRadio] = useState('now')
    const [date, setDate] = useState(new Date())
    const [file, setFile] = useState([])
    const [erroArquivos, setErrorArquivos] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [images, setImages] = useState([])
    const [links, setLinks] = useState([])

    useEffect(() => {
        dispatch(getOptions(user?.id))
        dispatch(getApiKey(user?.id))
    }, [dispatch, user?.id])

    const TABS = [
        { label: 'Postagem', icon: 'ri-chat-3-line', value: 1 },
        { label: 'Live', icon: 'mdi:access-point', value: 2 }
    ]

    const radioOptions = [
        { label: 'Transmitir Agora', value: 'now' },
        { label: 'Agendada', value: 'schedule' }
    ]

    var defaultValues = {
        isPanda: 0,
        pandaApiKey: user?.pandaApiKey || '',
        title: '',
        body: '',
        attachments: [],
        local: selectedCommunity ? [{ label: selectedCommunity.name, value: selectedCommunity._id }] : [{ label: 'Fórum Adeva', value: 'forum' }],
        topics: selectedTopic ? [{ label: selectedTopic.name, value: selectedTopic._id, fromCommunity: !!selectedTopic.community }] : [],
    };

    const NewPostSchema = Yup.object().shape({
        title: Yup.string().required('Título da publicação é obrigatório!!').max(300, 'Tamanho máximo do título é de 300 caracteres!!'),
        body: Yup.string().required('Mensagem da publicação é obrigatória!!'),
        attachments: Yup.array(),
        local: Yup.array().min(1, 'Selecione o Local da Postagem'),
        topics: Yup.array().min(1, 'Selecione pelo menos um tópico').max(5, 'Você só pode selecionar até 5 tópicos'),
    });

    const NewLiveSchema = Yup.object().shape({
        isPanda: Yup.number(),
        title: Yup.string().required('Título da publicação é obrigatório!!').max(300, 'Tamanho máximo do título é de 300 caracteres!!'),
        body: Yup.string().required('Mensagem da publicação é obrigatória!!'),
        link: Yup.string().when("isPanda", {
            is: (val: number) => val === 0,
            then: Yup.string().required('Link da live é obrigatória!!'),
        }),
        pandaApiKey: Yup.string().when("isPanda", {
            is: (val: number) => val === 1,
            then: Yup.string().required('Chave API do PandaVideo é obrigatória!!'),
        }),
        duration: Yup.number(),
        thumbnail: Yup.string(),
        local: Yup.array().min(1, 'Selecione o Local da Postagem'),
        topics: Yup.array().min(1, 'Selecione pelo menos um tópico').max(5, 'Você só pode selecionar até 5 tópicos'),

    });

    const methods = useForm<newPostType>({
        resolver: yupResolver(currentTab === 1 ? NewPostSchema : NewLiveSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { isSubmitting }
    } = methods;

    const handleDrop = (files: any) => {
        let error = false
        let filesArray = files.map((file: any) => {
            if ((file.size / 1024) <= 36000) {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
            } else {
                error = true
                return true
            }
        });
        if (!error) {
            setFile(filesArray)
        }
        setErrorArquivos(error)
    }

    const handleRemove = (file: any) => {
        const filteredItems = file.filter((_file: any) => _file !== file);
        setFile(filteredItems);
    };

    const onSubmit = async (data: newPostType) => {
        try {
            data.isPanda = data.isPanda === 1
            await dispatch(create(user?.id, data, images, links, currentTab, file, radio, date))
            setImages([])
            setLinks([])
            reset()
            if (selectedTopic) {
                navigate(PATH_FORUM.topico + selectedTopic._id)
            } else if (selectedCommunity) {
                navigate(PATH_FORUM.comunidade + selectedCommunity._id)
            } else {
                navigate(PATH_FORUM.feed)
            }
        } catch (e) {
            console.log(e)
        }
    };

    const onCancel = () => {
        setImages([])
        setLinks([])
        reset()
        if (selectedTopic) {
            navigate(PATH_FORUM.topico + selectedTopic._id)
        } else if (selectedCommunity) {
            navigate(PATH_FORUM.comunidade + selectedCommunity._id)
        } else {
            navigate(PATH_FORUM.feed)
        }
    }

    const newPostHook: any = {
        images,
        links,
        methods,
        isSubmitting,
        TABS,
        currentTab,
        currentTabCard,
        radio,
        date,
        file,
        erroArquivos,
        setFile,
        setDate,
        setRadio,
        setCurrentTab,
        setCurrentTabCard,
        radioOptions,
        setImages,
        setLinks,
        handleSubmit,
        handleRemove,
        handleDrop,
        watch,
        setValue,
        onSubmit,
        onCancel
    }

    return {
        newPostHook
    }
}

export default useNewPost;