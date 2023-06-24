import { feedPostAttachmentType } from "./feed";

export type newPostType = {
    isPanda: number | boolean,
    title: string,
    body: string,
    attachments: string[],
    local: {value: string, label: string}[],
    topics: {value: string, label: string, fromCommunity: boolean}[],
    pandaApiKey?: string,
    link?: any,
    duration?: number,
    thumbnail?: any,
    date?:any,
    scheduleHour?:any,
    endHour?:any,
    isLiveNow?:any,
    message?:any
};

export type postDetailType = {
    _id: string,
    title: string,
    body: string,
    liked: boolean,
    saved: boolean,
    isAuthor: boolean,
    attachments: feedPostAttachmentType[],
    communityPhoto: string,
    author: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        email: string
    },
    createdAt: Date,
    topics: {
        _id: string,
        name: string,
        isFromCommunity: boolean,
    }[],
    likeCount: number,
    commentCount: number,
    comments: commentType[],
    link?: any,
    duration?: number,
    thumbnail?: any,
    date?:any,
    scheduleHour?:any,
    endHour?:any,
    isLiveNow?:any,
    isPanda?:any,
    rtmp?:any,
    stream_key?:any,
};

export type commentType = {
    _id: string,
    body: string,
    author: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        email: string
    },
    attachments: feedPostAttachmentType[],
    liked: boolean,
    likeCount: number,
    createdAt: Date,
    isAuthor: boolean,         
    children: commentChildrenType[],
} 

export type commentChildrenType = {
    _id: string,
    body: string,
    author: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        email: string
    },
    liked: boolean,
    likeCount: number,
    createdAt: Date,
    isAuthor: string,
    attachments: feedPostAttachmentType[],
    parentCommentAuthor: {
        _id: string,
        name: string,
        photo: string,
    },
}

export type relatedPostType = {
    _id: string,
    title: string,
    commentCount: number,
}

export type Like = {
    _id: string,
    photo: string,
    name: string,
    email: string,
    description: string
}