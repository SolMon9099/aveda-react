export type communityType = {
    _id: string,
    name: string,
    banner: string,
    postCount: number,
    isMember: boolean,
    isPrivate? : any,
    isAwaitingApproval?: any,
    isAdmin?: any
}

export type communityDetailsType = {
    _id: string,
    name: string,
    banner: string,
    postCount: number,
    memberCount: any,
    description: string,
    admins: {
        _id: string,
        name: string,
        photo: string,
        description: string,
        email: string
    }[],
    isAdmin?: any,
    isPrivate? : any,

}