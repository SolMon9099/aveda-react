import { useEffect } from "react";
import useAuth from "src/hooks/useAuth";
import { getTopics, getTopicsFixed, resetError, resetTopics } from "src/redux/slices/topic";
import { useDispatch, useSelector } from "src/redux/store";


const useTopics = () => {
    const { isLoadingTopics, topicPagination } = useSelector((state) => state.topic)
    const { user } = useAuth()
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(resetTopics())
        dispatch(resetError())
        dispatch(getTopics(user?.id, 15))
        dispatch(getTopicsFixed(user?.id))
    },[dispatch, user?.id])

    const handleGetMoreTopics = () => {
        if(!isLoadingTopics){
            dispatch(getTopics(user?.id, 15, topicPagination?.nextCursor))
        }
    }

    const topicsHook: any = {
        handleGetMoreTopics
    }

    return{
        topicsHook
    }
}

export default useTopics;