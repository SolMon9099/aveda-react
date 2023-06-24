
export type topicType = {
    _id: string,
    name: string,
    fromCommunity: boolean,
    communityName: string,
    postCount: number,
    activePostCount: any,
    isFixed: boolean,
    visibleCount? :any
}

export type selectedTopicType = {
    _id: string,
    name: string,
    community: string,
    activePostCount: any,
    visibleCount? :any
}