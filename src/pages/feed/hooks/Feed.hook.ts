import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { setIsOpen } from "src/redux/slices/auth";
import { resetCommunity } from "src/redux/slices/community";
import { getFeedPosts, getFeedTopics, getFeedTopUsers, getSearchPosts, resetFeedPosts, resetSearchPosts } from "src/redux/slices/feed";
import { resetTopic } from "src/redux/slices/topic";
import { useDispatch, useSelector } from "src/redux/store";
import { PATH_FORUM } from "src/routes/paths";


const useFeed = () => {
    const { feedPagination, searchPagination, isLoadingFeedPosts, isLoadingSearchPosts } = useSelector((state) => state.feed)
    const { user, isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ currentTab, setCurrentTab ] = useState(1)
    const [ textSearchState, setTextSearchState ] = useState('')
    const TABS = [
        {label: 'Recentes', icon: 'grommet-icons:new', value: 1},
        {label: 'Pesquisar', icon: 'ion:search-outline', value: 2}
    ]

    useEffect(() =>{
        dispatch(resetSearchPosts())
        setTextSearchState('')
    },[dispatch, currentTab])

    useEffect(() =>{
        dispatch(resetFeedPosts())
        dispatch(getFeedTopics())
        if(isAuthenticated){
            dispatch(getFeedTopUsers(user?.id))
        }
        dispatch(getFeedPosts(user?.id, 15))
    },[dispatch, user?.id, isAuthenticated])

    const handleGetMorePostsFeed = () => {
        if(!isLoadingFeedPosts){
            dispatch(getFeedPosts(user?.id, 15, feedPagination?.nextCursor))
        }
    }

    const handleGetPostsSearch = (textSearch: string) => {
        setTextSearchState(textSearch)
        dispatch(getSearchPosts(user?.id, 15, textSearch, searchPagination?.nextCursor))
    }

    const handleGetMorePostsSearch = () => {
        if(!isLoadingSearchPosts){
            dispatch(getSearchPosts(user?.id, 15, textSearchState, searchPagination?.nextCursor, true))
        }
    }

    const goToNewPost = () => {
        if(isAuthenticated){
            dispatch(resetTopic()); 
            dispatch(resetCommunity()); 
            navigate(PATH_FORUM.novoPost)
        }else{
            dispatch(setIsOpen(true))
        }
    }

    const feedHook: any = {
        TABS,
        currentTab,
        textSearchState,
        setCurrentTab,
        handleGetMorePostsFeed,
        handleGetMorePostsSearch,
        handleGetPostsSearch,
        goToNewPost
    }

    return{
        feedHook
    }
}

export default useFeed;