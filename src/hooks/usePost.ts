import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { feedPostType } from 'src/@types/feed';
import { deletePost, likePost, savePost } from 'src/redux/slices/post';
import { removePost } from 'src/redux/slices/saved';
import { useDispatch } from 'src/redux/store';
import { PATH_FORUM } from 'src/routes/paths';
import useAuth from './useAuth';
import { setIsOpen } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

export default function usePost(post : feedPostType) {
    const { pathname } = useLocation();
    const { user, isAuthenticated } = useAuth()
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ liked, setLiked ] = useState(post.liked);
    const [ likeCount, setLikeCount ] = useState(post.likeCount);
    const [ saved, setSaved ] = useState(post.saved);
    const [ openPopover, setOpenPopover ] = useState(null)

    useEffect(() =>{
        setLiked(post.liked)
        setLikeCount(post.likeCount)
        setSaved(post.saved)
    },[post])

    const handleLike = () =>{
        if(isAuthenticated){
            dispatch(likePost(user?.id, post._id))
            if(!liked){
                setLikeCount(likeCount+1)
            }else{
                setLikeCount(likeCount-1)
            }
            setLiked(!liked)
        }else{
            dispatch(setIsOpen(true))
        }
    }

    const handleSave = () =>{
        if(isAuthenticated){
            dispatch(savePost(user?.id, post._id))
            setSaved(!saved)
            if(pathname.includes('salvos')){
                dispatch(removePost(post._id))
            }
        }else{
            dispatch(setIsOpen(true))
        }
    }

    const handleDelete = async () =>{
        await dispatch(deletePost(post._id))
        window.location.reload()
    }

    const handleGoToPost = () =>{
        navigate(PATH_FORUM.post + post._id)
    }

    const handleGoToLive = () =>{
        navigate(PATH_FORUM.live + post._id)
    }

    const handleCopy = () =>{
        enqueueSnackbar('Copiado')
    }

    const postHook: any = {
        liked,
        likeCount,
        saved,
        openPopover,
        setOpenPopover,
        handleLike,
        handleSave,
        handleGoToPost,
        handleGoToLive,
        handleCopy,
        handleDelete
    }

    return {
        postHook
    };
}
