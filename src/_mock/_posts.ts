import { randomNumber } from "./funcs";
import _mock from "./_mock";

export const _feedPosts = [...Array(10)].map((_,idx)=>({
    _id: _mock.id(idx),
    liked: _mock.boolean(idx+5),
    saved: _mock.boolean(idx),
    author: { 
        name: _mock.name.fullName(idx)
    },
    local: {
        localType: 'community',
        community: {
            _id: _mock.id(idx),
            bannerImage: _mock.image.cover(idx)
        }
    },
    title: _mock.text.title(idx),
    body: _mock.text.description(idx),
    attachments: [...Array(3)].map((_,idx) =>({
        _id: _mock.id(idx),
        attachmentType: 'image',
        url: _mock.image.cover(idx),
    })),
    likeCount: randomNumber(idx),
    topics: [...Array(3)].map((_,idx) =>({
        name: _mock.name.firstName(idx),
        community: _mock.boolean(idx)
    })),
    comments: randomNumber(idx),
    createdAt: _mock.time(idx)
}))