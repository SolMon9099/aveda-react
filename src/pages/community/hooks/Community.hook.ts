import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { getCommunityById, getCommunityPosts, resetCommunityPosts, getSearchPosts, resetSearchPosts, getCommunityMembers, getTopics, getTopicsFixed, resetTopics, leaveCommunity, getCommunityAwaitingApproval, declineRequestCommunity, acceptCommunity } from "src/redux/slices/community";
import { useDispatch, useSelector } from "src/redux/store";


const useCommunity = () => {
    const { communityId } = useParams()
    const { communityPagination, isLoadingCommunityPosts, searchPagination, isLoadingSearchPosts, isLoadingTopics, topicPagination } = useSelector((state) => state.community)
    const { user } = useAuth()
    const dispatch = useDispatch()
    const [ currentTab, setCurrentTab ] = useState(1)
    const [ currentTabCard, setCurrentTabCard ] = useState(1)
    const [ textSearchState, setTextSearchState ] = useState('')
    const TABS = [
        {label: 'Recentes', icon: 'grommet-icons:new', value: 1},
        {label: 'Pesquisar', icon: 'ion:search-outline', value: 2}
    ]
    const TABS_CARD = [
        {label: 'Publicações', value: 1},
        {label: 'Tópicos', value: 2},
        {label: 'Membros', value: 3},
    ]


    useEffect(() =>{
        dispatch(resetSearchPosts())
        setTextSearchState('')
    },[dispatch, currentTab])

    useEffect(() =>{
        dispatch(resetCommunityPosts())
        dispatch(resetTopics())
        if(communityId){
            dispatch(getCommunityMembers(communityId))
            dispatch(getCommunityAwaitingApproval(communityId))
            dispatch(getCommunityById(communityId,user?.id))
            dispatch(getCommunityPosts(user?.id, 15, communityId))
            dispatch(getTopics(user?.id, 15, communityId))
            dispatch(getTopicsFixed(user?.id, communityId))
        }
    },[dispatch, user?.id, communityId])

    const handleGetMorePostsCommunity = () => {
        if(!isLoadingCommunityPosts && communityId){
            dispatch(getCommunityPosts(user?.id, 15, communityId, communityPagination?.nextCursor))
        }
    }

    const handleGetPostsSearch = (textSearch: string) => {
        setTextSearchState(textSearch)
        if(communityId){
            dispatch(getSearchPosts(user?.id, 15, textSearch, communityId, searchPagination?.nextCursor))
        }
    }

    const handleGetMorePostsSearch = () => {
        if(!isLoadingSearchPosts && communityId){
            dispatch(getSearchPosts(user?.id, 15, textSearchState, communityId, searchPagination?.nextCursor, true))
        }
    }

    const handleGetMoreTopics = () => {
        if(!isLoadingTopics && communityId){
            dispatch(getTopics(user?.id, 15, communityId, topicPagination?.nextCursor))
        }
    }

    const removeMember = async (memberId: string) =>{
        if(communityId){
            await dispatch(leaveCommunity(memberId, communityId))
            dispatch(getCommunityMembers(communityId))
            dispatch(getCommunityAwaitingApproval(communityId))
        }
    }

    const declineRequest = async (memberId: string) =>{
        if(communityId){
            await dispatch(declineRequestCommunity(memberId, communityId))
            dispatch(getCommunityMembers(communityId))
            dispatch(getCommunityAwaitingApproval(communityId))
        }
    }

    const acceptRequest = async (memberId: string) =>{
        if(communityId){
            await dispatch(acceptCommunity(memberId, communityId))
            dispatch(getCommunityMembers(communityId))
            dispatch(getCommunityAwaitingApproval(communityId))
        }
    }

    const communityHook: any = {
        TABS,
        TABS_CARD,
        currentTab,
        currentTabCard,
        textSearchState,
        setCurrentTab,
        setCurrentTabCard,
        declineRequest,
        acceptRequest,
        handleGetMorePostsCommunity,
        handleGetMorePostsSearch,
        handleGetPostsSearch,
        handleGetMoreTopics,
        removeMember
    }

    return{
        communityHook
    }
}

export default useCommunity;