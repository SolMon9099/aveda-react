import { useEffect } from "react";
import useAuth from "src/hooks/useAuth";
import { getSavedPosts, resetSavedPosts } from "src/redux/slices/saved";
import { useDispatch, useSelector } from "src/redux/store";


const useSaved = () => {
    const { isLoadingSavedPosts, savedPostsPagination } = useSelector((state) => state.saved)
    const { user } = useAuth()
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(resetSavedPosts())
        dispatch(getSavedPosts(user?.id, 15))
    },[dispatch, user?.id])

    const handleGetMorePosts = () => {
        if(!isLoadingSavedPosts){
            dispatch(getSavedPosts(user?.id, 15, savedPostsPagination?.nextCursor))
        }
    }

    const savedHook: any = {
        handleGetMorePosts
    }

    return{
        savedHook
    }
}

export default useSaved;