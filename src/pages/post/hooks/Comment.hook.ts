import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'src/redux/store';
import useAuth from 'src/hooks/useAuth';
import { commentType, commentChildrenType } from 'src/@types/post';
import { commentPost, deleteComment, getPostById, likeComment } from 'src/redux/slices/post';
import { setIsOpen } from 'src/redux/slices/auth';

const useComment = (comment: commentType | commentChildrenType | null) => {
    const { selectedPost } = useSelector((state) => state.post)
    const [show, setShow] = useState(false)
    const { user, isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const [images, setImages] = useState([])
    const [links, setLinks] = useState([])
    const [liked, setLiked] = useState(comment?.liked)
    const [likeCount, setLikeCount] = useState(comment?.likeCount || 0)
    const [openPopover, setOpenPopover] = useState<EventTarget & HTMLButtonElement | null>(null);

    useEffect(() => {
        if (comment) {
            setLiked(comment.liked)
            setLikeCount(comment.likeCount)
        }
    }, [comment])

    var defaultValues = {
        // @ts-ignore
        body: (!comment || comment?.children) ? '' : `<p><strong>${comment?.author.name}</strong></p>`,
    };

    const NewCommentSchema = Yup.object().shape({
        body: Yup.string().required('Escreva algo no comentário!!'),
    });

    const methods = useForm<{ body: string }>({
        resolver: yupResolver(NewCommentSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = async (data: { body: string }) => {
        try {
            if (comment && selectedPost) {
                await dispatch(commentPost(user?.id, selectedPost?._id, data.body, images, links, comment._id))
            } else if (selectedPost) {
                await dispatch(commentPost(user?.id, selectedPost?._id, data.body, images, links,))
            }
            setImages([])
            setLinks([])
            reset()
            setShow(false)
            if (selectedPost) {
                dispatch(getPostById(user?.id, selectedPost?._id, false, true))
            }
        } catch (e) {
            console.log(e)
        }
    };

    const onCancel = () => {
        console.log('ON CANCEL');
        setImages([])
        setLinks([])
        setShow(false)
        reset()
    }

    const handleLike = (commentId: string) => {
        if (isAuthenticated) {
            dispatch(likeComment(user?.id, commentId))
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

    const handleDelete = async (commentId: string) => {
        await dispatch(deleteComment(commentId))
        window.location.reload()
    }

    const handleShow = () => {
        console.log('HANDLE SHOW');
        if (!show && !isAuthenticated) {
            dispatch(setIsOpen(true))
        } else {
            // if (show) {
            //     setImages([])
            //     setLinks([])
            //     setShow(false)
            //     reset()
            // } else {
            //     setShow(true)
            // }
            setShow(true);
        }
    }

    return {
        images,
        links,
        methods,
        isSubmitting,
        show,
        liked,
        likeCount,
        openPopover,
        setOpenPopover,
        setShow,
        setImages,
        setLinks,
        handleSubmit,
        onSubmit,
        onCancel,
        handleLike,
        handleDelete,
        handleShow
    };
}

export default useComment;