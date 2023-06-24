import { useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import { getMyPosts, getCommentedPosts, resetMyPosts, resetCommentedPosts } from "src/redux/slices/myPosts";
import { useDispatch, useSelector } from "src/redux/store";


const useMyPosts = () => {
    const { myPostsPagination, commentedPostsPagination, isLoadingMyPosts, isLoadingCommentedPosts } = useSelector((state) => state.myPosts)
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const TABS = [
        {label: 'Minhas Publicações', value: 1},
        {label: 'Meus Comentários', value: 2}
    ]

    useEffect(() =>{
        dispatch(resetMyPosts())
        dispatch(resetCommentedPosts())
        dispatch(getMyPosts(user?.id, 15))
        dispatch(getCommentedPosts(user?.id, 15))
    },[dispatch, user?.id])

    const handleGetMorePostsMy = () => {
        if(!isLoadingMyPosts){
            dispatch(getMyPosts(user?.id, 15, myPostsPagination?.nextCursor))
        }
    }

    const handleGetMorePostsCommented = () => {
        if(!isLoadingCommentedPosts){
            dispatch(getCommentedPosts(user?.id, 15, commentedPostsPagination?.nextCursor))
        }
    }

    const myPostsHook: any = {
        TABS,
        currentTab,
        setCurrentTab,
        handleGetMorePostsMy,
        handleGetMorePostsCommented,
    }

    return{
        myPostsHook
    }
}

export default useMyPosts;