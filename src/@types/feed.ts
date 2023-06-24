export type feedPostType = {
    _id: string,
    liked: boolean,
    saved: boolean,
    author: { 
        _id: string,
        name: string,
        photo: string,
        description: string,
        email: string
    },
    communityPhoto: string, 
    title: string,
    body: string,
    attachments: feedPostAttachmentType[],
    likeCount: number,
    topics: {
        _id: string,
        name: string,
        isFromCommunity: boolean
    }[],
    comments: number,
    createdAt: string,
    isLive?: boolean,
    thumbnail?: any,
    date?: any,
    isLiveNow?: string,
    endHour?:any,
    scheduleHour?: any,
    isPanda?:any,
    rtmp?:any,
    stream_key?:any,
}

export type feedTopUserType = {
    _id: string,
    photo: string,
    name: string,
    likeCount: number,
    description: string,
    email: string
}

export type feedTopTopicType = {
    _id: string,
    name: string,
    postCount: number,
    fromCommunity: boolean
}

export type feedPostAttachmentType = {
    _id: string,
    attachmentType: string,
    url: string
} 

export type paginationType = {
    count: number,
    max: boolean,
    nextCursor: string
}
