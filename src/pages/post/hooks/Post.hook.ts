import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import { deletePost, getPostById, getRelatedPosts, getWhoLiked, likePost, savePost } from "src/redux/slices/post";
import { useDispatch, useSelector } from "src/redux/store";
import { useSnackbar } from 'notistack';
import { setIsOpen } from "src/redux/slices/auth";
import { resetTopic } from "src/redux/slices/topic";
import { resetCommunity } from "src/redux/slices/community";
import { PATH_FORUM } from "src/routes/paths";

const usePost = () => {
    const { postId } = useParams()
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoadingPost, selectedPost } = useSelector((state) => state.post)
    const [liked, setLiked] = useState(selectedPost?.liked);
    const [likeCount, setLikeCount] = useState(selectedPost?.likeCount || 0);
    const [saved, setSaved] = useState(selectedPost?.saved);
    const [openPopover, setOpenPopover] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (postId) {
            dispatch(getPostById(user?.id, postId, true))
        }
    }, [dispatch, user?.id, postId])

    useEffect(() => {
        if (!isLoadingPost && postId && selectedPost?._id === postId) {
            dispatch(getRelatedPosts(selectedPost.topics.map((t) => t._id), postId))
        }
    }, [dispatch, isLoadingPost, postId, selectedPost])

    useEffect(() => {
        if (!isLoadingPost && postId && selectedPost?._id === postId) {
            dispatch(getWhoLiked(postId));
        }
    }, [dispatch, isLoadingPost, postId, selectedPost])

    useEffect(() => {
        setLiked(selectedPost?.liked)
        setLikeCount(selectedPost?.likeCount || 0)
        setSaved(selectedPost?.saved)
    }, [selectedPost])

    const handleLike = () => {
        if (isAuthenticated && selectedPost) {
            dispatch(likePost(user?.id, selectedPost._id))
            if (!liked) {
                setLikeCount(likeCount + 1)
            } else {
                setLikeCount(likeCount - 1)
            }
            setLiked(!liked)
        } else {
            dispatch(setIsOpen(true))
        }
    }

    const handleSave = () => {
        if (isAuthenticated && selectedPost) {
            dispatch(savePost(user?.id, selectedPost._id))
            setSaved(!saved)
        } else {
            dispatch(setIsOpen(true))
        }
    }

    const handleCopy = () => {
        enqueueSnackbar('Copiado')
    }

    const handleDelete = async () => {
        if (postId) {
            await dispatch(deletePost(postId))
            navigate(PATH_FORUM.feed)
        }
    }

    const goToNewPost = () => {
        if (isAuthenticated) {
            dispatch(resetTopic());
            dispatch(resetCommunity());
            navigate(PATH_FORUM.novoPost)
        } else {
            dispatch(setIsOpen(true))
        }
    }

    const postHook: any = {
        liked,
        likeCount,
        saved,
        openPopover,
        setOpenPopover,
        handleLike,
        handleSave,
        handleCopy,
        handleDelete,
        goToNewPost
    }

    return {
        postHook
    }
}

export default usePost;