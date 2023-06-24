import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { setIsOpen } from "src/redux/slices/auth";
import { resetCommunity } from "src/redux/slices/community";
import { getTopicById, getTopicPosts, resetTopicPosts } from "src/redux/slices/topic";
import { useDispatch, useSelector } from "src/redux/store";
import { PATH_FORUM } from "src/routes/paths";


const useTopic = () => {
    const navigate = useNavigate()
    const { topicId } = useParams()
    const { isLoadingTopicsPosts, topicPostsPagination, error } = useSelector((state) => state.topic)
    const { user, isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const TABS = [
        {label: 'Recentes', icon: 'grommet-icons:new', value: 1},
    ]


    useEffect(() =>{
        dispatch(resetTopicPosts())
        if(topicId){
            if(isAuthenticated){
                dispatch(getTopicById(topicId,user?._id))
            }else{
                dispatch(getTopicById(topicId))
            }
            dispatch(getTopicPosts(user?.id, 15, topicId))
        }
    },[dispatch, user?.id, topicId, isAuthenticated, user?._id])

    useEffect(() =>{
        if(error){
            navigate(PATH_FORUM.topicos)
        }
    },[dispatch, navigate, error])

    const handleGetMorePosts = () => {
        if(!isLoadingTopicsPosts && topicId){
            dispatch(getTopicPosts(user?.id, 15, topicId, topicPostsPagination?.nextCursor))
        }
    }

    const goToNewPost = () =>{
        if(isAuthenticated){
            dispatch(resetCommunity()); 
            navigate(PATH_FORUM.novoPost)
        }else{
            dispatch(setIsOpen(true))
        }
    }

    const topicHook: any = {
        TABS,
        currentTab,
        setCurrentTab,
        handleGetMorePosts,
        goToNewPost
    }

    return{
        topicHook
    }
}

export default useTopic;