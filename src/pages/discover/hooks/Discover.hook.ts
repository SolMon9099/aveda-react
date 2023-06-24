import { useEffect } from "react";
import useAuth from "src/hooks/useAuth";
import { setIsOpen } from "src/redux/slices/auth";
import { getDiscover, joinCommunity, leaveCommunity, requestCommunity } from "src/redux/slices/community";
import { useDispatch } from "src/redux/store";


const useDiscover = () => {
    const { user, isAuthenticated, initialize } = useAuth()
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(getDiscover(user?.id))
    },[dispatch, user?.id])

    const handleJoin = async (communityId: string) =>{
        if(isAuthenticated){
            await dispatch(joinCommunity(user?.id, communityId))
            dispatch(getDiscover(user?.id))
            initialize()
        }else{
            dispatch(setIsOpen(true))
        }
    }   

    const handleRequest = async (communityId: string) =>{
        if(isAuthenticated){
            await dispatch(requestCommunity(user?.id, communityId))
            dispatch(getDiscover(user?.id))
            initialize()
        }else{
            dispatch(setIsOpen(true))
        }
    }  

    const handleLeave = async (communityId: string) =>{
        await dispatch(leaveCommunity(user?.id, communityId))
        dispatch(getDiscover(user?.id))
        initialize()
    }   

    const discoverHook: any = {
        handleJoin,
        handleRequest,
        handleLeave
    }

    return{
        discoverHook
    }
}

export default useDiscover;